using Portfolio.Application.Experiences.Dtos;

namespace Portfolio.Application.Experiences.Services;

public interface IExperienceService
{
    Task<IReadOnlyList<ExperienceDto>> GetAllAsync(CancellationToken ct = default);
    Task<ExperienceDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<ExperienceDto> CreateAsync(CreateExperienceDto dto, CancellationToken ct = default);
    Task<ExperienceDto?> UpdateAsync(Guid id, UpdateExperienceDto dto, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}
