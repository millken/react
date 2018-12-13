'use strict';
//import React, {Component} from 'react';

export default class MyLayout extends React.Component {
    render() {

        return (<div>{this.props.children}</div>);
    }
}