import express from "express";
import { db } from "./database.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("PencarianGrafikBar");
});

router.get("/cariNama", async (req, res) => {
  const queryString =
    "SELECT IF( SOURCE IS NOT NULL, SOURCE, target )AS 'Name', IF( SOURCE = target, countTarget + countSource, IF( SOURCE IS NULL, countTarget, countSource ) )AS 'Count' FROM ( ( SELECT * FROM ( SELECT SOURCE , COUNT(target) AS 'countTarget' FROM `interaction` WHERE book = '1' GROUP BY SOURCE ) AS t1 LEFT JOIN( SELECT target, COUNT(SOURCE) AS 'countSource' FROM `interaction` WHERE book = '1' GROUP BY target ) AS t2 ON t1.source = t2.target ) UNION ( SELECT * FROM ( SELECT SOURCE , COUNT(target) AS 'countTarget' FROM `interaction` WHERE book = '1' GROUP BY SOURCE ) AS t1 RIGHT JOIN( SELECT target, COUNT(SOURCE) AS 'countSource' FROM `interaction` WHERE book = '1' GROUP BY target ) AS t2 ON t1.source = t2.target ) ) AS newtable ORDER BY Count DESC";
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