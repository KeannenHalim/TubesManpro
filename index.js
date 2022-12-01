import express from "express";
import path from "path";
import mysql from 'mysql';
import { home } from "./controller/Home.js";
import { pencarianGraf } from "./controller/PencarianGraf.js";
import { pencarianGrafikBar } from "./controller/PencarianGrafikBar.js";
import { pencarianNama } from "./controller/PencarianNama.js";

const app = express();
const port = 8080;

app.use(express.static(path.resolve("public")));
app.set("view engine", "ejs");

const pool = mysql.createPool({
  user: "root",
  password: "",
  database: "gameofthrones",
  host: "127.0.0.1",
});

const dbConnect = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      } else {
        resolve(conn);
      }
    });
  });
};

app.use("/", home);

app.use("/pencarian/graf", pencarianGraf);

app.use("/pencarian/grafik", pencarianGrafikBar);

app.use("/pencarian/nama", pencarianNama);

app.listen(port, () => {
  console.log("listening");
});