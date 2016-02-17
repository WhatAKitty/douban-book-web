import React from 'react'
import { render } from 'react-dom'

import { Menu, Item } from '../react-semantify'

const Page = React.createClass({
	render() {
		const {active, disabled, skipped, pageNumber} = this.props.page;
		
		if (skipped) {
			return (
				<Item type='link' className='disabled'>...</Item>
			);
		}
		
		return (
			<Item type='link' className={ (active?'active ':' ') + (disabled?'disabled':'') }>pageNumber</Item>
		);
	};
});

const Pagination = React.createClass({
	render() {
		const maxPageShow 						= 5;
		const {pageNumber, pageSize, totalPage}	= pageInfo;
		
		let pages = new Array();
		if (totalPage > maxPageShow) {
			// hide some page items.
			pages.push(1, 2, -1, totalPage - 1, totalPage);
		} else {
			for (let i = 0; i < totalPage; i++) {
				pages.push(i + 1);
			}
		}
		
		const pagination = pages.map((page) => {
			let item = {
				pageNumber: pageNumber,
				active: pageNumber == page,
				disabled: false,
				skipped: pageNumber == -1
			}
			return (
				<Page page=item />
			);
		});
		
		return (
			<Menu className="pagination">
				{pagination}
			</Menu>
		);
	};
});
