import '../../semantic-ui/components/loader.min.css'
import '../../semantic-ui/components/dimmer.min.css'
import React from 'react'
import { render } from 'react-dom'

import { Loader, Dimmer } from '../react-semantify'

const LoaderM = React.createClass({
    render() {
        return (
            <Loader className='text'>{this.props.msg}</Loader>
        );
    }
});

const DimmerM = React.createClass({
    render() {
        return (
            <Dimmer active={this.props.active} className='inverted' >
                <LoaderM msg={this.props.msg} />
            </Dimmer>
        );
    }
});

export default DimmerM;
