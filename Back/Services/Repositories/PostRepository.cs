using System.Threading.Tasks;
using System.Linq;

namespace Back.Services;

using System.Collections.Generic;
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

    public async Task Delete(Post post)
    {
        context.Remove(post);
        await context.SaveChangesAsync();
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

    public async Task<List<Post>> SelectAll()
    {
        var query = 
            from post in context.Posts
            orderby post.Likes descending
            select post;
        
        return await query.ToListAsync();
    }

    public async Task Update(Post post)
    {
        context.Update(post);
        await context.SaveChangesAsync();
    }
}