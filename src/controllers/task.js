const tasks = require('../models/task');
const projects = require('../models/project');

// Task add
const add = (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;

        // Check if the project exists
        const project = projects.find(project => project.id === projectId);
        if (!project) {
            return res.status(404).send({
                status: false,
                message: 'Project not found',
            });
        }

        const id = tasks.length + 1;
        const createdAt = new Date().toISOString();
        const newTask = { id, title, description, status, projectId, createdAt };
        tasks.push(newTask);

        return res.status(201).send({
            status: true,
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Error! Task not created',
        });
    }
};
// Task list
const list = (req, res) => {
    try {
        let { page = 1, limit = 10, search = '' } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        // Filter tasks by search query
        let filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase())
        );

        // Paginate tasks
        const totalPages = Math.ceil(filteredTasks.length / limit);
        const paginatedTasks = filteredTasks.slice((page - 1) * limit, page * limit);

        if (!paginatedTasks.length) {
            return res.status(202).send({
                status: true,
                message: 'No Task Data Found',
            });
        }

        return res.status(200).send({
            status: true,
            message: 'Tasks List Found Successfully',
            data: {
                page,
                pages: totalPages,
                total: filteredTasks.length,
                tasks: paginatedTasks
            }
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Tasks List Not Found',
        });
    }
};
// Task view by id
const view = (req, res) => {
    try {
        const task = tasks.find(t => t.id == req.params.id);
        if (!task) {
            return res.status(404).send({
                status: false,
                message: 'Task not found',
            });
        }
        return res.status(200).send({
            status: true,
            message: 'Task found successfully',
            data: task
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Error! Task not found',
        });
    }
};
// Task update
const update = (req, res) => {
    try {
        const task = tasks.find(t => t.id == req.params.id);
        if (!task) {
            return res.status(404).send({
                status: false,
                message: 'Task not found',
            });
        }
        const { title, description, status, projectId } = req.body;

        if (projectId) {
            const project = projects.find(project => project.id === projectId);
            if (!project) {
                return res.status(404).send({
                    status: false,
                    message: 'Project not found',
                });
            }
            task.projectId = projectId;
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;

        return res.status(201).send({
            status: true,
            message: 'Task Updated Successfully',
            data: task
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Task Not Updated',
        });
    }
};
// Task delete
const remove = (req, res) => {
    try {
        const userIndex = users.findIndex(u => u.id == req.params.id);
        if (userIndex === -1) {
            return res.status(404).send({
                status: false,
                message: 'User not found',
            });
        }

        const userId = users[userIndex].id;

        const userProjects = projects.filter(project => project.userId === userId);
        const userProjectIds = userProjects.map(project => project.id);
        const filteredTasks = tasks.filter(task => !userProjectIds.includes(task.projectId));
        tasks.length = 0;
        tasks.push(...filteredTasks);

        const filteredProjects = projects.filter(project => project.userId !== userId);
        projects.length = 0;
        projects.push(...filteredProjects);

        users.splice(userIndex, 1);

        return res.status(201).send({
            status: true,
            message: 'User, associated projects, and tasks deleted successfully',
        });
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'User Not Deleted',
        });
    }
};
// Find all task by projectId
const getProjectTasks = (req, res) => {
    try {
        const projectId = req.params.projectId;

        // Find the project by its ID
        const project = projects.find(p => p.id == projectId);
        if (!project) {
            return res.status(404).send({
                status: false,
                message: 'Project not found',
            });
        }

        // Find all tasks related to this project
        const projectTasks = tasks.filter(task => task.projectId == projectId);

        if (projectTasks.length === 0) {
            return res.status(404).send({
                status: false,
                message: 'No tasks found for this project',
            });
        }

        return res.status(200).send({
            status: true,
            message: 'Tasks found successfully',
            data: projectTasks
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: 'Error retrieving project tasks',
        });
    }
};


module.exports.taskController = {
    remove,
    update,
    add,
    list,
    view,
    getProjectTasks
};
