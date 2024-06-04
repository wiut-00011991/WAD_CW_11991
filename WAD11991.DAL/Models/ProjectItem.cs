using System.Text.Json.Serialization;

namespace WAD11991.DAL.Models
{
    public class ProjectItem
    {
        private string name;

        public int Id { get; set; }
        public required string Name { get => name;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new Exception("Project must have a name!");
                name = value;
            }
        }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        [JsonIgnore]
        public List<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
