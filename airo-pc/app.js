import express from "express";
import bodyParser from "body-parser";

import cpuRoutes from "./routes/cpu.js";
import gpuRoutes from "./routes/gpu.js";
import ramRoutes from "./routes/ram.js";
import moboRoutes from "./routes/motherboard.js";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Bukan Jagat Review ya ges"));

app.use("/cpu", cpuRoutes);
app.use("/gpu", gpuRoutes);
app.use("/ram", ramRoutes);
app.use("/motherboard", moboRoutes);


app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));