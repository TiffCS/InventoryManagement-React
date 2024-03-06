using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Models
{
public class InventoryManagementContext : DbContext
    {
        public InventoryManagementContext(DbContextOptions<InventoryManagementContext> options) : base(options)
        {

        }
        public  DbSet<Employee> Employees { get; set; }

        public  DbSet<Order> Orders { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Stock> Stocks { get; set; }

        public DbSet<Supplier> Suppliers { get; set; }

    }
}
