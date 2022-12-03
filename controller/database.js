import mysql from 'mysql';

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

export { dbConnect as db };
