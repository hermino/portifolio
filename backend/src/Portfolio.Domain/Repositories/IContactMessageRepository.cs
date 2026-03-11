using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Repositories;

public interface IContactMessageRepository
{
    Task<IReadOnlyList<ContactMessage>> GetAllAsync(CancellationToken ct = default);
    Task<ContactMessage?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(ContactMessage message, CancellationToken ct = default);
    void Update(ContactMessage message);
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
