using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.Contacts.Dtos;
using Portfolio.Application.Contacts.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class ContactsController(IContactService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await service.GetAllAsync(ct));

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var result = await service.GetByIdAsync(id, ct);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Send([FromBody] CreateContactMessageDto dto, CancellationToken ct)
    {
        var created = await service.SendAsync(dto, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPatch("{id:guid}/read")]
    public async Task<IActionResult> MarkAsRead(Guid id, CancellationToken ct)
    {
        var updated = await service.MarkAsReadAsync(id, ct);
        return updated ? NoContent() : NotFound();
    }
}
