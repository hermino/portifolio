namespace Portfolio.Application.Experiences.Dtos;

public record ExperienceDto(
    Guid Id,
    string Company,
    string Role,
    string Period,
    string Description,
    List<string> Technologies,
    List<string> Activities,
    int DisplayOrder
);

public record CreateExperienceDto(
    string Company,
    string Role,
    string Period,
    string Description,
    List<string> Technologies,
    List<string> Activities,
    int DisplayOrder = 0
);

public record UpdateExperienceDto(
    string Company,
    string Role,
    string Period,
    string Description,
    List<string> Technologies,
    List<string> Activities,
    int DisplayOrder
);
