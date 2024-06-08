using Bonamana.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bonamana.API.Context;
public class BonamanaContext : DbContext
{
    public BonamanaContext(DbContextOptions<BonamanaContext> context) : base(context)
    {

    }
    public DbSet<Todo> Todos => Set<Todo>();
    public DbSet<TodoList> TodoLists => Set<TodoList>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Todo>().Property(x => x.CreatedDate).HasDefaultValue(DateTime.UtcNow).ValueGeneratedOnAdd();

    }
}