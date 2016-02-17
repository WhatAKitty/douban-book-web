import '../../semantic-ui/components/list.min.css';
import React from 'react'
import { render } from 'react-dom'

import request from 'request'

import BookList from './BookList.react'

import Config from '../Config.react'

import PageInfo from '../Obj/PageInfo'

const BookListApp = React.createClass({
	getInitialState() {
		return {
			pageInfo: {
				pageNumber: 1,
				pageSize: 5,
				totalPage: undefined,
				list: []
			}
		};
	},
	componentDidMount() {
		const pageInfo = PageInfo.parseFromParams({
			q: "Node",
			pageSize: 5
		});
		this.fetchList(pageInfo);
	},
	componentWillUnmount() {
		this.ignoreLastFetch = true
	},
	fetchList(pageInfo, callback) {
		const q = pageInfo.searchInfo.q;
		const tag = pageInfo.searchInfo.tag;
		request.get(Config.domain + Config.apiContext + "/search?" + pageInfo.stringify(), (err, response, body) => {
			if (response.statusCode != 200) {
				console.log(body);
				return;
			}
			
			const data = JSON.parse(body);
			this.setState({pageInfo: {
				pageNumber: data.start / data.count + 1,
				pageSize: data.count,
				searchInfo: {
					q: q,
					tag: tag
				},
				totalPage: data.total / data.count + (data.total % data.count == 0 ? 0 : 1),
				list: data.books
			}});
			
			if (callback && typeof callback === 'function') {
				callback();
			}
		});
	},
	skipPage(e) {
		const target = e.target;
		let pageInfo = this.state.pageInfo;
		pageInfo.pageNumber = target.textContent;
		
		this.fetchList(PageInfo.parseFromParams(pageInfo));
	},
	render() {
		return (
			<BookList pageInfo={this.state.pageInfo} toPage={this.skipPage} />
		);
	}
});

export default BookListApp
