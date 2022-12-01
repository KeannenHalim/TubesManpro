import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("PencarianGrafikBar");
});

export { router as pencarianGrafikBar };