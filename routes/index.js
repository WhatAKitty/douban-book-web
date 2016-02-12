"use strict";
import express      from 'express';
import Client		from 'douban-book-client';

let router = express.Router();

router.get("/", (req, res) => {
	let api = new Client();
	api.search({
		q: "Node"
	}, (err, data) => {
		res.render("index", {bookAppData: JSON.stringify(data.books)});
	});
	
});

export default router;