using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class HasPermission
{
    public int Id { get; set; }

    public int PositionId { get; set; }

    public int PermissionId { get; set; }

    public virtual Permission Permission { get; set; }

    public virtual Position Position { get; set; }
}
