using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Security.Jwt;

namespace Back.Controllers;

using Services;
using Data;
using Back.Model;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;

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
            [FromServices] ILikeRepository repoLike,
            [FromServices] JwtService jwt)
    {
        Post post = await repo.FindById(data.Id);
        if (post is null)
        {
            return BadRequest();
        }

        var likes = await repoLike.GetLikesFromAPost(data.Id);

        foreach (var like in likes)
        {
            await repoLike.DeleteLike(like);
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

    [HttpPost("allPosts")]
    public async Task<ActionResult> allPosts(
        [FromServices] IPostRepository repo,
        [FromServices] ILikeRepository likerepo,
        [FromServices]JwtService jwt)
    {
        List<LikeResult> resultList = new();
        
        var posts = await repo.SelectAll();

        foreach (var post in posts)
        {
            Like like = new();
            like.PostsId = post.Id;
            like.OwnerId = jwt.Validate<UserData>(Request.Form["data"]).UserID;
            var myLike = await likerepo.FindLike(like);
            
            LikeResult result = new();
            result.Post = post;

            if (!(myLike is null))
            {
                result.ILiked = myLike.IsLike;
                resultList.Add(result);

                continue;
            }
            result.ILiked = null;
            resultList.Add(result);
        }

        return Ok(resultList);
    }

    [HttpPost("filterByForum")]
    public async Task<ActionResult> filterByForum(
        [FromServices] IPostRepository repo,
        [FromBody] ForumFilterData data,
        [FromServices] ILikeRepository likerepo,
        [FromServices]JwtService jwt)
    {
        List<LikeResult> resultList = new();
        
        var posts = await repo.FilterByForum(data.Forums);

        foreach (var post in posts)
        {
            Like like = new();
            like.PostsId = post.Id;
            like.OwnerId = jwt.Validate<UserData>(data.Jwt).UserID;
            var myLike = await likerepo.FindLike(like);
            
            LikeResult result = new();
            result.Post = post;

            if (!(myLike is null))
            {
                result.ILiked = myLike.IsLike;
                resultList.Add(result);

                continue;
            }
            result.ILiked = null;
            resultList.Add(result);
        }

        return Ok(resultList);
    }

    [HttpPost("filterByLiked")]
    public async Task<ActionResult> filterByLiked(
        [FromServices] IPostRepository repo,
        [FromBody] ForumLikedFilterData data,
        [FromServices] ILikeRepository likerepo,
        [FromServices]JwtService jwt)
    {
        List<LikeResult> resultList = new();
        
        var posts = await repo.FilterByLiked(data.IdUserPage);

        foreach (var post in posts)
        {
            Like like = new();
            like.PostsId = post.Id;
            like.OwnerId = jwt.Validate<UserData>(data.Jwt).UserID;
            var myLike = await likerepo.FindLike(like);
            
            LikeResult result = new();
            result.Post = post;

            if (!(myLike is null))
            {
                result.ILiked = myLike.IsLike;
                resultList.Add(result);

                continue;
            }
            result.ILiked = null;
            resultList.Add(result);
        }

        return Ok(resultList);
    }

}