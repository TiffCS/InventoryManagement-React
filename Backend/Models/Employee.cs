using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InventoryManagement.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; }= null!;
        
        [JsonIgnore]
        public List <Order>? Orders { get; set; } 
        
    }

}
