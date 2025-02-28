using System;
using System.ComponentModel.DataAnnotations;

namespace SimpleToDoproject.Entity;

public class ToDoItem
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsCompleted { get; set; }
}
