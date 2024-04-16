using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace InventoryManagement.Models
{
public class InventoryManagementContext : IdentityDbContext<IdentityUser>
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
