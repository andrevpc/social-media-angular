using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Back.Data;
using Model;

public interface IPostRepository
{
    Task Create(Post post);
    Task Update(Post post);
    Task Delete(Post post);
    Task<List<Post>> OrderByLikes(int indexPage);
    Task<Post> FindById(int id);
    Task<Post> FindByName(string title);
    Task<List<PostResult>> SelectAll();
    Task<List<PostResult>> FilterByForum(string[] forums);
    Task<Like> FindLike(FindLikeData like);
    Task CreateLike (Like like);
}