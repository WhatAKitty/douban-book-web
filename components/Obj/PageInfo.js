import querystring from 'querystring'

class SearchInfo {
	constructor(q, tag) {
		this.q = q;
		this.tag = tag;
	}
	
	static parseFromParams(params) {
		let q   = params.q || (params.searchInfo && params.searchInfo.q);
		let tag = params.tag || (params.searchInfo && params.searchInfo.tag);
		
		return new SearchInfo(q, tag);
	}
}

class PageInfo {
	constructor(pageNumber = 1, pageSize = 5, searchInfo) {
		this.pageNumber = pageNumber;
		this.pageSize 	= pageSize;
		this.searchInfo = searchInfo;
	}
	
	stringify() {
		let params = {
			q: this.searchInfo.q,
			tag: this.searchInfo.tag,
			start: (this.pageNumber - 1) * this.pageSize,
			count: this.pageSize
		}
		return querystring.stringify(params);
	}
	
	static parseFromParams(params) {
		let pageNumber 	= params.pageNumber;
		let pageSize 	= params.pageSize;
		
		// Search Info
		let searchInfo = SearchInfo.parseFromParams(params);
		
		return new PageInfo(pageNumber, pageSize, searchInfo);
	}
}

export default PageInfo;