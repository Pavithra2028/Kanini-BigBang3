using BIGBANG_ASSESMENT3.Models;
using BIGBANG_ASSESMENT3.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BIGBANG_ASSESMENT3.Interface
{
    public interface ITravelagentRepo
    {

        public IEnumerable<TravelAgent> GetTravelAgents();
        public TravelAgent GetTravelAgentById(int agentId);
        Task<TravelAgent> CreateTravelagent([FromForm] TravelAgent travelagent, IFormFile imageFile);
        Task<TravelAgent> UpdateTravelAgent(int agentId, TravelAgent agent);
        public TravelAgent DeleteTravelAgent(int agentId);
        public Task<TravelagentDTO> UpdateStatus(TravelagentDTO status);

        public Task<TravelagentDTO> Decline(TravelagentDTO status);
        public Task<List<TravelAgent>> GetRequestedAgents();
        public Task<List<TravelAgent>> GetAcceptedAgents();
    }
}
