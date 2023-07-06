using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;
using Back.Model;
using Microsoft.AspNetCore.Cors;

[ApiController]
[Route("like")]
[EnableCors("MainPolicy")]
public class LikeController : ControllerBase
{
    [HttpPost("create")]
    public async Task<ActionResult> createLike(
        [FromServices] ILikeRepository repo,
        [FromBody] LikeData data,
        [FromServices]JwtService jwt)
    {
        Like newLike = new();

        newLike.IsLike = data.IsLike;
        newLike.OwnerId = jwt.Validate<UserData>(data.OwnerIdjwt).UserID;
        newLike.PostsId = data.PostsId;

        Like likeInDb = await repo.FindLike(newLike);

        if(!(likeInDb is null))
        {
            await repo.DeleteLike(likeInDb);

            if (likeInDb.IsLike == data.IsLike)
                return Ok();
        }



        newLike.IsLike = data.IsLike;
        newLike.OwnerId = jwt.Validate<UserData>(data.OwnerIdjwt).UserID;
        newLike.PostsId = data.PostsId;
        await repo.CreateLike(newLike);

        return Ok();
    }
}
