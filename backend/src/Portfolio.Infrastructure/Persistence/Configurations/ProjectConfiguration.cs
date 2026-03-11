using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence.Configurations;

public sealed class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    private static readonly JsonSerializerOptions JsonOptions = new();
    private static readonly ValueComparer<List<string>> ListComparer = new(
        (a, b) => a != null && b != null && a.SequenceEqual(b),
        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
        c => c.ToList());

    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Title).IsRequired().HasMaxLength(300);
        builder.Property(e => e.Client).HasMaxLength(200);
        builder.Property(e => e.Description).IsRequired();
        builder.Property(e => e.GithubUrl).HasMaxLength(500);
        builder.Property(e => e.LiveUrl).HasMaxLength(500);

        builder.Property(e => e.Technologies)
            .HasConversion(
                v => JsonSerializer.Serialize(v, JsonOptions),
                v => JsonSerializer.Deserialize<List<string>>(v, JsonOptions) ?? new())
            .HasColumnType("TEXT")
            .Metadata.SetValueComparer(ListComparer);

        builder.Property(e => e.Categories)
            .HasConversion(
                v => JsonSerializer.Serialize(v, JsonOptions),
                v => JsonSerializer.Deserialize<List<string>>(v, JsonOptions) ?? new())
            .HasColumnType("TEXT")
            .Metadata.SetValueComparer(ListComparer);

        builder.ToTable("Projects");
    }
}
