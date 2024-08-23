const users = require('../models/user');

const add = (req, res) => {
    try {
        const { name, email } = req.body;
        const user = users.find(user => user.email === email);
        if (user) {
            return res.status(409).send({
                status: false,
                message: 'Email already exist',
            })
        }
        const id = users.length + 1;
        const newUser = { id, name, email };
        users.push(newUser);
        return res.status(201).send({
            status: true,
            message: 'User created successfully',
            data: newUser
        })
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Error! User not created',
        })
    }
};

const list = (req, res) => {
    try {
        let { page = 1, limit = 10, search = '' } = req.query;
        console.log("🚀 ~ list ~ search:", search)
        page = parseInt(page);
        limit = parseInt(limit);

        let filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );

        const totalPages = Math.ceil(filteredUsers.length / limit);

        const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

        if (!paginatedUsers.length) {
            return res.status(202).send({
                status: true,
                message: 'No User Data Found',
            })
        }

        return res.status(200).send({
            status: true,
            message: 'Users List Found Successfully',
            data: {
                page,
                pages: totalPages,
                total: filteredUsers.length,
                users: paginatedUsers
            }
        })

    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Users List Not Found',
        })
    }
};

const view = (req, res) => {
    try {
        const user = users.find(u => u.id == req.params.id);
        if (!user) {
            return res.status(404).send({
                status: false,
                message: 'User not found',
            })
        }
        return res.status(200).send({
            status: true,
            message: 'User found successfully',
            data: user
        })
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Error ! User not found',
        })
    }
};

const update = (req, res) => {
    try {
        const user = users.find(u => u.id == req.params.id);
        if (!user) {
            return res.status(404).send({
                status: false,
                message: 'User not found',
            })
        }
        const { name, email } = req.body;

        const findEmail = users.find(user => user.email === email && user.id !== parseInt(req.params.id));

        if (findEmail) {
            return res.status(409).send({
                status: false,
                message: 'Email already exist',
            })
        }

        if (name) user.name = name;
        if (email) user.email = email;

        return res.status(201).send({
            status: true,
            message: 'User Updated Successfully',
        })

    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'User Not Updated',
        })
    }

};

const remove = (req, res) => {
    try {
        const userIndex = users.findIndex(u => u.id == req.params.id);
        if (userIndex === -1) {
            return res.status(404).send({
                status: false,
                message: 'User not found',
            })
        }

        users.splice(userIndex, 1);
        return res.status(201).send({
            status: true,
            message: 'User Deleted Successfully',
        })
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'User Not Deleted',
        })
    }
};

module.exports.userController = {
    remove,
    update,
    add,
    list,
    view
}