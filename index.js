import express from "express";
import path from "path";
import { home } from "./controller/Home.js";
import { pencarianGraf } from "./controller/PencarianGraf.js";
import { pencarianGrafikBar } from "./controller/PencarianGrafikBar.js";
import { pencarianNama } from "./controller/PencarianNama.js";
const app = express();
const port = 8080;

app.use(express.static(path.resolve("public")));
app.set('view engine','ejs');


app.use('/',home);

app.use('/pencarian/graf',pencarianGraf);

app.use('/pencarian/grafik',pencarianGrafikBar);

app.use('/pencarian/nama',pencarianNama);

app.listen(port,()=>{
    console.log('listening');
});