using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Model;

public interface IFollowRepository
{
    Task Create(Follow follow);
    Task Remove(Follow follow);
    Task<Follow> FindFollow(User Follower, User User);
    Task<List<Follow>> FindFollowing(User User);
}