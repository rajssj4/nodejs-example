module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
      task: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
    });
  
    return Todo;
  };