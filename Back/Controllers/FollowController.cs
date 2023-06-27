using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;

[ApiController]
[Route("user")]
public class FollowController : ControllerBase
{
    [HttpPost("isFollowing")]
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

        return Ok(result);
    }
}