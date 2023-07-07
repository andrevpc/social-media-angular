using System.Linq;
using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Model;

public class FollowRepository : IFollowRepository
{
    private readonly ProjetoAngularContext context;
    public FollowRepository(ProjetoAngularContext context)
        => this.context = context;
    public async Task Create(Follow follow)
    {
        await context.AddAsync(follow);
        await context.SaveChangesAsync();
    }

    public async Task Remove(Follow follow)
    {
        context.Remove(follow);
        await context.SaveChangesAsync();
    }

    public async Task<Follow> FindFollow(User Follower, User User)
    {
        var query =
            from follow in context.Follows
            where follow.Follower == Follower && follow.User == User
            select follow;
        
        var followList = await query.ToListAsync();
        var followed = followList.FirstOrDefault();
        
        return followed;
    }

    public async Task<List<Follow>> FindFollowing(User User)
    {
        var query =
            from follow in context.Follows.Include(follow => follow.User)
            where follow.FollowerId == User.Id
            select follow;
        
        var followingList = await query.ToListAsync();
        
        return followingList;
    }
} 