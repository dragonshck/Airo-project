import express from "express";
import bodyParser from "body-parser";

import cpuRoutes from "./routes/cpu.js";
import articleRoutes from "./routes/article.js";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Bukan Jagat Review ya ges"));

app.use("/pc", cpuRoutes);
app.use("/article", articleRoutes);


app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));