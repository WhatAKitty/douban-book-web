import '../../semantic-ui/components/menu.min.css'
import React from 'react'
import { render } from 'react-dom'

import { Menu, Item } from '../react-semantify'

const Page = React.createClass({
	render() {
		const {active, disabled, skipped, pageNumber} = this.props.page;
		const toPage = this.props.toPage;
		
		if (skipped) {
			return (
				<Item type='link' className='disabled'>...</Item>
			);
		}
		
		return (
			<Item type='link' className={ (active?'active ':' ') + (disabled?'disabled':'') } onClick={toPage}>
				{pageNumber}
			</Item>
		);
	}
});

const Pagination = React.createClass({
	render() {
		const maxPageShow 						= 5;
		const {pageNumber, pageSize, totalPage}	= this.props.pageInfo;
		
		if (!totalPage) {
			return (
				<Menu className="pagination"></Menu>
			);
		}
		
		let pages = new Array();
		if (totalPage - pageNumber > maxPageShow) {
			// hide some page items.
			pages.push(pageNumber, pageNumber + 1, -1, totalPage - 1, totalPage);
		} else {
			for (let i = pageNumber; i <= totalPage; i++) {
				pages.push(i);
			}
		}
		
		const pagination = pages.map((page) => {
			const item = {
				pageNumber: page,
				active: pageNumber == page,
				disabled: false,
				skipped: page == -1
			}
			return (
				<Page page={item} toPage={this.props.toPage} />
			);
		});
		
		return (
			<Menu className="pagination">
				{pagination}
			</Menu>
		);
	}
});

export default Pagination
