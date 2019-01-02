'use strict';
import { Layout } from 'antd';

export default class Component extends React.Component {
    render() {

        return (
            <Layout>
                {this.props.children}
            </Layout>
        );
    }
}