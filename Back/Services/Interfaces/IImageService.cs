using System.Threading.Tasks;

namespace Back.Services;

using System.Collections.Generic;
using Model;

public interface IImageService
{
    public string GetImageURI(byte[] img);
}