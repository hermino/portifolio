using Portfolio.Domain.Entities;
using Portfolio.Infrastructure.Persistence;

namespace Portfolio.Infrastructure.Persistence.Seeders;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await SeedExperiencesAsync(context);
        await SeedProjectsAsync(context);
        await SeedSkillsAsync(context);
        await context.SaveChangesAsync();
    }

    private static async Task SeedExperiencesAsync(AppDbContext context)
    {
        if (context.Experiences.Any()) return;

        var experiences = new[]
        {
            Experience.Create(
                company: "INDT - Institute for Technological Development",
                role: "Developer II",
                period: "02/2022 – Present",
                description: "I joined the company as a junior frontend developer and quickly established myself as the lead frontend developer for web platforms. When demand arose for a new web application, I took ownership of the entire frontend architecture using React and TypeScript. I designed and implemented responsive, accessible interfaces with modern UI/UX best practices. After 9 months, I received a promotion due to high quality deliveries and exceptional frontend expertise.",
                technologies: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "UI/UX Design", "Responsive Design", "Accessibility"],
                activities: [
                    "Lead frontend developer on collaborative project with Motorola.",
                    "Built responsive, accessible interfaces using React and TypeScript.",
                    "Developed web application UI/UX for natural language processing tools.",
                    "Expertise in modern frontend architecture, state management, and UI/UX design."
                ],
                displayOrder: 1),

            Experience.Create(
                company: "Northern Institute of Technology and Business - ITN",
                role: "Junior Systems Development Analyst",
                period: "08/2020 - 02/2022",
                description: "I worked as frontend developer on 5 projects, all using Angular 8+ with Material Design. I took ownership of the entire frontend architecture and UI/UX implementation. Despite working with legacy codebases and limited documentation, I successfully delivered modern, responsive interfaces with excellent user experience. Daily collaboration with clients helped shape intuitive designs that met business requirements.",
                technologies: ["Angular", "TypeScript", "JavaScript", "Material Design", "HTML5", "CSS3", "Responsive Design", "UI/UX"],
                activities: [
                    "Built responsive frontend interfaces for computer vision applications.",
                    "Led frontend development on 6 projects using Angular and Material Design."
                ],
                displayOrder: 2)
        };

        await context.Experiences.AddRangeAsync(experiences);
    }

    private static async Task SeedProjectsAsync(AppDbContext context)
    {
        if (context.Projects.Any()) return;

        var projects = new[]
        {
            Project.Create(
                title: "Automatic identification of fruits on scales",
                client: "ITN",
                description: "I developed the frontend interface for a web application that automatically identifies fruit types on supermarket scales. Built an intuitive Angular UI with Material Design, creating responsive components for real-time image display and classification results.",
                technologies: ["Angular", "Node.js", "Material Design", "Spring Boot", "PostgreSQL", "Python"],
                categories: ["ai", "web"],
                displayOrder: 1),

            Project.Create(
                title: "Performance Evaluation System",
                client: "ITN",
                description: "I built the frontend architecture for an employee performance evaluation system using Angular and Material Design. Created complex form workflows, data visualization dashboards, and responsive layouts to enhance the user experience for HR processes.",
                technologies: ["Angular", "Node.js", "Material Design", "C#", "ASP.NET", "SQLServer"],
                categories: ["web", "management"],
                displayOrder: 2),

            Project.Create(
                title: "Service Order Management System",
                client: "ITN",
                description: "I developed the Angular frontend for a service order management system in a bicycle manufacturing environment. Implemented dynamic forms, real-time status tracking interfaces, and optimized component architecture for production and maintenance workflows.",
                technologies: ["Angular", "Node.js", "Material Design", "C#", "ASP.NET", "SQLServer"],
                categories: ["web", "management"],
                displayOrder: 3),

            Project.Create(
                title: "System Based on Responsible Business Alliance (RBA) Patterns",
                client: "ITN",
                description: "The Responsible Business Alliance (RBA) is a code of conduct that companies can adopt and require from their suppliers. I built the frontend interface using Angular to create an intuitive platform for evaluating and certifying supplier compliance. Designed complex multi-step forms and interactive dashboards for assessment workflows.",
                technologies: ["Angular", "Node.js", "Material Design", "C#", "ASP.NET", "SQLServer"],
                categories: ["web", "management"],
                displayOrder: 4),

            Project.Create(
                title: "Automatic license plate identification",
                client: "ITN",
                description: "I developed the Angular frontend for an automated license plate recognition system. Created real-time monitoring interfaces, implemented image display components with Material Design, and built responsive dashboards for security and access control management.",
                technologies: ["Angular", "Node.js", "Material Design", "Spring Boot", "PostgreSQL", "Python"],
                categories: ["ai", "web"],
                displayOrder: 5)
        };

        await context.Projects.AddRangeAsync(projects);
    }

    private static async Task SeedSkillsAsync(AppDbContext context)
    {
        if (context.Skills.Any()) return;

        var softSkills = new[]
        {
            "Collaboration & teamwork", "Research & analysis",
            "Critical Thinking & Problem Solving", "Adaptability",
            "Time Management & Organization", "Proactivity", "Continuous Learning"
        };

        var hardSkills = new[]
        {
            "Frontend Development", "React", "Angular", "TypeScript",
            "JavaScript (ES6+)", "HTML5", "CSS3/SCSS", "Responsive Design",
            "Material Design", "UI/UX Design", "State Management (Redux, Context API)",
            "Accessibility (WCAG)", "Performance Optimization", "Git",
            "RESTful APIs", "Webpack/Vite"
        };

        var skills = softSkills
            .Select((name, i) => Skill.Create(name, "Soft skills", i + 1))
            .Concat(hardSkills.Select((name, i) => Skill.Create(name, "Hard skills", i + 1)));

        await context.Skills.AddRangeAsync(skills);
    }
}
