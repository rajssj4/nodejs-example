module.exports = app => {
    const todo = require("../controllers/todo.controller.js");

    var router = require("express").Router();

    router.post("/create", todo.create);
    router.get("/get-all", todo.findAll);
    router.get("/:id", todo.findOne);
    router.put("/update/:id", todo.update);
    router.delete("/delete/:id", todo.delete);
    router.delete("/delete-all", todo.deleteAll);
    app.use('/api/todo', router);
};