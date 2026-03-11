using Portfolio.Domain.Common;

namespace Portfolio.Domain.Entities;

public sealed class Project : Entity
{
    private Project() { } // EF Core

    public string Title { get; private set; } = default!;
    public string Client { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public List<string> Technologies { get; private set; } = [];
    public List<string> Categories { get; private set; } = [];
    public string? GithubUrl { get; private set; }
    public string? LiveUrl { get; private set; }
    public bool IsFeatured { get; private set; }
    public int DisplayOrder { get; private set; }

    public static Project Create(
        string title,
        string client,
        string description,
        List<string> technologies,
        List<string> categories,
        string? githubUrl = null,
        string? liveUrl = null,
        bool isFeatured = false,
        int displayOrder = 0)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);

        return new Project
        {
            Title = title,
            Client = client,
            Description = description,
            Technologies = technologies ?? [],
            Categories = categories ?? [],
            GithubUrl = githubUrl,
            LiveUrl = liveUrl,
            IsFeatured = isFeatured,
            DisplayOrder = displayOrder
        };
    }

    public void Update(
        string title,
        string client,
        string description,
        List<string> technologies,
        List<string> categories,
        string? githubUrl,
        string? liveUrl,
        bool isFeatured,
        int displayOrder)
    {
        Title = title;
        Client = client;
        Description = description;
        Technologies = technologies ?? [];
        Categories = categories ?? [];
        GithubUrl = githubUrl;
        LiveUrl = liveUrl;
        IsFeatured = isFeatured;
        DisplayOrder = displayOrder;
    }
}
