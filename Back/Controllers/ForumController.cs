using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;
using Back.Model;
using Microsoft.AspNetCore.Cors;

[ApiController]
[Route("forum")]
[EnableCors("MainPolicy")]
public class ForumController : ControllerBase
{
    [HttpPost("create")]
    public async Task<ActionResult<ForumCreateData>> create(
        [FromBody]ForumCreateData data,
        [FromServices]IForumRepository repo,
        [FromServices]JwtService jwt)
    {
        ForumCreateData result = new ForumCreateData();

        var forum = await repo.FindByTitle(data.Title);
        if (!(forum is null))
        {
            return Ok(result);
        }
        Forum newForum = new Forum();
        newForum.Title = data.Title;
        newForum.ForumDescription = data.ForumDescription;
        newForum.OwnerId = data.OwnerId;

        await repo.Create(newForum);
        return Ok(result);
    }

    [HttpPost("delete")]
    public async Task<ActionResult<ForumData>> delete(
        [FromBody]ForumData data,
        [FromServices]IForumRepository repo,
        [FromServices]ISecurityService security)
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
        [FromBody]ForumUpdateData data,
        [FromServices]IForumRepository repo)
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