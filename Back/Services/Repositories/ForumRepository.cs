using System.Threading.Tasks;
using System.Linq;

namespace Back.Services;

using System.Collections.Generic;
using Back.Model;
using Microsoft.EntityFrameworkCore;

public class ForumRepository : IForumRepository
{
    private readonly ProjetoAngularContext context;
    public ForumRepository(ProjetoAngularContext context)
        => this.context = context;
    public async Task Create(Forum forum)
    {
        await context.AddAsync(forum);
        await context.SaveChangesAsync();
    }

    public async Task Delete(Forum forum)
    {
        context.Remove(forum);
        await context.SaveChangesAsync();
    }

    public async Task<Forum> FindByTitle(string title)
    {
        var query =
            from forum in context.Forums
            where forum.Title == title
            select forum;
        
        var forumList = await query.ToListAsync();
        var theForum = forumList.FirstOrDefault();
        
        return theForum;
    }

    public async Task<Forum> FindById(int id)
    {
        var query =
            from forum in context.Forums
            where forum.Id == id
            select forum;
        
        var forumList = await query.ToListAsync();
        var theForum = forumList.FirstOrDefault();
        
        return theForum;
    }

    public async Task Update(Forum forum)
    {
        context.Update(forum);
        await context.SaveChangesAsync();
    }

    public async Task<List<Forum>> GetAllForumsThatTheUserCanPost()
    {
        var query =
            from forum in context.Forums
            select forum;
        
        var forumList = await query.ToListAsync();
        
        return forumList;
    }
}