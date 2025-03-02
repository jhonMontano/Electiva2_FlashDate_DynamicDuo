const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const userRoutes = require("./src/routes/users");

const authRoutes = require('./src/routes/auth');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de FLASH DATE",
      version: "1.0.0",
      description: "Documentación de la API de Flash date con Swagger",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.get("/Helo", (req, res) => {
  res.send("Hello");
});

app.use("/api", userRoutes);

app.use('/api', authRoutes);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log("Server active on port: " + PORT));
} catch (e) {
  Console.log(e);
}
