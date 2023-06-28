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
    public async Task<ActionResult<ForumData>> create(
        [FromBody]ForumData data,
        [FromServices]IForumRepository repo,
        [FromServices]ISecurityService security)
    {
        ForumData result = new ForumData();

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
        ForumData result = new ForumData();

        var forum = await repo.FindByTitle(data.Title);
        if (!(forum is null))
        {
            return Ok(result);
        }

        await repo.Delete(forum);
        return Ok(result);
    }
}