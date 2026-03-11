using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Repositories;

public interface IExperienceRepository
{
    Task<IReadOnlyList<Experience>> GetAllAsync(CancellationToken ct = default);
    Task<Experience?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(Experience experience, CancellationToken ct = default);
    void Update(Experience experience);
    void Delete(Experience experience);
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
