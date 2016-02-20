import '../../semantic-ui/components/list.min.css';
import React from 'react'
import { render, findDOMNode } from 'react-dom'

import request from 'request'

import BookList from './BookList.react'

import Config from '../Config.react'

import PageInfo from '../Obj/PageInfo'

const initState = {
    message: '欢迎访问豆瓣WEB客户端',
    pageInfo: {
        pageNumber: 1,
        pageSize: 5,
        totalPage: 1,
        searchInfo: {},
        list: []
    },
    loading: false
}

const BookListApp = React.createClass({
	getInitialState() {
		return initState
    },
	componentDidMount() {
		const pageInfo = PageInfo.parseFromParams(initState);
		this.fetchList(pageInfo);
	},
	componentWillUnmount() {
		this.ignoreLastFetch = true
	},
	fetchList(pageInfo, callback) {
        // set loading true
        this.setState({loading: true});
        
        // focus booklistApp dom prevent from inputing.
        document.body.focus();
        
        // start timeout
        let delayInput = setTimeout(() => {
            // clear timeout
            clearTimeout(delayInput);
            
            // fetch list from server side.
            const q = pageInfo.searchInfo.q;
            const tag = pageInfo.searchInfo.tag;
            const pageSize = pageInfo.pageSize;
            if ((!q || q.trim() == '') && (!tag || tag.trim() == '')) {
                this.setState(initState);
                
                if (callback && typeof callback === 'function') {
                    callback();
                }
                return;
            }
            
            request.get(Config.domain + Config.apiContext + "/search?" + pageInfo.stringify(), (err, response, body) => {
                if (response.statusCode != 200) {
                    this.setState({message: body, loading: false});
                    
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                    return;
                }
                
                const data = JSON.parse(body);
                if (data.books.length == 0) {
                    this.setState({message: '未查找到匹配的结果'});
                }
                
                this.setState({
                    pageInfo: {
                        pageNumber: Math.floor(data.start / data.count) + 1,
                        pageSize: pageSize,
                        searchInfo: {
                            q: q,
                            tag: tag
                        },
                        totalPage: Math.floor(data.total / pageSize) + (data.total % pageSize == 0 ? 0 : 1),
                        list: data.books
                    },
                    loading: false
                });
                
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        }, 500);
        
	},
	skipPage(e) {
		const target = e.target;
        
        if (target.className.includes('disabled')) {
            return false;
        }
        
		let pageInfo = this.state.pageInfo;
		pageInfo.pageNumber = target.dataset.page;
		
		this.fetchList(PageInfo.parseFromParams(pageInfo));
	},
    search(e) {
        const target = e.target;
        const key = target.value;
        
        let pageInfo = this.state.pageInfo;
        pageInfo.searchInfo.q = pageInfo.searchInfo.tag = key;
        
        this.fetchList(PageInfo.parseFromParams(pageInfo));
    },
	render() {
		return (
			<BookList message={this.state.message} loading={this.state.loading} pageInfo={this.state.pageInfo} toPage={this.skipPage} search={this.search} />
		);
	}
});

export default BookListApp
