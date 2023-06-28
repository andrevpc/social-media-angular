namespace Back.Data;

public class PostData
{
    public string Title { get; set; }
    public int ForumId { get; set; }
    public string Message { get; set; }
    public int OwnerId { get; set; }
    public int? PostsId { get; set; }
}