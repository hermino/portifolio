using Portfolio.Domain.Common;

namespace Portfolio.Domain.Entities;

public sealed class Skill : Entity
{
    private Skill() { } // EF Core

    public string Name { get; private set; } = default!;
    public string Category { get; private set; } = default!;
    public int DisplayOrder { get; private set; }

    public static Skill Create(string name, string category, int displayOrder = 0)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(category);

        return new Skill
        {
            Name = name,
            Category = category,
            DisplayOrder = displayOrder
        };
    }

    public void Update(string name, string category, int displayOrder)
    {
        Name = name;
        Category = category;
        DisplayOrder = displayOrder;
    }
}
