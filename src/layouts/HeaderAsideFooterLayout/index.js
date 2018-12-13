import { Layout } from 'antd';

import Asider from './Asider';
import Header from './Header';

const { Content, Footer } = Layout;


import '~/assets/css/antd/index.less';

export default class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    
    toggle=()=> {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Asider collapsed={this.state.collapsed} />
                <Layout style={{ flexDirection: 'column' }}>
                    <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                        <Header toggle={this.toggle} collapsed={this.state.collapsed} user={ {}} />
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        React-Admin ©{new Date().getFullYear()} Created by 865470087@qq.com
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}