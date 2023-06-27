using Security.Jwt;

namespace Back.Services;

public class SecurityService : ISecurityService
{
    public string ApplyHash(string password, string salt)
    {
        throw new System.NotImplementedException();
    }

    public string GenerateSalt()
    {
        throw new System.NotImplementedException();
    }
}