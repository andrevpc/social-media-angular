using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Post
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string PostMessage { get; set; }

    public string Upload { get; set; }

    public int? Likes { get; set; }

    public int OwnerId { get; set; }

    public int ForumId { get; set; }

    public int? PostsId { get; set; }

    public DateTime Created { get; set; }

    public virtual Forum Forum { get; set; }

    public virtual ICollection<Post> InversePosts { get; set; } = new List<Post>();

    public virtual ICollection<Like> LikesNavigation { get; set; } = new List<Like>();

    public virtual User Owner { get; set; }

    public virtual Post Posts { get; set; }
}
