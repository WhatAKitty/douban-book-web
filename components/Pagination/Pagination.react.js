import '../../semantic-ui/components/menu.min.css'
import React from 'react'
import { render } from 'react-dom'

import { Menu, Item } from '../react-semantify'

const Page = React.createClass({
	render() {
		const {active, disabled, skipped, pageNumber, pageShow} = this.props.page;
		const toPage = this.props.toPage;
		
		if (skipped) {
			return (
				<Item type='link' className='disabled'>...</Item>
			);
		}
		
		return (
			<Item data-page={pageNumber} type='link' className={ (active?'active ':' ') + (disabled?'disabled':'') } onClick={toPage}>
				{pageShow}
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
		
        const hasPrevious                       = pageNumber > 1;
        const hasNext                           = pageNumber < totalPage;
        
		let pages = new Array();
		if (totalPage - pageNumber > maxPageShow) {
			// hide some page items.
			pages.push(pageNumber, pageNumber + 1, -1, totalPage - 1, totalPage);
		} else {
            if (totalPage < 5) {
                for (let i = 1; i <= totalPage; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = totalPage - 5; i <= totalPage; i++) {
                    pages.push(i);
                }
            }
			
		}
		
		const pagination = pages.map((page) => {
			const item = {
                pageShow: page,
				pageNumber: page,
				active: pageNumber == page,
				disabled: false,
				skipped: page == -1
			}
			return (
				<Page page={item} toPage={this.props.toPage} />
			);
		});
        
        const first = {
            pageShow: '<<',
            pageNumber: 1,
            active: false,
            disabled: false,
            skipped: false
        }
        const last = {
            pageShow: '>>',
            pageNumber: totalPage,
            active: false,
            disabled: false,
            skipped: false
        }
        const prev = {
            pageShow: '<',
            pageNumber: pageNumber - 1,
            active: false,
            disabled: hasPrevious ? false : true,
            skipped: false
        }
        const next = {
            pageShow: '>',
            pageNumber: pageNumber + 1,
            active: false,
            disabled: hasNext ? false : true,
            skipped: false
        }
		
		return (
			<Menu className="pagination">
                <Page page={first} toPage={this.props.toPage} />
                <Page page={prev} toPage={this.props.toPage} />
				{pagination}
                <Page page={next} toPage={this.props.toPage} />
                <Page page={last} toPage={this.props.toPage} />
			</Menu>
		);
	}
});

export default Pagination
