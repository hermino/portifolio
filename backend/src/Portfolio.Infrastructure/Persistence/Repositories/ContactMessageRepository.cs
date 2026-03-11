using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public sealed class ContactMessageRepository(AppDbContext context) : IContactMessageRepository
{
    public async Task<IReadOnlyList<ContactMessage>> GetAllAsync(CancellationToken ct = default) =>
        await context.ContactMessages.OrderByDescending(m => m.CreatedAt).ToListAsync(ct);

    public async Task<ContactMessage?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await context.ContactMessages.FirstOrDefaultAsync(m => m.Id == id, ct);

    public async Task AddAsync(ContactMessage message, CancellationToken ct = default) =>
        await context.ContactMessages.AddAsync(message, ct);

    public void Update(ContactMessage message) => context.ContactMessages.Update(message);

    public Task<int> SaveChangesAsync(CancellationToken ct = default) =>
        context.SaveChangesAsync(ct);
}
