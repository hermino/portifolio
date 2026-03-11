using Portfolio.Application.Experiences.Dtos;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Repositories;

namespace Portfolio.Application.Experiences.Services;

public sealed class ExperienceService(IExperienceRepository repository) : IExperienceService
{
    public async Task<IReadOnlyList<ExperienceDto>> GetAllAsync(CancellationToken ct = default)
    {
        var experiences = await repository.GetAllAsync(ct);
        return experiences.Select(ToDto).ToList();
    }

    public async Task<ExperienceDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var experience = await repository.GetByIdAsync(id, ct);
        return experience is null ? null : ToDto(experience);
    }

    public async Task<ExperienceDto> CreateAsync(CreateExperienceDto dto, CancellationToken ct = default)
    {
        var experience = Experience.Create(
            dto.Company,
            dto.Role,
            dto.Period,
            dto.Description,
            dto.Technologies,
            dto.Activities,
            dto.DisplayOrder);

        await repository.AddAsync(experience, ct);
        await repository.SaveChangesAsync(ct);
        return ToDto(experience);
    }

    public async Task<ExperienceDto?> UpdateAsync(Guid id, UpdateExperienceDto dto, CancellationToken ct = default)
    {
        var experience = await repository.GetByIdAsync(id, ct);
        if (experience is null) return null;

        experience.Update(
            dto.Company,
            dto.Role,
            dto.Period,
            dto.Description,
            dto.Technologies,
            dto.Activities,
            dto.DisplayOrder);

        repository.Update(experience);
        await repository.SaveChangesAsync(ct);
        return ToDto(experience);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var experience = await repository.GetByIdAsync(id, ct);
        if (experience is null) return false;

        repository.Delete(experience);
        await repository.SaveChangesAsync(ct);
        return true;
    }

    private static ExperienceDto ToDto(Experience e) => new(
        e.Id, e.Company, e.Role, e.Period, e.Description,
        e.Technologies, e.Activities, e.DisplayOrder);
}
