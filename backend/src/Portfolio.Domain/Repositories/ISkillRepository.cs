using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Repositories;

public interface ISkillRepository
{
    Task<IReadOnlyList<Skill>> GetAllAsync(CancellationToken ct = default);
    Task<IReadOnlyList<Skill>> GetByCategoryAsync(string category, CancellationToken ct = default);
    Task<Skill?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task AddAsync(Skill skill, CancellationToken ct = default);
    void Update(Skill skill);
    void Delete(Skill skill);
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
