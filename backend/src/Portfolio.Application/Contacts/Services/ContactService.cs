using Portfolio.Application.Contacts.Dtos;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Repositories;

namespace Portfolio.Application.Contacts.Services;

public sealed class ContactService(IContactMessageRepository repository) : IContactService
{
    public async Task<IReadOnlyList<ContactMessageDto>> GetAllAsync(CancellationToken ct = default)
    {
        var messages = await repository.GetAllAsync(ct);
        return messages.Select(ToDto).ToList();
    }

    public async Task<ContactMessageDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var message = await repository.GetByIdAsync(id, ct);
        return message is null ? null : ToDto(message);
    }

    public async Task<ContactMessageDto> SendAsync(CreateContactMessageDto dto, CancellationToken ct = default)
    {
        var message = ContactMessage.Create(dto.Name, dto.Email, dto.Message);
        await repository.AddAsync(message, ct);
        await repository.SaveChangesAsync(ct);
        return ToDto(message);
    }

    public async Task<bool> MarkAsReadAsync(Guid id, CancellationToken ct = default)
    {
        var message = await repository.GetByIdAsync(id, ct);
        if (message is null) return false;

        message.MarkAsRead();
        repository.Update(message);
        await repository.SaveChangesAsync(ct);
        return true;
    }

    private static ContactMessageDto ToDto(ContactMessage m) =>
        new(m.Id, m.Name, m.Email, m.Message, m.CreatedAt, m.IsRead);
}
