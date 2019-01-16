import { Button, Row, Col, Tabs, Card, Steps, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import DdnsForm from './DdnsForm';

import { getProductList } from '~/api/service';
const TabPane = Tabs.TabPane;
const Step = Steps.Step;


export default class Component extends React.Component {
    state = {
        data: [],
        pagination: { current: 1, pageSize: 10 },
        loading: false,
    };
    render() {
        return (
            <div>
                <Breadcrumb first="订单管理" second="订单支付" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card span={12}>
                                <Steps current={1}>
                                    <Step title="确认订单信息" />
                                    <Step title="支付" />
                                    <Step title="完成" />
                                </Steps>
                            </Card>
                            <Card>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Card span={12}>

                                            <div className="dnsoa-selected-package"><label>订单号：</label><span>xxxxxx</span></div>
                                            <div className="dnsoa-selected-package"><label>服务套餐：</label><span>DDNS动态域名标准版</span></div>
                                            <div className="dnsoa-selected-package"><label>服务时长：</label><span>3个月</span></div>
                                            <div className="dnsoa-selected-package"><label>应付金额：</label><span>￥5</span></div>
                                        </Card>
                                    </Col>
                                    <Col span={5}>
                                        <Card span={12}>
                                            <div>说明：</div>
                                            <p>服务时长是从支付完成开始计算，到期未续费者则会将域名从系统中删除。</p>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}