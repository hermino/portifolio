using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Repositories;

public interface IProjectRepository
{
    Task<IReadOnlyList<Project>> GetAllAsync(CancellationToken ct = default);
    Task<Project?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(Project project, CancellationToken ct = default);
    void Update(Project project);
    void Delete(Project project);
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
