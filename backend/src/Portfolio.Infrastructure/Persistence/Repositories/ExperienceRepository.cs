using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public sealed class ExperienceRepository(AppDbContext context) : IExperienceRepository
{
    public async Task<IReadOnlyList<Experience>> GetAllAsync(CancellationToken ct = default) =>
        await context.Experiences.OrderBy(e => e.DisplayOrder).ToListAsync(ct);

    public async Task<Experience?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await context.Experiences.FirstOrDefaultAsync(e => e.Id == id, ct);

    public async Task AddAsync(Experience experience, CancellationToken ct = default) =>
        await context.Experiences.AddAsync(experience, ct);

    public void Update(Experience experience) => context.Experiences.Update(experience);

    public void Delete(Experience experience) => context.Experiences.Remove(experience);

    public Task<int> SaveChangesAsync(CancellationToken ct = default) =>
        context.SaveChangesAsync(ct);
}
