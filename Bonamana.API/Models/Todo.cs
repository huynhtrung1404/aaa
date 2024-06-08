namespace Bonamana.API.Models;
public class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime DueDate { get; set; }
    public string? Location { get; set; }
    public int TodoListId { get; set; }
    public TodoList TodoList { get; set; } = null!;

}