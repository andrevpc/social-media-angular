using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;
using Back.Model;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;

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
        
        Forum newForum = new Forum();
        newForum.Title = data.Title;
        newForum.ForumDescription = data.ForumDescription;
        newForum.Created = DateTime.Now;
        newForum.OwnerId = jwt.Validate<UserData>(data.OwnerIdjwt).UserID;
        System.Console.WriteLine(newForum);
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

    [HttpGet("userCanPost")]
    public async Task<ActionResult> forumsUserCanPost(
        [FromServices] IForumRepository repo)
    {
        var list = await repo.GetAllForumsThatTheUserCanPost();

        return Ok(list);
    }

    [HttpGet("allForums")]
    public async Task<ActionResult> allforums(
        [FromServices] IForumRepository repo)
    {
        var list = await repo.AllForums();

        return Ok(list);
    }
    [HttpPost("forumsUserOwns")]
    public async Task<ActionResult<List<ForumResult>>> forumsUserOwns(
        [FromServices] IForumRepository repo
    )
    {
        var list = await repo.ForumsUserOwns(int.Parse(Request.Form["idStr"]));
        List<ForumResult> result = new();

        foreach (var forum in list)
        {
            ForumResult forumResult = new();

            forumResult.Id = forum.Id;
            forumResult.Title = forum.Title;
            forumResult.ForumDescription = forum.ForumDescription;
            forumResult.OwnerId = forum.OwnerId;
            forumResult.OwnerName = forum.Owner.Username;

            result.Add(forumResult);
        }

        return Ok(result);
    }
}