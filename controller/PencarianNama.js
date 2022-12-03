import express from "express";
import { db } from "./database.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("PencarianNama");
});

router.get("/cariNama", async (req, res) => {
  const queryString =
    "SELECT target, weight FROM ( SELECT target, weight, book FROM interaction WHERE source LIKE '%?%' UNION SELECT source, weight, book FROM interaction WHERE target LIKE '%?%' ) as selected WHERE book = '?' ORDER BY weight DESC";
  // const name = req.body.something;
  // const book = req.body.something;

  const query = (conn, queryString, name, book) => {
    return new Promise((resolve, reject) => {
      conn.query(queryString, name, book, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const conn = await db();
  const result = await query(conn, queryString, name, book);
  conn.release();

  res.send(result);
});

export { router as pencarianNama };
