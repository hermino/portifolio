using Portfolio.Domain.Common;

namespace Portfolio.Domain.Entities;

public sealed class ContactMessage : Entity
{
    private ContactMessage() { } // EF Core

    public string Name { get; private set; } = default!;
    public string Email { get; private set; } = default!;
    public string Message { get; private set; } = default!;
    public DateTime CreatedAt { get; private set; }
    public bool IsRead { get; private set; }

    public static ContactMessage Create(string name, string email, string message)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(email);
        ArgumentException.ThrowIfNullOrWhiteSpace(message);

        return new ContactMessage
        {
            Name = name,
            Email = email,
            Message = message,
            CreatedAt = DateTime.UtcNow,
            IsRead = false
        };
    }

    public void MarkAsRead() => IsRead = true;
}
