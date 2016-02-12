import '../../semantic-ui/components/list.min.css';
import React from 'react'
import { render } from 'react-dom'

import request from 'request'

import BookList from './BookList.react'

import Config from './Config.react'

const BookListApp = React.createClass({
	getInitialState() {
		return {
			list: this.props.data
		};
	},
	componentWillUnmount() {
		this.ignoreLastFetch = true
	},
	fetchList() {
		request.get(Config.domain + "/search")
		this.setState({list: this.props.data});
	},
	render() {
		return (
			<BookList list={this.state.list} />
		);
	}
});

export default BookListApp
