import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import articles from "./routes/articles";
import messages from "./routes/messages";
import user from "./routes/user";
import "./config/dbConnection";
import swaggerDocument from './docs/swagger.json';

dotenv.config();

const app = express();

app.use(bodyParser.json());


app.use('/articles',articles);
app.use('/messages',messages);
app.use('/user',user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("*", (req, res) => {
    res.status(404).json({ message: "Route Not Found" });
  });


const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Server running on port ${process.env.PORT}`));

export default app;
