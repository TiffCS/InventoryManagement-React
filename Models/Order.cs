using System.Collections.Generic;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public Employee? Employee { get; set; }

        [JsonIgnore]
        public Stock? Stock { get; set; }

    }

}
