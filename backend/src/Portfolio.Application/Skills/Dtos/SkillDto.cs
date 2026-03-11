namespace Portfolio.Application.Skills.Dtos;

public record SkillDto(Guid Id, string Name, string Category, int DisplayOrder);

public record SkillGroupDto(string Category, List<SkillDto> Skills);

public record CreateSkillDto(string Name, string Category, int DisplayOrder = 0);

public record UpdateSkillDto(string Name, string Category, int DisplayOrder);
