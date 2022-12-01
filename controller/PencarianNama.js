import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("PencarianNama");
});

export { router as pencarianNama };