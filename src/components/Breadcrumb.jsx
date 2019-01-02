import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export default class Component extends React.Component {
    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <span>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
                    {first}
                    {second}
                </Breadcrumb>
            </span>
        );
    }
}
