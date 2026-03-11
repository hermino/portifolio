namespace Portfolio.Application.Projects.Dtos;

public record ProjectDto(
    Guid Id,
    string Title,
    string Client,
    string Description,
    List<string> Technologies,
    List<string> Categories,
    string? GithubUrl,
    string? LiveUrl,
    bool IsFeatured,
    int DisplayOrder
);

public record CreateProjectDto(
    string Title,
    string Client,
    string Description,
    List<string> Technologies,
    List<string> Categories,
    string? GithubUrl = null,
    string? LiveUrl = null,
    bool IsFeatured = false,
    int DisplayOrder = 0
);

public record UpdateProjectDto(
    string Title,
    string Client,
    string Description,
    List<string> Technologies,
    List<string> Categories,
    string? GithubUrl,
    string? LiveUrl,
    bool IsFeatured,
    int DisplayOrder
);
