import express from "express";
import { db } from "./database.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("PencarianGrafikBar");
});

router.get("/cariNama", async (req, res) => {
  const queryString =
    "SELECT t1.source AS 'Name', (t1.countTarget + t2.countSource) AS 'Count' FROM ( SELECT SOURCE , COUNT(target) AS 'countTarget' FROM `interaction` WHERE book = '?' GROUP BY SOURCE ) AS t1 INNER JOIN( SELECT target, COUNT(SOURCE) AS 'countSource' FROM `interaction` WHERE book = '?' GROUP BY target ) AS t2 ON t1.source = t2.target"
    + "UNION" 
    + "SELECT t1.source AS 'Name', t1.countTarget AS 'Count' FROM ( SELECT SOURCE , COUNT(target) AS 'countTarget' FROM `interaction` WHERE book = '?' GROUP BY SOURCE ) AS t1 LEFT JOIN( SELECT target, COUNT(SOURCE) AS 'countSource' FROM `interaction` WHERE book = '?' GROUP BY target ) AS t2 ON t1.source = t2.target WHERE t2.target IS NULL"
    + "UNION"
    + "SELECT t2.target AS 'Name', t2.countSource AS 'Count' FROM ( SELECT SOURCE , COUNT(target) AS 'countTarget' FROM `interaction` WHERE book = '?' GROUP BY SOURCE ) AS t1 RIGHT JOIN( SELECT target, COUNT(SOURCE) AS 'countSource' FROM `interaction` WHERE book = '?' GROUP BY target ) AS t2 ON t1.source = t2.target WHERE t1.source IS NULL"
    + "ORDER BY Count DESC";
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

export { router as pencarianGrafikBar };