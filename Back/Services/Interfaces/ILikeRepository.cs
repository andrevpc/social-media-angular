using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Back.Data;
using Model;

public interface ILikeRepository
{
    Task CreateLike (Like like);
    Task DeleteLike (Like like);
    Task<Like> FindLike(Like like);
    Task<List<Like>> GetLikesFromAPost(int id);
}