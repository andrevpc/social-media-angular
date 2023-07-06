using System.Threading.Tasks;

namespace Back.Services;

using Model;

public interface IUserRepository
{
    Task Create(User user);
    Task Update(User user);
    Task<User> FindByName(string userName);
    Task<User> FindById(int userId);
}