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
            [FromServices] IForumRepository forumRepo,
            [FromServices] JwtService jwt)
    {
        foreach (var item in data.ForunsTitle)
        {
            Post newPost = new Post();
            newPost.Title = data.Title;
            newPost.PostMessage = data.PostMessage;
            newPost.OwnerId = jwt.Validate<UserData>(data.OwnerIdjwt).UserID;
            newPost.Likes = 0;
            var forum = await forumRepo.FindByTitle(item);
            newPost.ForumId = forum.Id;
            await repo.Create(newPost);
        }

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

    [HttpGet("allPosts")]
    public async Task<ActionResult> allPosts(
        [FromServices] IPostRepository repo)
        => Ok(await repo.SelectAll());

    [HttpGet("filterByForum")]
    public async Task<ActionResult> filterByForum(
        [FromServices] IPostRepository repo)
        
}