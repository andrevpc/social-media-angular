using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Token
{
    public string Token1 { get; set; }

    public int OwnerId { get; set; }

    public virtual User Owner { get; set; }
}
