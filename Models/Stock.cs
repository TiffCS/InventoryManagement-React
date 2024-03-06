using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InventoryManagement.Models
{
    public class Stock
    {
       public int Id { get; set; }

        public double QuantityAvailable { get; set; }

        public double? ReorderQuantity { get; set; }

        public int ProductId { get; set; }

        [JsonIgnore]
        public List<Order>? Orders { get; set; }

    }

}