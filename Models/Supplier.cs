using System.Collections.Generic;

namespace InventoryManagement.Models
{
    public class Supplier
    {
        public int Id { get; set; }

        public string Name { get; set; }= null!;

        public string? Address { get; set; }

        public string Email { get; set; }= null!;

        public List <Product>? Products { get; set; }

    }

}
