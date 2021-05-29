const db = require("../models");
const Todo = db.todo;

exports.create = (req, res) => {

    if (!req.body.task) {
        res.status(400).send({
            message: "Task field is required"
        });
        return;
    }

    const todo = {
        task: req.body.task,
        date: req.body.date,
    };

    Todo.create(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });

};

exports.findAll = (req, res) => {

    Todo.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Todo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.update = (req, res) => {
    const id = req.params.id;
    Todo.findByPk(id)
        .then(data => {
            Todo.update(req.body, {
                returning: true, // sequelize update method returns only number of affected rows, if we set 'returning: true' we will get an array with number of affected row and updated object
                where: { id: id }
            })
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.findByPk(id)
        .then(data => {
            Todo.destroy({
                returning: true,
                where: { id: id }
            })
                .then(data => {
                    res.send({ message: "deleted successfully!" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteAll = (req, res) => {

    Todo.destroy({
        where: {},
        truncate: false
    })
        .then(data => {
            res.send({ message: "All todos deleted successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
