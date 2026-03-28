const bcrypt = require('bcryptjs');
const { db, User, Project, Task } = require('./setup');

async function seedDatabase() {
    try {
        console.log('Resetting database...');

        // Drop and recreate tables
        await db.sync({ force: true });

        console.log('Database reset successfully.');

        // -----------------------------
        // Create sample users with roles
        // -----------------------------

        const password = await bcrypt.hash('password123', 10);

        const john = await User.create({
            name: 'John Employee',
            email: 'john@company.com',
            password: password,
            role: 'employee'
        });

        const sarah = await User.create({
            name: 'Sarah Manager',
            email: 'sarah@company.com',
            password: password,
            role: 'manager'
        });

        const mike = await User.create({
            name: 'Mike Admin',
            email: 'mike@company.com',
            password: password,
            role: 'admin'
        });

        console.log('Sample users created:');
        console.log('- john@company.com (employee)');
        console.log('- sarah@company.com (manager)');
        console.log('- mike@company.com (admin)');
        console.log('All passwords: password123');

        // -----------------------------
        // Optional: Create sample projects
        // -----------------------------
        const project1 = await Project.create({
            name: 'Website Redesign',
            description: 'Update UI and UX for the company website.',
            status: 'active',
            managerId: sarah.id
        });

        const project2 = await Project.create({
            name: 'Internal Tool Development',
            description: 'Build a new internal dashboard.',
            status: 'active',
            managerId: sarah.id
        });

        // -----------------------------
        // Optional: Create sample tasks
        // -----------------------------
        await Task.create({
            title: 'Create wireframes',
            description: 'Initial design wireframes for homepage.',
            projectId: project1.id,
            assignedUserId: john.id,
            priority: 'high',
            status: 'pending'
        });

        await Task.create({
            title: 'Set up backend API',
            description: 'Build authentication and project endpoints.',
            projectId: project2.id,
            assignedUserId: john.id,
            priority: 'medium',
            status: 'pending'
        });

        console.log('Sample projects and tasks created.');

        console.log('Database seeded successfully!');
        process.exit();

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
