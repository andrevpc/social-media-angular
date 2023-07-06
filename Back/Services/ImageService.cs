using Security.Jwt;
using System;
using System.Security.Cryptography;
using System.Text;

namespace Back.Services;

public class ImageService : IImageService
{
    public string GetImageURI(byte[] img)
    {
        string base64Img = Convert.ToBase64String(img);
        return ("data:image/;base64," + base64Img);
    }
}