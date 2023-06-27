using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Position
{
    public int Id { get; set; }

    public string Nome { get; set; }

    public int Tier { get; set; }

    public int ForumId { get; set; }

    public virtual Forum Forum { get; set; }

    public virtual ICollection<HasPermission> HasPermissions { get; set; } = new List<HasPermission>();

    public virtual ICollection<HasPosition> HasPositions { get; set; } = new List<HasPosition>();
}
