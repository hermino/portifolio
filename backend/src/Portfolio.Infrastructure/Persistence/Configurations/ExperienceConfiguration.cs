using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence.Configurations;

public sealed class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
{
    private static readonly JsonSerializerOptions JsonOptions = new();
    private static readonly ValueComparer<List<string>> ListComparer = new(
        (a, b) => a != null && b != null && a.SequenceEqual(b),
        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
        c => c.ToList());

    public void Configure(EntityTypeBuilder<Experience> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Company).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Role).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Period).IsRequired().HasMaxLength(50);
        builder.Property(e => e.Description).IsRequired();

        builder.Property(e => e.Technologies)
            .HasConversion(
                v => JsonSerializer.Serialize(v, JsonOptions),
                v => JsonSerializer.Deserialize<List<string>>(v, JsonOptions) ?? new())
            .HasColumnType("TEXT")
            .Metadata.SetValueComparer(ListComparer);

        builder.Property(e => e.Activities)
            .HasConversion(
                v => JsonSerializer.Serialize(v, JsonOptions),
                v => JsonSerializer.Deserialize<List<string>>(v, JsonOptions) ?? new())
            .HasColumnType("TEXT")
            .Metadata.SetValueComparer(ListComparer);

        builder.ToTable("Experiences");
    }
}
