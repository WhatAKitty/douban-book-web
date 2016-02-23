import '../../semantic-ui/components/button.min.css';
import '../../semantic-ui/components/icon.min.css';
import '../../semantic-ui/components/message.min.css';
import React from 'react'
import { render } from 'react-dom'

import { Link } from 'react-router'

import { List, Item, Image, Content, Text, Button, Icon, Label, Message } from '../react-semantify'
import Pagination from '../Pagination/Pagination.react'
import Loader from '../Loader/Loader.react'
import Searchbox from '../Searchbox/Searchbox.react'

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
					<Link to={`/book/${book.id}`} className="header">{book.title}</Link>
					<Text className="description" >{book.subtitle}</Text>
				</Content>
			</Item>
		);
	}
});

const BookPage = React.createClass({
    render() {
        const pageInfo = this.props.pageInfo;
        const bookList = pageInfo.list.map((book) => {
			return (
				<BookItem book={book} />
			);
		});
        
        return (
            <div>
                <List className="very relaxed">
					{bookList}
				</List>
				<Pagination pageInfo={pageInfo} toPage={this.props.toPage} />
            </div>
        );
    }
});

const BookList = React.createClass({
	render() {
        const pageInfo = this.props.pageInfo;
        let content = undefined;
        
        if (pageInfo.list.length == 0) {
            // empty result
            // show empty tips
            content = (
                <Message className='info'>
                    <p>{this.props.message}</p>
                </Message>
            );
        } else {
            content = (
                <BookPage pageInfo={pageInfo} toPage={this.props.toPage} />
            );
        }
        
		return (
			<div>
                <Loader msg='正在加载中...' active={this.props.loading} />
                <Searchbox hint='搜索图书...' search={this.props.search} disabled={this.props.loading} />
				{content}
			</div>
		);
	}
});

export default BookList
