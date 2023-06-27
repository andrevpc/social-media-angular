using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Follow
{
    public int Id { get; set; }

    public int FollowerId { get; set; }

    public int UserId { get; set; }

    public virtual User Follower { get; set; }

    public virtual User User { get; set; }
}
