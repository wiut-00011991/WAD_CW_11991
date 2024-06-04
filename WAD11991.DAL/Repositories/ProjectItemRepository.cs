using Microsoft.Build.Evaluation;
using Microsoft.CodeAnalysis;
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
    public class ProjectItemRepository : IRepository<Models.ProjectItem>
    {
        private readonly TaskTrackerDbContext _context;
        public ProjectItemRepository(TaskTrackerDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(Models.ProjectItem entity)
        {
            _context.Projects.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var projectItem = await _context.Projects.FindAsync(id);
            if (projectItem == null)
            {
                throw new Exception("The specified project id wasn't found.");
            }
            var associatedTasks = _context.Tasks.Where(t => t.ProjectId == id);
            foreach (var task in associatedTasks)
            {
                task.ProjectId = null;
                _context.Entry(task).State = EntityState.Modified;
            }
            _context.Projects.Remove(projectItem);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Models.ProjectItem>> GetAllAsync()
        {
            return await _context.Projects.Include(p => p.Tasks).ToListAsync();
        }

        public async Task<Models.ProjectItem> GetByIDAsync(int id)
        {
            var projectItem = await _context.Projects.Include(t => t.Tasks).FirstOrDefaultAsync(t => t.Id == id);
            if (projectItem == null)
            {
                throw new Exception("The specified project id wasn't found.");
            }
            return projectItem;
        }

        public async Task UpdateAsync(Models.ProjectItem entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                if (!ProjectItemExists(entity.Id))
                {
                    throw new Exception("The specified project id wasn't found.");
                }
                else
                {
                    throw;
                }
            }
        }
        private bool ProjectItemExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
    }
}
