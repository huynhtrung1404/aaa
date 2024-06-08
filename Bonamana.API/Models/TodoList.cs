namespace Bonamana.API.Models;
public class TodoList
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public bool IsRemoved { get; set; }
    public ICollection<Todo> Todos { get; } = new List<Todo>();
}