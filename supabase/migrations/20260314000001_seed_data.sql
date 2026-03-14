-- ── Experiences ──────────────────────────────────────────────────────────────

INSERT INTO experiences (company, role, period, description, technologies, activities, display_order) VALUES
(
  'INDT - Institute for Technological Development',
  'Developer II',
  '02/2022 – Present',
  'I joined the company as a junior frontend developer and quickly established myself as the lead frontend developer for web platforms. When demand arose for a new web application, I took ownership of the entire frontend architecture using React and TypeScript. I designed and implemented responsive, accessible interfaces with modern UI/UX best practices. After 9 months, I received a promotion due to high quality deliveries and exceptional frontend expertise.',
  ARRAY['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'UI/UX Design', 'Responsive Design', 'Accessibility'],
  ARRAY[
    'Lead frontend developer on collaborative project with Motorola.',
    'Built responsive, accessible interfaces using React and TypeScript.',
    'Developed web application UI/UX for natural language processing tools.',
    'Expertise in modern frontend architecture, state management, and UI/UX design.'
  ],
  1
),
(
  'Northern Institute of Technology and Business - ITN',
  'Junior Systems Development Analyst',
  '08/2020 - 02/2022',
  'I worked as frontend developer on 5 projects, all using Angular 8+ with Material Design. I took ownership of the entire frontend architecture and UI/UX implementation. Despite working with legacy codebases and limited documentation, I successfully delivered modern, responsive interfaces with excellent user experience. Daily collaboration with clients helped shape intuitive designs that met business requirements.',
  ARRAY['Angular', 'TypeScript', 'JavaScript', 'Material Design', 'HTML5', 'CSS3', 'Responsive Design', 'UI/UX'],
  ARRAY[
    'Built responsive frontend interfaces for computer vision applications.',
    'Led frontend development on 6 projects using Angular and Material Design.'
  ],
  2
);

-- ── Projects ──────────────────────────────────────────────────────────────────

INSERT INTO projects (title, client, description, technologies, categories, display_order) VALUES
(
  'Automatic identification of fruits on scales',
  'ITN',
  'I developed the frontend interface for a web application that automatically identifies fruit types on supermarket scales. Built an intuitive Angular UI with Material Design, creating responsive components for real-time image display and classification results.',
  ARRAY['Angular', 'Node.js', 'Material Design', 'Spring Boot', 'PostgreSQL', 'Python'],
  ARRAY['ai', 'web'],
  1
),
(
  'Performance Evaluation System',
  'ITN',
  'I built the frontend architecture for an employee performance evaluation system using Angular and Material Design. Created complex form workflows, data visualization dashboards, and responsive layouts to enhance the user experience for HR processes.',
  ARRAY['Angular', 'Node.js', 'Material Design', 'C#', 'ASP.NET', 'SQLServer'],
  ARRAY['web', 'management'],
  2
),
(
  'Service Order Management System',
  'ITN',
  'I developed the Angular frontend for a service order management system in a bicycle manufacturing environment. Implemented dynamic forms, real-time status tracking interfaces, and optimized component architecture for production and maintenance workflows.',
  ARRAY['Angular', 'Node.js', 'Material Design', 'C#', 'ASP.NET', 'SQLServer'],
  ARRAY['web', 'management'],
  3
),
(
  'System Based on Responsible Business Alliance (RBA) Patterns',
  'ITN',
  'The Responsible Business Alliance (RBA) is a code of conduct that companies can adopt and require from their suppliers. I built the frontend interface using Angular to create an intuitive platform for evaluating and certifying supplier compliance. Designed complex multi-step forms and interactive dashboards for assessment workflows.',
  ARRAY['Angular', 'Node.js', 'Material Design', 'C#', 'ASP.NET', 'SQLServer'],
  ARRAY['web', 'management'],
  4
),
(
  'Automatic license plate identification',
  'ITN',
  'I developed the Angular frontend for an automated license plate recognition system. Created real-time monitoring interfaces, implemented image display components with Material Design, and built responsive dashboards for security and access control management.',
  ARRAY['Angular', 'Node.js', 'Material Design', 'Spring Boot', 'PostgreSQL', 'Python'],
  ARRAY['ai', 'web'],
  5
);

-- ── Skills ────────────────────────────────────────────────────────────────────

INSERT INTO skills (name, category, display_order) VALUES
('Collaboration & teamwork',               'Soft skills', 1),
('Research & analysis',                    'Soft skills', 2),
('Critical Thinking & Problem Solving',    'Soft skills', 3),
('Adaptability',                           'Soft skills', 4),
('Time Management & Organization',         'Soft skills', 5),
('Proactivity',                            'Soft skills', 6),
('Continuous Learning',                    'Soft skills', 7),
('Frontend Development',                   'Hard skills', 1),
('React',                                  'Hard skills', 2),
('Angular',                                'Hard skills', 3),
('TypeScript',                             'Hard skills', 4),
('JavaScript (ES6+)',                      'Hard skills', 5),
('HTML5',                                  'Hard skills', 6),
('CSS3/SCSS',                              'Hard skills', 7),
('Responsive Design',                      'Hard skills', 8),
('Material Design',                        'Hard skills', 9),
('UI/UX Design',                           'Hard skills', 10),
('State Management (Redux, Context API)',   'Hard skills', 11),
('Accessibility (WCAG)',                    'Hard skills', 12),
('Performance Optimization',               'Hard skills', 13),
('Git',                                    'Hard skills', 14),
('RESTful APIs',                           'Hard skills', 15),
('Webpack/Vite',                           'Hard skills', 16);
