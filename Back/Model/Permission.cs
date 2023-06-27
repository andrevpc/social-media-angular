using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Permission
{
    public int Id { get; set; }

    public string Nome { get; set; }

    public virtual ICollection<HasPermission> HasPermissions { get; set; } = new List<HasPermission>();
}
