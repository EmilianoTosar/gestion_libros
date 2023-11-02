require('dotenv').config()

module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: process.env.DB_PASSWORD,
  DB: "libros",
  dialect: "postgres"
}