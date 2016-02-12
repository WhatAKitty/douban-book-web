"use strict";
import express from 'express';
import Douban from 'douban-book-client';

const app = express.Router();
const api = new Douban();

app.get("/search", (req, res) => {
	api.search({
		q: req.query.q,
		start: req.query.start,
		count: req.query.count,
		tag: req.query.tag
	}, (err, data) => {
		if (err) {
			res.status(err.code).send(err.msg);
		} else {
			res.json(data);
		}
	});
});
