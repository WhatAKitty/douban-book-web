import '../semantic-ui/components/container.min.css';
import '../semantic-ui/components/grid.min.css';
import React from 'react'
import { render } from 'react-dom'

import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

import { Container, Grid, Row, Column, Content } from './react-semantify'

import BookListApp from './BookListApp/BookListApp.react'
import BookDetailApp from './BookDetailApp/BookDetailApp.react'

// pack current page.
const App = React.createClass({
	render() {
		return (
			<Container className="text">
				<Grid>
					<Row>
						<Column>
							<Content>豆瓣搜索</Content>
						</Column>
					</Row>
					<Row >
					 	<Column>
							{this.props.children}
						</Column>
					</Row>
				</Grid>
			</Container>
		);
	}
});

const List = React.createClass({
	render() {
		return (
			<BookListApp />
		);
	}
});

const Detail = React.createClass({
	render() {
		return (
			<BookDetailApp bookId={this.props.params.bookId} />
		);
	}
});

render((
	<Router history={browserHistory} >
    	<Route path="/" component={App} >
			<IndexRoute component={List} />
			<Route path="/book/:bookId" component={Detail} />
		</Route>
  	</Router>
), document.getElementById("bookApp"));
