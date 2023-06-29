namespace Back.Data;

public class PostCreateData
{
    public string Title { get; set; }
    public int ForumId { get; set; }
    public string PostMessage { get; set; }
    public string OwnerIdjwt { get; set; }
}