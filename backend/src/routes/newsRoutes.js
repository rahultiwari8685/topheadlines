import express from "express";
import upload from "../middlewares/upload.js";

import {
  createNews,
  getNews,
  getNewsBySlug,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

const router = express.Router();

router.post("/saveNews", upload.single("thumbnail"), createNews);

router.put("/:id", upload.single("thumbnail"), updateNews);

router.get("/getAllNews", getNews);
// router.get("/:slug", getNewsBySlug);

router.get("/slug/:slug", getNewsBySlug);
router.get("/id/:id", getNewsById);

router.delete("/deleteNews/:id", deleteNews);

export default router;
