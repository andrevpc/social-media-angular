using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Forum
{
    public int Id { get; set; }

    public string ForumPhoto { get; set; }

    public string Title { get; set; }

    public string ForumDescription { get; set; }

    public DateTime Created { get; set; }

    public int OwnerId { get; set; }

    public virtual User Owner { get; set; }

    public virtual ICollection<Position> Positions { get; set; } = new List<Position>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}
