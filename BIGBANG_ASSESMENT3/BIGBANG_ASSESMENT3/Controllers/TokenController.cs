using BIGBANG_ASSESMENT3.Context;
using BIGBANG_ASSESMENT3.Models;
using BIGBANG_ASSESMENT3.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Numerics;
using System.Security.Claims;
using System.Text;

namespace BIGBANG_ASSESMENT3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AdminContext _context;
        private const string AdminRole = "Admin";
        private const string AgentRole = "Agent";
        public TokenController(IConfiguration configuration, AdminContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        [HttpPost("Admin")]
        public async Task<IActionResult> PostAdmin(Admin adminData)
        {
            if (adminData != null && !string.IsNullOrEmpty(adminData.Admin_name) && !string.IsNullOrEmpty(adminData.Admin_password))
            {
                if (adminData.Admin_name == "Admin" && adminData.Admin_password == "Admin@123/")
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Admin_id", "1"),
                        new Claim("Admin_name", adminData.Admin_name),
                        new Claim("Admin_password", adminData.Admin_password),
                        new Claim(ClaimTypes.Role, AdminRole)
                    };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
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
        [HttpPost("Traveller")]
        public async Task<IActionResult> Post(TravelAgent _userData)
        {
            if (_userData != null && _userData.traveller_agent_name != null && _userData.traveller_agent_password != null)
            {
                var user = await GetUser(_userData.traveller_agent_name, _userData.traveller_agent_password);
                if (user != null)
                {
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("traveller_agent_id", user.traveller_agent_id.ToString()),
                        new Claim("traveller_agent_name", user.traveller_agent_name),
                        new Claim("traveller_agent_name", user.traveller_agent_name),
                        new Claim(ClaimTypes.Role, AgentRole)

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
                        id = user.traveller_agent_id
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

        private async Task<TravelAgent> GetUser(string name, string password)
        {
            return await _context.travelAgents.FirstOrDefaultAsync(x => x.traveller_agent_name == name && x.traveller_agent_password == password);

        }
    }
}
