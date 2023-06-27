using System.Linq;
using System.Threading.Tasks;

namespace Back.Services;

using Microsoft.EntityFrameworkCore;
using Model;

public class UserRepository : IUserRepository
{
    private readonly ProjetoAngularContext context;
    public UserRepository(ProjetoAngularContext context)
        => this.context = context;

    public async Task Create(User user)
    {
        await context.AddAsync(user);
        await context.SaveChangesAsync();
    }

    public async Task<User> FindByName(string userName)
    {
        var query =
            from user in context.Users
            where user.Username == userName
            select user;
        
        var userList = await query.ToListAsync();
        var logged = userList.FirstOrDefault();
        
        return logged;
    }

    public async Task Update(User user)
    {
        context.Update(user);
        await context.SaveChangesAsync();
    }
}