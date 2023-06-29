using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;
using Back.Model;
using Microsoft.AspNetCore.Cors;

[ApiController]
[Route("post")]
[EnableCors("MainPolicy")]
public class PostController : ControllerBase
{
    [HttpPost("create")]
    public async Task<ActionResult<PostData>> create(
            [FromBody] PostData data,
            [FromServices] IPostRepository repo,
            [FromServices] JwtService jwt)
    {
        PostData result = new PostData();

        Post newPost = new Post();
        newPost.Title = data.Title;
        newPost.ForumId = data.ForumId;
        newPost.PostMessage = data.PostMessage;
        newPost.OwnerId = jwt.Validate<UserData>(data.OwnerIdjwt).UserID;
        newPost.Likes = 0;

        await repo.Create(newPost);
        return Ok(result);
    }

    [HttpPost("delete")]
    public async Task<ActionResult<ForumData>> delete(
        [FromBody] ForumData data,
        [FromServices] IForumRepository repo,
        [FromServices] ISecurityService security)
    {

        Forum forum = await repo.FindById(data.Id);
        if (forum is null)
        {

            return BadRequest();
        }

        await repo.Delete(forum);
        return Ok();
    }

    [HttpPost("update")]
    public async Task<ActionResult<ForumUpdateData>> update(
        [FromBody] ForumUpdateData data,
        [FromServices] IForumRepository repo)
    {

        Forum forum = await repo.FindById(data.Id);
        if (forum is null)
        {
            return BadRequest();
        }
        forum.Title = data.Title;
        forum.ForumDescription = data.ForumDescription;

        await repo.Update(forum);
        return Ok();
    }
}