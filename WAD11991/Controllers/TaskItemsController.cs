using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Microsoft.EntityFrameworkCore;
using WAD11991.DAL.Models;
using WAD11991.DAL.Repositories;

namespace WAD11991.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemsController : ControllerBase
    {
        private readonly IRepository<TaskItem> _taskRepository;

        public TaskItemsController(IRepository<TaskItem> repository)
        {
            _taskRepository = repository;
        }

        // GET: api/TaskItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return Ok(await _taskRepository.GetAllAsync());
        }

        // GET: api/TaskItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(int id)
        {
            try
            {
                return Ok(await _taskRepository.GetByIDAsync(id));
            }
            catch
            {
                throw;
            }
        }

        // PUT: api/TaskItems
        [HttpPut]
        public async Task<IActionResult> PutTaskItem(TaskItem taskItem)
        {
            try
            {
                await _taskRepository.UpdateAsync(taskItem);
            }
            catch (Exception)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/TaskItems
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItem taskItem)
        {
            try
            {
                await _taskRepository.AddAsync(taskItem);
            }
            catch (Exception)
            {
                throw;
            }

            return CreatedAtAction("GetTaskItem", new { id = taskItem.Id }, taskItem);
        }

        // DELETE: api/TaskItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(int id)
        {
            try
            {
                await _taskRepository.DeleteAsync(id);
            }
            catch
            {
                throw;
            }
            return NoContent();
        }
    }
}
