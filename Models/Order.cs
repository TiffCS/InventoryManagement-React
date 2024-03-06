using System.Collections.Generic;

namespace InventoryManagement.Models
{
    public class Order
    {
       public int Id { get; set; }

        public double OrderQuantity { get; set; }

        public decimal OrderCost { get; set; }

        public int EmployeeId { get; set; }

        public int StockId { get; set; }

        public DateTime Date { get; set; }

    
        public Employee? Employee { get; set; }

        
        public Stock? Stock { get; set; }

    }

}
