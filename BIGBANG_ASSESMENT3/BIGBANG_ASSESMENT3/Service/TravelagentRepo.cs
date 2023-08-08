using BIGBANG_ASSESMENT3.Context;
using BIGBANG_ASSESMENT3.Interface;
using BIGBANG_ASSESMENT3.Models;
using BIGBANG_ASSESMENT3.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace BIGBANG_ASSESMENT3.Service
{
    public class TravelAgentRepo:ITravelagentRepo
    {
        private readonly AdminContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public TravelAgentRepo(AdminContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public IEnumerable<Models.TravelAgent> GetTravelAgents()
        {
            return _context.travelAgents.ToList();
        }

        public Models.TravelAgent GetTravelAgentById(int agentId)
        {
            return _context.travelAgents.FirstOrDefault(a => a.traveller_agent_id == agentId);
        }

        public async Task<TravelAgent> CreateTravelagent([FromForm] TravelAgent travelagent, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            travelagent.agentimage = fileName;
            travelagent.Status = "Requested";
            _context.travelAgents.Add(travelagent);
            await _context.SaveChangesAsync();

            return travelagent;
        }
        public async Task<Models.TravelAgent> UpdateTravelAgent(int agentId, Models.TravelAgent agent)
        {
            var existingAgent = await _context.travelAgents.FindAsync(agentId);
            if (existingAgent == null)
            {
                return null;
            }

            existingAgent.traveller_agent_name = agent.traveller_agent_name;
            existingAgent.traveller_agent_password = agent.traveller_agent_password;
            existingAgent.Status = agent.Status;
            existingAgent.Phonenumber = agent.Phonenumber;

            await _context.SaveChangesAsync();

            return existingAgent;
        }

        public Models.TravelAgent DeleteTravelAgent(int agentId)
        {
            var agent = _context.travelAgents.FirstOrDefault(a => a.traveller_agent_id == agentId);
            if (agent != null)
            {
                _context.travelAgents.Remove(agent);
                _context.SaveChanges();
                return agent;
            }
            return null;
        }

        public async Task<TravelagentDTO> UpdateStatus(TravelagentDTO status)
        {
            var agency = await _context.travelAgents.FirstOrDefaultAsync(s => s.traveller_agent_id == status.id);

            if (agency != null && agency.Status == "Requested")
            {
                agency.Status = "Accepted";
                await _context.SaveChangesAsync();
                return status; // Return the updated status
            }

            return null;
        }
        public async Task<TravelagentDTO> Decline(TravelagentDTO status)
        {
            var agency = await _context.travelAgents.FirstOrDefaultAsync(s => s.traveller_agent_id == status.id);
            if (agency != null)
            {
                if (agency.Status == "Requested")
                {
                    agency.Status = "Declined";
                    await _context.SaveChangesAsync();
                    return status;
                }
                return status;
            }
            return null;
        }
        public async Task<List<Models.TravelAgent>> GetRequestedAgents()
        {
            var requestedAgents = await _context.travelAgents.Where(agent => agent.Status == "Requested").ToListAsync();
            if (requestedAgents != null)
            {
                return requestedAgents;
            }
            return null;
        }

        public async Task<List<Models.TravelAgent>> GetAcceptedAgents()
        {
            var acceptedAgents = await _context.travelAgents.Where(agent => agent.Status == "Accepted").ToListAsync();
            if (acceptedAgents != null)
            {
                return acceptedAgents;
            }
            return null;
        }
    }
}
