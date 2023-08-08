using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Travellers.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Travellers.Context;
using System.Numerics;


namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly TravellersContext _context;
        private const string TravellerRole = "Traveller";
        public TokenController(IConfiguration configuration, TravellersContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        [HttpPost("Travellerlogin")]
        public async Task<IActionResult> Post(Traveller _userData)
        {
            if (_userData != null && _userData.travellers_name != null && _userData.password != null)
            {
                var user = await GetUser(_userData.travellers_name, _userData.password);

                if (user != null)
                {
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("travellers_id", user.travellers_id.ToString()),
                        new Claim("travellers_name", user.travellers_name),
                        new Claim("password",user.password),
                        new Claim(ClaimTypes.Role, TravellerRole)

                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);

                    var response = new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        id = user.travellers_id,
                        username = user.travellers_name
                    };

                    return Ok(response);
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
           
        }
        private async Task<Traveller> GetUser(string name, string password)
        {
            return await _context.travellers.FirstOrDefaultAsync(x => x.travellers_name == name && x.password == password);

        }
    }
}
