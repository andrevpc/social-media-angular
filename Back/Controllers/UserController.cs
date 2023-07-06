using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;
using Back.Model;
using Microsoft.AspNetCore.Cors;
using System.IO;

[ApiController]
[Route("user")]
[EnableCors("MainPolicy")]
public class UserController : ControllerBase
{
    [HttpPost("signin")]
    public async Task<ActionResult<SigninResult>> Signin(
        [FromServices]IUserRepository repo,
        [FromServices]ISecurityService security,
        [FromServices]IImageService img)
    {
        SigninData data = new SigninData();

        data.Email = Request.Form["email"];
        data.Username = Request.Form["username"];
        data.Password = Request.Form["password"];
        // data.Age = new System.DateTime(int.Parse(Request.Form["age"]));
        data.Age = System.DateTime.MaxValue;

        SigninResult result = new SigninResult();

        try {
            var file = Request.Form.Files[0];
            var ms = new MemoryStream();
            file.CopyTo(ms);
            data.File = img.GetImageURI(ms.ToArray());
        }
        catch {
            data.File = null;
        }

        var user = await repo.FindByName(data.Username);
        if (!(user is null))
        {
            result.UsernameAlreadyExist = true;
            return Ok(result);
        }
        result.UsernameAlreadyExist = false;
        User newUser = new User();
        newUser.Email = data.Email;
        newUser.Username = data.Username;
        newUser.ProfilePic = data.File;
        newUser.Salt = security.GenerateSalt();
        newUser.UserPassword = security.ApplyHash(data.Password, newUser.Salt);

        newUser.Age = data.Age;

        await repo.Create(newUser);
        result.Success = true;
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResult>> Login(
        [FromBody]LoginData data,
        [FromServices]IUserRepository repo,
        [FromServices]ISecurityService security,
        [FromServices]JwtService jwt)
    {
        LoginResult result = new LoginResult();

        var user = await repo.FindByName(data.UserName);
        if (user is null)
        {
            result.UserExist = false;
            return Ok(result);
        }
        result.UserExist = true;

        var hash = security.ApplyHash(data.Password, user.Salt);
        if (hash != user.UserPassword)
        {
            result.Success = false;
            return Ok(result);
        }

        UserData userData = new UserData();
        userData.UserID = user.Id;
        result.Jwt = jwt.GetToken(userData);
        result.Success = true;

        return Ok(result);
    }

    [HttpPost("getId")]
    public async Task<ActionResult<int>> GetId(
        [FromServices]JwtService jwt)
        => Ok(jwt.Validate<UserData>(Request.Form["data"]).UserID);

    [HttpPost("getPic")]
    public async Task<ActionResult<string>> GetPic(
        [FromServices]IUserRepository repo)
    {
        User user = await repo.FindById(int.Parse(Request.Form["userId"]));
        return Ok(user.ProfilePic);
    }
}