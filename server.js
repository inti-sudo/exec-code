require("dotenv").config({ path: "./.env" });
require("@aikidosec/firewall");

const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000;
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
  
// Ensure the environment variables are defined
if (!process.env.API_USER || !process.env.API_PASS) {
  console.error('Error: ADMIN_LOGIN or ADMIN_PASSWORD environment variables are not set.');
  process.exit(1); // Exit the process with an error
}

app.use(express.json())

const options = require('./swagger');

// API Enpoints
app.use("/", require("./routes/index"));

//Addig API Docs
const specs = swaggerJsdoc(options);


app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

// Handles when a user request a non existent page the server responded with stack traces like filesystem paths
app.use((req, res, next) => {
    res.status(404).json({PathException: "Endpoint Not Found"});
});

app.listen(PORT, () => {
  console.log(`API running on port http://localhost:${PORT}`)
})