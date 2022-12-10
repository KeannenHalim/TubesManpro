import express from "express";
import { db } from "./database.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("PencarianGraf");
});

router.post("/show", async (req, res) => {
  const queryStringLinks =
    "SELECT source AS 'name' FROM ( SELECT source , target, weight FROM interaction WHERE book = '?' ORDER BY weight DESC LIMIT 10 ) AS sourcedata"
    + " UNION"
    + " SELECT target AS 'name' FROM ( SELECT source , target, weight FROM interaction WHERE book = '?' ORDER BY weight DESC LIMIT 10 ) AS targetdata"
  const queryStringNodes =
    "SELECT source, target, weight FROM interaction WHERE book = '?' ORDER BY weight DESC LIMIT 10";
  const bookIn = req.body.book;
  const bookReq = [bookIn, bookIn];

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
  const nodesResult = await query(conn, queryStringLinks, bookReq);
  const linksResult = await query(conn, queryStringNodes, bookIn);
  conn.release();

  const graph = {
    nodes: nodesResult,
    links: linksResult
  }

  res.json(graph);
});

export { router as pencarianGraf };