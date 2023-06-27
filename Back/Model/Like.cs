using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Like
{
    public int Id { get; set; }

    public bool IsLike { get; set; }

    public int OwnerId { get; set; }

    public int PostsId { get; set; }

    public virtual User Owner { get; set; }

    public virtual Post Posts { get; set; }
}
