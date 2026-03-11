using Portfolio.Domain.Common;

namespace Portfolio.Domain.Entities;

public sealed class Experience : Entity
{
    private Experience() { } // EF Core

    public string Company { get; private set; } = default!;
    public string Role { get; private set; } = default!;
    public string Period { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public List<string> Technologies { get; private set; } = [];
    public List<string> Activities { get; private set; } = [];
    public int DisplayOrder { get; private set; }

    public static Experience Create(
        string company,
        string role,
        string period,
        string description,
        List<string> technologies,
        List<string> activities,
        int displayOrder = 0)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(company);
        ArgumentException.ThrowIfNullOrWhiteSpace(role);
        ArgumentException.ThrowIfNullOrWhiteSpace(period);

        return new Experience
        {
            Company = company,
            Role = role,
            Period = period,
            Description = description,
            Technologies = technologies ?? [],
            Activities = activities ?? [],
            DisplayOrder = displayOrder
        };
    }

    public void Update(
        string company,
        string role,
        string period,
        string description,
        List<string> technologies,
        List<string> activities,
        int displayOrder)
    {
        Company = company;
        Role = role;
        Period = period;
        Description = description;
        Technologies = technologies ?? [];
        Activities = activities ?? [];
        DisplayOrder = displayOrder;
    }
}
