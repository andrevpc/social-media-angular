using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Model;

public interface IPostRepository
{
    Task Create(Post post);
    Task Update(Post post);
    Task Delete(Post post);
    Task<List<Post>> OrderByLikes(int indexPage);
}