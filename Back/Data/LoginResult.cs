namespace Back.Data;

public class LoginResult
{
    public bool UserExist { get; set; }
    public bool Success { get; set; }
    public string Jwt { get; set; }
}