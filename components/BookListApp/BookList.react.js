import '../../semantic-ui/components/button.min.css';
import '../../semantic-ui/components/icon.min.css';
import React from 'react'
import { render } from 'react-dom'

import { List, Item, Image, Content, Text, Link, Button, Icon, Label } from '../react-semantify'

const BookItem = React.createClass({
	render() {
		let book = this.props.book;
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
		let list = this.props.list.map((book) => {
			return (
				<BookItem book={book} />
			);
		});
		
		return (
			<List className="very relaxed">
			{list}
			</List>
		);
	}
});

export default BookList
