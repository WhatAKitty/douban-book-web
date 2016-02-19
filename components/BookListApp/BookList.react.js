import '../../semantic-ui/components/button.min.css';
import '../../semantic-ui/components/icon.min.css';
import React from 'react'
import { render } from 'react-dom'

import { List, Item, Image, Content, Text, Link, Button, Icon, Label } from '../react-semantify'
import Pagination from '../Pagination/Pagination.react'
import Loader from '../Loader/Loader.react'

const BookItem = React.createClass({
	render() {
		const book = this.props.book;
		return (
			<Item key={book.id}>
				<Label className="right floated">
					<Icon className="empty star" />
				</Label>
				<Image className="avatar" src={book.image} width="110px" height="150px"/>
				<Content>
					<Link className="header">{book.title}</Link>
					<Text className="description" >{book.subtitle}</Text>
				</Content>
			</Item>
		);
	}
});

const BookList = React.createClass({
	render() {
		const pageInfo = this.props.pageInfo;
		const bookList = pageInfo.list.map((book) => {
			return (
				<BookItem book={book} />
			);
		});
		
		return (
			<div>
                <Loader msg='正在加载中...' active={this.props.loading} />
				<List className="very relaxed">
					{bookList}
				</List>
				<Pagination pageInfo={pageInfo} toPage={this.props.toPage} />
			</div>
		);
	}
});

export default BookList
