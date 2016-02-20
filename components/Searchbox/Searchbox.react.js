import '../../semantic-ui/components/input.min.css'
import '../../semantic-ui/components/icon.min.css';
import '../../semantic-ui/components/search.min.css'
import React from 'react'
import { render } from 'react-dom'

import { Search, Icon, Input } from '../react-semantify'

const Searchbox = React.createClass({
    render() {
        let searchInput = undefined;
        if (this.props.disabled) {
            searchInput = (
                <input className='prompt' type='text' placeholder={this.props.hint} onChange={this.props.search} disabled />
            );
        } else {
            searchInput = (
                <input className='prompt' type='text' placeholder={this.props.hint} onChange={this.props.search} />
            );
        }
        
        return (
            <Search>
                <Input className='fluid icon mini' >
                    {searchInput}
                    <Icon className='search' />
                </Input>
            </Search>
        );
    }
});

export default Searchbox;
