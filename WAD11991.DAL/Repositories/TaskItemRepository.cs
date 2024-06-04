using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WAD11991.DAL.Data;
using WAD11991.DAL.Models;

namespace WAD11991.DAL.Repositories
{
    public class TaskItemRepository : IRepository<TaskItem>
    {
        private readonly TaskTrackerDbContext _context;

        public TaskItemRepository(TaskTrackerDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(TaskItem entity)
        {
            var p = await _context.Projects
                .Include(p => p.Tasks) // Make sure Tasks collection is loaded
                .FirstOrDefaultAsync(p => p.Id == entity.ProjectId);

            if (p != null)
            {
                p.Tasks.Add(entity);
                _context.Entry(p).State = EntityState.Modified;
            }
            else
            {
                throw new Exception("The specified ProjectId does not exist.");
            }

            _context.Tasks.Add(entity);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var taskItem = await _context.Tasks.FindAsync(id);
            if (taskItem == null)
            {
                throw new Exception("The specified task id wasn't found.");
            }

            _context.Tasks.Remove(taskItem);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {
            return await _context.Tasks.Include(t => t.Project).ToListAsync();
        }

        public async Task<TaskItem> GetByIDAsync(int id)
        {
            var taskItem = await _context.Tasks.Include(t => t.Project).FirstOrDefaultAsync(t => t.Id == id);
            if (taskItem == null)
            {
                throw new Exception("The specified task id wasn't found.");
            }
            return taskItem;
        }

        public async Task UpdateAsync(TaskItem entity)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == entity.ProjectId);
            if (!projectExists)
            {
                throw new Exception("The specified project id wasn't found.");
            }
            _context.Entry(entity).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                if (!TaskItemExists(entity.Id))
                {
                    throw new Exception("The specified task id wasn't found.");
                }
                else
                {
                    throw;
                }
            }
        }

        private bool TaskItemExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
