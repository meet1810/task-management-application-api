const projects = require('../models/project');
const users = require('../models/user');
const tasks = require('../models/task');

// Project add
const add = (req, res) => {
    try {
        const { name, description, userId } = req.body;

        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).send({
                status: false,
                message: 'User not found',
            });
        }

        const id = projects.length + 1;
        const newProject = { id, name, description, userId };
        projects.push(newProject);

        return res.status(201).send({
            status: true,
            message: 'Project created successfully',
            data: newProject
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Error! Project not created',
        });
    }
};
// Project list
const list = (req, res) => {
    try {
        let { page = 1, limit = 10, search = '' } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        // Filter projects by search query
        let filteredProjects = projects.filter(project =>
            project.name.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase())
        );

        // Paginate projects
        const totalPages = Math.ceil(filteredProjects.length / limit);
        const paginatedProjects = filteredProjects.slice((page - 1) * limit, page * limit);

        if (!paginatedProjects.length) {
            return res.status(202).send({
                status: true,
                message: 'No Project Data Found',
            });
        }

        return res.status(200).send({
            status: true,
            message: 'Projects List Found Successfully',
            data: {
                page,
                pages: totalPages,
                total: filteredProjects.length,
                projects: paginatedProjects
            }
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Projects List Not Found',
        });
    }
};
// Project view by id
const view = (req, res) => {
    try {
        // Find the project by its ID
        const project = projects.find(p => p.id == req.params.id);
        if (!project) {
            return res.status(404).send({
                status: false,
                message: 'Project not found',
            });
        }

        // Find all tasks related to this project
        const projectTasks = tasks.filter(task => task.projectId == project.id);

        // Find the user related to this project
        const user = users.find(u => u.id == project.userId);

        return res.status(200).send({
            status: true,
            message: 'Project found successfully',
            data: {
                ...project,
                user: user || null,  // Include user details
                tasks: projectTasks  // Include tasks related to the project
            }
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Error! Project not found',
        });
    }
};
// Project update
const update = (req, res) => {
    try {
        const project = projects.find(p => p.id == req.params.id);
        if (!project) {
            return res.status(404).send({
                status: false,
                message: 'Project not found',
            });
        }
        const { name, description, userId } = req.body;

        if (userId) {
            const user = users.find(user => user.id === userId);
            if (!user) {
                return res.status(404).send({
                    status: false,
                    message: 'User not found',
                });
            }
            project.userId = userId;
        }

        if (name) project.name = name;
        if (description) project.description = description;

        return res.status(201).send({
            status: true,
            message: 'Project Updated Successfully',
            data: project
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Project Not Updated',
        });
    }
};
// Project delete
const remove = (req, res) => {
    try {
        const projectIndex = projects.findIndex(p => p.id == req.params.id);
        if (projectIndex === -1) {
            return res.status(404).send({
                status: false,
                message: 'Project not found',
            });
        }

        const projectId = projects[projectIndex].id;
        const filteredTasks = tasks.filter(task => task.projectId !== projectId);
        tasks.length = 0;
        tasks.push(...filteredTasks);

        projects.splice(projectIndex, 1);

        return res.status(201).send({
            status: true,
            message: 'Project and associated tasks deleted successfully',
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Project Not Deleted',
        });
    }
};
// Find all projects of a single user
const getUserProjects = (req, res) => {
    try {
        const userId = req.params.userId;

        const userProjects = projects.filter(project => project.userId == userId);

        if (userProjects.length === 0) {
            return res.status(202).send({
                status: false,
                message: 'No projects found for this user',
            });
        }

        return res.status(200).send({
            status: true,
            message: 'Projects found successfully',
            data: userProjects
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: 'Error retrieving user projects',
        });
    }
};


module.exports.projectController = {
    remove,
    update,
    add,
    list,
    view,
    getUserProjects
};
