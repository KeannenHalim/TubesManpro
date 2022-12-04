import express from "express";
import { db } from "./database.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("PencarianGraf");
});

router.get("/cariGraf", async (req, res) => {
  const queryString =
    "SELECT source, target, weight FROM interaction WHERE book = '?' ORDER BY weight DESC LIMIT 10";
  // const book = req.body.something;

  const query = (conn, queryString, book) => {
    return new Promise((resolve, reject) => {
      conn.query(queryString, book, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const conn = await db();
  const result = await query(conn, queryString, book);
  conn.release();

  res.send(result);
});

export { router as pencarianGraf };