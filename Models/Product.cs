using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InventoryManagement.Models
{
    public class Product
    {
       public int Id { get; set; }

        public string Category { get; set; }= null!;

        public string? Brand { get; set; }

        public string Name { get; set; }= null!;

        public string Size { get; set; } = null!;

        public decimal UnitCost { get; set; }

        public int? SupplierId { get; set; }

        [JsonIgnore]
        public List <Stock>? Stocks { get; set; } 

    }

}