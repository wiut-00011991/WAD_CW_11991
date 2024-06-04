using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using WAD11991.DAL.Data;

namespace WAD11991.DAL.Models
{
    public class TaskItem
    {
        private string name;
        private string contributionComment;

        public int Id { get; set; }
        public required string Name { 
            get => name;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new Exception("Task name cannot be empty!");
                name = value;
            }
        }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public required string ContributionComment { get => contributionComment;
            set 
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new Exception("Contribution comment must be present!");
                contributionComment = value;
            }
        }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int? ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        //[JsonIgnore] // done to avoid circular serialization error
        public ProjectItem? Project { get; set; }
    }
}
