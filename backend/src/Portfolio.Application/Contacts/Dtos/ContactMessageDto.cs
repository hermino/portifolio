namespace Portfolio.Application.Contacts.Dtos;

public record ContactMessageDto(
    Guid Id,
    string Name,
    string Email,
    string Message,
    DateTime CreatedAt,
    bool IsRead
);

public record CreateContactMessageDto(
    string Name,
    string Email,
    string Message
);
