using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public sealed class SkillRepository(AppDbContext context) : ISkillRepository
{
    public async Task<IReadOnlyList<Skill>> GetAllAsync(CancellationToken ct = default) =>
        await context.Skills.OrderBy(s => s.Category).ThenBy(s => s.DisplayOrder).ToListAsync(ct);

    public async Task<IReadOnlyList<Skill>> GetByCategoryAsync(string category, CancellationToken ct = default) =>
        await context.Skills
            .Where(s => s.Category == category)
            .OrderBy(s => s.DisplayOrder)
            .ToListAsync(ct);

    public async Task<Skill?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await context.Skills.FirstOrDefaultAsync(s => s.Id == id, ct);

    public async Task AddAsync(Skill skill, CancellationToken ct = default) =>
        await context.Skills.AddAsync(skill, ct);

    public void Update(Skill skill) => context.Skills.Update(skill);

    public void Delete(Skill skill) => context.Skills.Remove(skill);

    public Task<int> SaveChangesAsync(CancellationToken ct = default) =>
        context.SaveChangesAsync(ct);
}
