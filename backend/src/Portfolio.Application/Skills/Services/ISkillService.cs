using Portfolio.Application.Skills.Dtos;

namespace Portfolio.Application.Skills.Services;

public interface ISkillService
{
    Task<IReadOnlyList<SkillDto>> GetAllAsync(CancellationToken ct = default);
    Task<IReadOnlyList<SkillGroupDto>> GetGroupedAsync(CancellationToken ct = default);
    Task<SkillDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<SkillDto> CreateAsync(CreateSkillDto dto, CancellationToken ct = default);
    Task<SkillDto?> UpdateAsync(Guid id, UpdateSkillDto dto, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}
