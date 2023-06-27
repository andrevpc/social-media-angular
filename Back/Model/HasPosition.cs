using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class HasPosition
{
    public int Id { get; set; }

    public int PositionId { get; set; }

    public int UsuarioId { get; set; }

    public virtual Position Position { get; set; }

    public virtual User Usuario { get; set; }
}
