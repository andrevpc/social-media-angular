using System.Threading.Tasks;
using System.Linq;

namespace Back.Services;

using System.Collections.Generic;
using Back.Data;
using Back.Model;
using Microsoft.EntityFrameworkCore;

public class LikeRepository : ILikeRepository
{
    private readonly ProjetoAngularContext context;
    public LikeRepository(ProjetoAngularContext context)
        => this.context = context;


    public async Task CreateLike(Like like)
    {
        await context.AddAsync(like);
        await context.SaveChangesAsync();
    }

    public async Task DeleteLike(Like like)
    {
        context.Remove(like);
        await context.SaveChangesAsync();
    }


    public async Task<Like> FindLike(Like like)
    {
        var query =
            from likedb in context.Likes
            where likedb.OwnerId == like.OwnerId && likedb.PostsId == like.PostsId
            select likedb;
        
        var likeList = await query.ToListAsync();
        var theLike = likeList.FirstOrDefault();
        
        return theLike;
    }
}