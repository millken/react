import { Button, Row, Col, Tabs, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import DdnsForm from './DdnsForm';

import { getProductList } from '~/api/service';
const TabPane = Tabs.TabPane;


export default class Component extends React.Component {
    state = {
        data: [],
        pagination: { current: 1, pageSize: 10 },
        loading: false,
    };
    render() {
        return (
            <div>
                <Breadcrumb first="订单管理" second="创建订单" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="DNS动态域名" key="1"><DdnsForm /></TabPane>
                                    <TabPane tab="CDN+分布式流量管理" key="2">Content of tab 2</TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}