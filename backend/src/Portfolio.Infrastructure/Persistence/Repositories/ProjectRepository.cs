using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public sealed class ProjectRepository(AppDbContext context) : IProjectRepository
{
    public async Task<IReadOnlyList<Project>> GetAllAsync(CancellationToken ct = default) =>
        await context.Projects.OrderBy(p => p.DisplayOrder).ToListAsync(ct);

    public async Task<Project?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await context.Projects.FirstOrDefaultAsync(p => p.Id == id, ct);

    public async Task AddAsync(Project project, CancellationToken ct = default) =>
        await context.Projects.AddAsync(project, ct);

    public void Update(Project project) => context.Projects.Update(project);

    public void Delete(Project project) => context.Projects.Remove(project);

    public Task<int> SaveChangesAsync(CancellationToken ct = default) =>
        context.SaveChangesAsync(ct);
}
