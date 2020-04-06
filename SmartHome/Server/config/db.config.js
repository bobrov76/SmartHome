module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Vadim762905",
  DB: "smarthome",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
