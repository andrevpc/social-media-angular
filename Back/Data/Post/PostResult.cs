namespace Back.Data;

public class PostResult
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string PostMessage { get; set; }
    public string OwnerName { get; set; }
    public int OwnerId { get; set; }
    public string ForumTitle { get; set; }
    public int? Likes { get; set; }
}