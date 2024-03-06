using System.Collections.Generic;

namespace InventoryManagement.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; }= null!;
        
        public List <Order>? Orders { get; set; } 
        
    }

}
