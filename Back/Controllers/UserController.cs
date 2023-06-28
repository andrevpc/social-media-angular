using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;
using Back.Model;
using Microsoft.AspNetCore.Cors;

[ApiController]
[Route("user")]
[EnableCors("MainPolicy")]
public class UserController : ControllerBase
{
    [HttpPost("signin")]
    public async Task<ActionResult<SigninResult>> Signin(
        [FromBody]SigninData data,
        [FromServices]IUserRepository repo,
        [FromServices]ISecurityService security)
    {
        SigninResult result = new SigninResult();

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
}