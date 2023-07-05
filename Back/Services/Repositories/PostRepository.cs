using System.Threading.Tasks;
using System.Linq;

namespace Back.Services;

using System.Collections.Generic;
using Back.Data;
using Back.Model;
using Microsoft.EntityFrameworkCore;

public class PostRepository : IPostRepository
{
    private readonly ProjetoAngularContext context;
    public PostRepository(ProjetoAngularContext context)
        => this.context = context;
    public async Task Create(Post post)
    {
        await context.AddAsync(post);
        await context.SaveChangesAsync();
    }

    public async Task CreateLike(Like like)
    {
        await context.AddAsync(like);
        await context.SaveChangesAsync();
    }

    public async Task Delete(Post post)
    {
        context.Remove(post);
        await context.SaveChangesAsync();
    }

    public async Task<List<PostResult>> FilterByForum(string[] forums)
    {
        List<PostResult> postResultList = new();
        foreach (var forumTitle in forums)
        {
            var query =
                from post in context.Posts.Include(p => p.Owner).Include(p => p.Forum)
                where post.Forum.Title == forumTitle
                select post;

            foreach (Post post in query)
            {
                PostResult pr = new();
                pr.Id = post.Id;
                pr.Title = post.Title;
                pr.PostMessage = post.PostMessage;
                pr.OwnerName = post.Owner.Username;
                pr.ForumTitle = post.Forum.Title;
                pr.Likes = post.Likes;
                
                postResultList.Add(pr);
            }
        }
        return postResultList;
    }

    public async Task<Post> FindById(int id)
    {
        var query =
            from post in context.Posts
            where post.Id == id
            select post;
        
        var postList = await query.ToListAsync();
        var thePost = postList.FirstOrDefault();
        
        return thePost;
    }

    public async Task<Post> FindByName(string title)
    {
        var query =
            from post in context.Posts
            where post.Title == title
            select post;
        
        var postList = await query.ToListAsync();
        var thePost = postList.FirstOrDefault();
        
        return thePost;
    }

    public async Task<Like> FindLike(FindLikeData like)
    {
        var query =
            from likedb in context.Likes
            where likedb.OwnerId == like.OwnerId && likedb.PostsId == like.PostsId
            select likedb;
        
        var likeList = await query.ToListAsync();
        var theLike = likeList.FirstOrDefault();
        
        return theLike;
    }

    public async Task<List<Post>> OrderByLikes(int indexPage)
    {

        var query = 
            from post in context.Posts
            orderby post.Likes descending
            select post;
        
        return await query
                    .Skip(indexPage)
                    .Take(10)
                    .ToListAsync();
    }

    public async Task<List<PostResult>> SelectAll()
    {
        List<PostResult> postResultList = new();
        var query = 
            from post in context.Posts.Include(p => p.Owner).Include(p => p.Forum)
            orderby post.Likes descending
            select post;

        foreach (Post post in query)
        {
            PostResult pr = new();
            pr.Id = post.Id;
            pr.Title = post.Title;
            pr.PostMessage = post.PostMessage;
            pr.OwnerName = post.Owner.Username;
            pr.ForumTitle = post.Forum.Title;
            pr.Likes = post.Likes;
            
            postResultList.Add(pr);
        }
        return postResultList;
    }

    public async Task Update(Post post)
    {
        context.Update(post);
        await context.SaveChangesAsync();
    }
}