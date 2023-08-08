using BIGBANG_ASSESMENT3.Interface;
using BIGBANG_ASSESMENT3.Models;
using BIGBANG_ASSESMENT3.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BIGBANG_ASSESMENT3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelagentController : ControllerBase
    {
        private readonly ITravelagentRepo _agentRepo;

        public TravelagentController(ITravelagentRepo agentRepo)
        {
            _agentRepo = agentRepo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TravelAgent>> GetTravelAgents()
        {
            var agents = _agentRepo.GetTravelAgents();
            return Ok(agents);
        }

        [HttpGet("{id}")]
        public ActionResult<TravelAgent> GetTravelAgent(int id)
        {
            var agent = _agentRepo.GetTravelAgentById(id);
            if (agent == null)
            {
                return NotFound();
            }
            return Ok(agent);
        }

        [HttpPost]
        public async Task<ActionResult<TravelAgent>> Post([FromForm] TravelAgent travel, IFormFile imageFile)
        {

            try
            {
                var createdCourse = await _agentRepo.CreateTravelagent(travel, imageFile);
                return CreatedAtAction("Get", new { id = createdCourse.traveller_agent_id }, createdCourse);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TravelAgent>> PutTravelAgent(int id, TravelAgent agent)
        {
            var updatedAgent = await _agentRepo.UpdateTravelAgent(id, agent);
            if (updatedAgent == null)
            {
                return NotFound();
            }
            return Ok(updatedAgent);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTravelAgent(int id)
        {
            var deletedAgent = _agentRepo.DeleteTravelAgent(id);
            if (deletedAgent == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut("UpdateStatus")]
        public async Task<ActionResult<TravelagentDTO>> UpdateStatus(TravelagentDTO status)
        {
            var result = await _agentRepo.UpdateStatus(status);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPut("DeclineAgents")]
        public async Task<ActionResult<List<TravelagentDTO>>> UpdateDeclineStatus(TravelagentDTO status)
        {
            var result = await _agentRepo.Decline(status);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("RequestedAgents")]
        public async Task<ActionResult<List<TravelAgent>>> GetRequestedAgents()
        {
            var result = await _agentRepo.GetRequestedAgents();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("AcceptedAgents")]
        public async Task<ActionResult<List<TravelAgent>>> GetAcceptedAgents()
        {
            var result = await _agentRepo.GetAcceptedAgents();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
