using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WAD11991.DAL.Data;
using WAD11991.DAL.Models;
using WAD11991.DAL.Repositories;

namespace WAD11991.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectItemsController : ControllerBase
    {
        private readonly IRepository<ProjectItem> _projectRepository;

        public ProjectItemsController(IRepository<ProjectItem> projectRepository)
        {
            _projectRepository = projectRepository;
        }

        // GET: api/ProjectItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectItem>>> GetProjects()
        {
            return Ok(await _projectRepository.GetAllAsync());
        }

        // GET: api/ProjectItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectItem>> GetProjectItem(int id)
        {
            try
            {
                return Ok(await _projectRepository.GetByIDAsync(id));
            }
            catch
            {
                throw;
            }
        }

        // PUT: api/ProjectItems
        [HttpPut]
        public async Task<IActionResult> PutProjectItem(ProjectItem projectItem)
        {
            try
            {
                await _projectRepository.UpdateAsync(projectItem);
            }
            catch (Exception)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectItems
        [HttpPost]
        public async Task<ActionResult<ProjectItem>> PostProjectItem(ProjectItem projectItem)
        {
            await _projectRepository.AddAsync(projectItem);

            return CreatedAtAction("GetProjectItem", new { id = projectItem.Id }, projectItem);
        }

        // DELETE: api/ProjectItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectItem(int id)
        {
            try
            {
                await _projectRepository.DeleteAsync(id);
            }
            catch
            {
                throw;
            }
            return NoContent();
        }
    }
}
