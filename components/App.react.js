import '../semantic-ui/components/container.min.css';
import '../semantic-ui/components/grid.min.css';
import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory } from 'react-router'

import { Container, Grid, Row, Column, Content } from './react-semantify'

import BookListApp from './BookListApp/BookListApp.react'

// get html data from serverside.
const data = JSON.parse(document.getElementById("bookAppData").innerHTML);

// pack current page.
const App = React.createClass({
	render() {
		return (
			<Container className="text">
				<Grid>
					<Row>
						<Content>豆瓣搜索</Content>
					</Row>
					<Row >
					 	<Column>
							<BookListApp data={data} />
						</Column>
					</Row>
				</Grid>
			</Container>
		);
	}
});

render((
	<Router history={browserHistory} >
    	<Route path="/" component={App} />
  	</Router>
), document.getElementById("bookApp"));
