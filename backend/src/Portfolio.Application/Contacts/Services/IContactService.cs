using Portfolio.Application.Contacts.Dtos;

namespace Portfolio.Application.Contacts.Services;

public interface IContactService
{
    Task<IReadOnlyList<ContactMessageDto>> GetAllAsync(CancellationToken ct = default);
    Task<ContactMessageDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<ContactMessageDto> SendAsync(CreateContactMessageDto dto, CancellationToken ct = default);
    Task<bool> MarkAsReadAsync(Guid id, CancellationToken ct = default);
}
