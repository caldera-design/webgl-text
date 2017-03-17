
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default function provideDimensions(WrappedComponent) {
    return class extends Component {

        state = {
            width: 0,
            height: 0
        }

        constructor(props) {
            super(props);
            this._handleResize = this.handleResize.bind(this);
        }

        componentDidMount() {
            const domElement = findDOMNode(this);
            this.setState({
                width: domElement.clientWidth,
                height: domElement.clientHeight
            });
            window.addEventListener('resize', this._handleResize);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this._handleResize);
        }

        handleResize() {
            const domElement = findDOMNode(this);
            this.setState({
                width: domElement.clientWidth,
                height: domElement.clientHeight
            });
        }

        render() {
            const { width, height } = this.state;
            return <WrappedComponent dimensions={{ width, height }} {...this.props} />;
        }
    };
}
