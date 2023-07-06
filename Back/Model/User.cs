using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; }

    public string Username { get; set; }

    public string UserPassword { get; set; }

    public string ProfilePic { get; set; }

    public DateTime Age { get; set; }

    public string Salt { get; set; }

    public virtual ICollection<Follow> FollowFollowers { get; set; } = new List<Follow>();

    public virtual ICollection<Follow> FollowUsers { get; set; } = new List<Follow>();

    public virtual ICollection<Forum> Forums { get; set; } = new List<Forum>();

    public virtual ICollection<HasPosition> HasPositions { get; set; } = new List<HasPosition>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<Token> Tokens { get; set; } = new List<Token>();
}
