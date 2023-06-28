using System.Linq;
using System.Threading.Tasks;

namespace Back.Services;

using Microsoft.EntityFrameworkCore;
using Model;

public class FollowRepository : IFollowRepository
{
    private readonly ProjetoAngularContext context;
    public FollowRepository(ProjetoAngularContext context)
        => this.context = context;
    public async Task CreateFollow(Follow follow)
    {
        await context.AddAsync(follow);
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
}