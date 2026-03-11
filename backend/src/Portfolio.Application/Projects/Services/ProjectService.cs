using Portfolio.Application.Projects.Dtos;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Repositories;

namespace Portfolio.Application.Projects.Services;

public sealed class ProjectService(IProjectRepository repository) : IProjectService
{
    public async Task<IReadOnlyList<ProjectDto>> GetAllAsync(CancellationToken ct = default)
    {
        var projects = await repository.GetAllAsync(ct);
        return projects.Select(ToDto).ToList();
    }

    public async Task<ProjectDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var project = await repository.GetByIdAsync(id, ct);
        return project is null ? null : ToDto(project);
    }

    public async Task<ProjectDto> CreateAsync(CreateProjectDto dto, CancellationToken ct = default)
    {
        var project = Project.Create(
            dto.Title, dto.Client, dto.Description,
            dto.Technologies, dto.Categories,
            dto.GithubUrl, dto.LiveUrl, dto.IsFeatured, dto.DisplayOrder);

        await repository.AddAsync(project, ct);
        await repository.SaveChangesAsync(ct);
        return ToDto(project);
    }

    public async Task<ProjectDto?> UpdateAsync(Guid id, UpdateProjectDto dto, CancellationToken ct = default)
    {
        var project = await repository.GetByIdAsync(id, ct);
        if (project is null) return null;

        project.Update(
            dto.Title, dto.Client, dto.Description,
            dto.Technologies, dto.Categories,
            dto.GithubUrl, dto.LiveUrl, dto.IsFeatured, dto.DisplayOrder);

        repository.Update(project);
        await repository.SaveChangesAsync(ct);
        return ToDto(project);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var project = await repository.GetByIdAsync(id, ct);
        if (project is null) return false;

        repository.Delete(project);
        await repository.SaveChangesAsync(ct);
        return true;
    }

    private static ProjectDto ToDto(Project p) => new(
        p.Id, p.Title, p.Client, p.Description,
        p.Technologies, p.Categories,
        p.GithubUrl, p.LiveUrl, p.IsFeatured, p.DisplayOrder);
}
