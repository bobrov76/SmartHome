module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    login: { type: Sequelize.STRING(50), allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false},
    email: { type: Sequelize.STRING(100), allowNull: false },
    //token: { type: Sequelize.STRING, allowNull: true },
    isAdmin: { type: Sequelize.BOOLEAN, allowNull: false }
  });

  return User;
};
