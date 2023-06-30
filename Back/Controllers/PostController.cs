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
    public async Task<ActionResult<PostCreateData>> create(
            [FromBody] PostCreateData data,
            [FromServices] IPostRepository repo,
            [FromServices] JwtService jwt)
    {
        Post post = await repo.FindByName(data.Id);
        if (post is null)
        {
            return BadRequest();
        }

        foreach (var item in data.ForunsTitle)
        {
            Post newPost = new Post();
            newPost.Title = data.Title;
            newPost.ForumId = 
            newPost.PostMessage = data.PostMessage;
            newPost.OwnerId = jwt.Validate<UserData>(data.OwnerIdjwt).UserID;
            newPost.Likes = 0;
        }

        await repo.Create(newPost);
        return Ok();
    }

    [HttpPost("delete")]
    public async Task<ActionResult<PostData>> delete(
            [FromBody] PostData data,
            [FromServices] IPostRepository repo,
            [FromServices] JwtService jwt)
    {
        Post post = await repo.FindById(data.Id);
        if (post is null)
        {
            return BadRequest();
        }

        await repo.Delete(post);
        return Ok();
    }

    [HttpPost("update")]
    public async Task<ActionResult<PostUpdateData>> update(
        [FromBody] PostUpdateData data,
        [FromServices] IPostRepository repo)
    {

        Post post = await repo.FindById(data.Id);
        if (post is null)
        {
            return BadRequest();
        }
        
        post.Title = data.Title;
        post.PostMessage = data.PostMessage;

        await repo.Update(post);
        return Ok();
    }
}