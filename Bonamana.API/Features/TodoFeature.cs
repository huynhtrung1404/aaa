using Bonamana.API.Context;
using Bonamana.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bonamana.API.Features;
public static class TodoFeature
{
    public static IEndpointRouteBuilder? UseTodoItemEndpoint(this IEndpointRouteBuilder builder)
    {
        var todoItemGroup = builder.MapGroup("TodoItem").WithTags("Todo Item Feature");
        todoItemGroup.MapGet("/", async (BonamanaContext context) => TypedResults.Ok(await context.Todos.ToListAsync()));
        todoItemGroup.MapGet("/getDetail/{id}", async (BonamanaContext context, string id) => TypedResults.Ok(await context.Todos.SingleOrDefaultAsync(x => x.Id.Equals(id))));
        todoItemGroup.MapPost("/postTodo", async (BonamanaContext context, [FromBody] Todo todo) =>
        {
            context.Todos.Add(todo);
            await context.SaveChangesAsync();
            return TypedResults.Created();
        });
        todoItemGroup.MapPut("/put", async (BonamanaContext context, [FromBody] Todo todo) =>
        {
            var data = await context.Todos.SingleOrDefaultAsync(x => x.Id.Equals(todo.Id));
            if (data is null)
                return Results.BadRequest();
            data = todo;
            return TypedResults.Ok(await context.SaveChangesAsync());
        });
        todoItemGroup.MapDelete("/delete/{id}", async (BonamanaContext context, string id) =>
        {
            var data = await context.Todos.SingleOrDefaultAsync(x => x.Id.Equals(id));
            if (data is null)
                return Results.BadRequest();
            context.Todos.Remove(data);
            return TypedResults.Ok(await context.SaveChangesAsync());
        });
        return todoItemGroup;
    }
    // Using type result
    public static IEndpointRouteBuilder? UseTodoListEndpoint(this IEndpointRouteBuilder builder)
    {
        var todoList = builder.MapGroup("TodoList").WithTags("Todo List Feature");
        todoList.MapGet("/", async (BonamanaContext context) => TypedResults.Ok(await context.TodoLists.Include(x => x.Todos).ToListAsync()));
        todoList.MapGet("/getDetail", async (BonamanaContext context, int id) => TypedResults.Ok(await context.TodoLists.SingleOrDefaultAsync(x => x.Id.Equals(id))));
        todoList.MapPost("/post", async (BonamanaContext context, TodoList item) =>
        {
            await context.AddAsync(item);
            await context.SaveChangesAsync();
            return TypedResults.Created();
        });
        todoList.MapPut("/put", async (BonamanaContext context, TodoList item) =>
        {
            context.Update(item);
            await context.SaveChangesAsync();
            return TypedResults.Ok();
        });
        todoList.MapDelete("delete", async (BonamanaContext context, int id) =>
        {
            var data = await context.TodoLists.SingleOrDefaultAsync(x => x.Id.Equals(id));
            if (data is null)
            {
                return Results.BadRequest();
            }
            context.Remove(data);
            await context.SaveChangesAsync();
            return TypedResults.Ok();
        });
        return builder;
    }
}