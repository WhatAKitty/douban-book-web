"use strict";
import express      from 'express';

let router = express.Router();

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/book/:bookId", (req, res) => {
	res.render("index");
});

export default router;
