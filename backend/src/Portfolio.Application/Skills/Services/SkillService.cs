using Portfolio.Application.Skills.Dtos;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Repositories;

namespace Portfolio.Application.Skills.Services;

public sealed class SkillService(ISkillRepository repository) : ISkillService
{
    public async Task<IReadOnlyList<SkillDto>> GetAllAsync(CancellationToken ct = default)
    {
        var skills = await repository.GetAllAsync(ct);
        return skills.Select(ToDto).ToList();
    }

    public async Task<IReadOnlyList<SkillGroupDto>> GetGroupedAsync(CancellationToken ct = default)
    {
        var skills = await repository.GetAllAsync(ct);
        return skills
            .GroupBy(s => s.Category)
            .OrderBy(g => g.Key)
            .Select(g => new SkillGroupDto(g.Key, g.OrderBy(s => s.DisplayOrder).Select(ToDto).ToList()))
            .ToList();
    }

    public async Task<SkillDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var skill = await repository.GetByIdAsync(id, ct);
        return skill is null ? null : ToDto(skill);
    }

    public async Task<SkillDto> CreateAsync(CreateSkillDto dto, CancellationToken ct = default)
    {
        var skill = Skill.Create(dto.Name, dto.Category, dto.DisplayOrder);
        await repository.AddAsync(skill, ct);
        await repository.SaveChangesAsync(ct);
        return ToDto(skill);
    }

    public async Task<SkillDto?> UpdateAsync(Guid id, UpdateSkillDto dto, CancellationToken ct = default)
    {
        var skill = await repository.GetByIdAsync(id, ct);
        if (skill is null) return null;

        skill.Update(dto.Name, dto.Category, dto.DisplayOrder);
        repository.Update(skill);
        await repository.SaveChangesAsync(ct);
        return ToDto(skill);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var skill = await repository.GetByIdAsync(id, ct);
        if (skill is null) return false;

        repository.Delete(skill);
        await repository.SaveChangesAsync(ct);
        return true;
    }

    private static SkillDto ToDto(Skill s) => new(s.Id, s.Name, s.Category, s.DisplayOrder);
}
