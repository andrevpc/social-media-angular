using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;
using Back.Model;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System;

[ApiController]
[Route("follow")]
[EnableCors("MainPolicy")]
public class FollowController : ControllerBase
{
    [HttpPost("create")]
    public async Task<ActionResult> create(
        [FromBody] FollowData data,
        [FromServices] IFollowRepository repo,
        [FromServices] IUserRepository userRepository
        )
    {

        var flw = await repo.FindFollow(await userRepository.FindById(data.FollowerId), await userRepository.FindById(data.UserId));
        if (!(flw is null))
        {
            await repo.Remove(flw);
            return Ok();
        }

        Follow follow = new();
        follow.FollowerId = data.FollowerId;
        follow.UserId = data.UserId;
        await repo.Create(follow);
        return Ok();
    }

    [HttpPost("findFollow")]
    public async Task<ActionResult> findFollow(
        [FromBody] FollowData data,
        [FromServices] IFollowRepository repo,
        [FromServices] IUserRepository userRepository
        )
            => Ok(await repo.FindFollow(await userRepository.FindById(data.FollowerId), await userRepository.FindById(data.UserId)) is null);
    
    [HttpPost("findFollowing")]
    public async Task<ActionResult<List<FollowingResult>>> FindFollowing(
        [FromBody] FollowData data,
        [FromServices] IFollowRepository repo,
        [FromServices] IUserRepository userRepository
    )
    {
        List<FollowingResult> result = new();

        var userFollowed = await userRepository.FindById(data.UserId);
        var followerList = await repo.FindFollowing(userFollowed);

        foreach (var follower in followerList)
        {
            var followerUser = follower.User;

            UsernameData userNameData = new();
            userNameData.UserID = followerUser.Id;
            userNameData.Username = followerUser.Username;

            FollowingResult followingResult = new();
            followingResult.IdAndUsername = userNameData;

            var MyUser = await userRepository.FindById(data.FollowerId);
            var FollowingUser = await userRepository.FindById(follower.FollowerId);

            followingResult.IFollow = await repo.FindFollow(MyUser, FollowingUser) is not null;
            result.Add(followingResult);
        }
        return Ok(result);
    }
}