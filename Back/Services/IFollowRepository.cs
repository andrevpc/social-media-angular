using System.Threading.Tasks;

namespace Back.Services;

using Model;

public interface IFollowRepository
{
    Task<Follow> FindFollow(User Follower, User User);
    Task CreateFollow(Follow follow);
}