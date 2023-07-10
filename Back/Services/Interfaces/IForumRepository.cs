using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Model;

public interface IForumRepository
{
    Task Create(Forum forum);
    Task Update(Forum forum);
    Task Delete(Forum forum);
    Task<Forum> FindByTitle(string title);
    Task<Forum> FindById(int id);
    Task<List<Forum>> GetAllForumsThatTheUserCanPost();
    Task<List<Forum>> AllForums();
    Task<List<Forum>> ForumsUserOwns(int id);
}