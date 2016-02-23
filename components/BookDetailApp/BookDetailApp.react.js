import React from 'react'
import { render } from 'react-dom'

import request from 'request'

import BookDetail from './BookDetail.react'

import Config from '../Config.react'

const BookDetailApp = React.createClass({
	getInitialState() {
		return {
			book: {},
			loading: true
		}
	},
	componentDidMount() {
		const bookId = this.props.bookId;
		
		this.fetchBookInfo(bookId);	
	},
	fetchBookInfo(bookId, callback) {
		request.get(Config.domain + Config.apiContext + '/search/' + bookId, (err, response, body) => {
			if (response.statusCode != 200) {
				this.setState({message: body});
				
				if (callback && typeof callback === 'function') {
					callback();
				}
				return;
			}
			
			const data = JSON.parse(body);
			
			this.setState({book: data, loading: false});
		});
	},
	render() {
		return (
			<BookDetail book={this.state.book} loading={this.state.loading} />
		);
	}
});

export default BookDetailApp;
