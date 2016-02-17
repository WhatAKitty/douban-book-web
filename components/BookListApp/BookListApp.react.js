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
			list: []
		};
	},
	componentDidMount() {
		let pageInfo = PageInfo.parseFromParams({
			q: "Node",
			pageSize: 5
		});
		this.fetchList(pageInfo);
	},
	componentWillUnmount() {
		this.ignoreLastFetch = true
	},
	fetchList(pageInfo) {
		request.get(Config.domain + Config.apiContext + "/search?" + pageInfo.stringify(), (err, response, body) => {
			let data = JSON.parse(body);
			this.setState({list: data.books});
		});
	},
	render() {
		return (
			<BookList list={this.state.list} />
		);
	}
});

export default BookListApp
