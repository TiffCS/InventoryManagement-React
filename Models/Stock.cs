using System.Collections.Generic;

namespace InventoryManagement.Models
{
    public class Stock
    {
       public int Id { get; set; }

        public double QuantityAvailable { get; set; }

        public double? ReorderQuantity { get; set; }

        public int ProductId { get; set; }

    
        public List<Order>? Orders { get; set; }

    }

}