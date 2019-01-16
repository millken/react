import { Button, Row, Col, Icon, Card, Tooltip, Form, Select, Input, Radio } from 'antd';
import { message } from 'antd';


import { getOrderDdnsFormSetting, ddnsValidateDomain, createOrder } from '~/api/service';

import '~/style/custom.css';

const FormItem = Form.Item;
const Option = Select.Option;

class DdnsForm extends React.Component {
    state = {
        data: [],
        hostname: '',
        domain: [],
        recordType: [],
        recordLine: [],
        recordNumber: 0,
        recordMinTTL: 0,
        loading: false,
        package: [],
        currentPackageID: 0,
        currentPackageName: '',
        currentPackageData: [],
        selectedDomain: '',
        price: 0,
        editorState: '',
        currentDuration: 1,
        messageDomainValidating: 'validating',
        messageDomainHelp: '',
    };
    componentDidMount() {
        this.setState({ loading: true });
        getOrderDdnsFormSetting().then((data) => {
            this.setState({
                loading: false,
                package: data.data.package,
            });
            console.warn(this.state.data);
            this.onPackageChange(1);

        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleValidateDomain().then(()=>{
            let values = {
                orderType: 'ddns',
                serviceDuration: this.state.currentDuration,
                hostname: this.state.hostname,
                domain: this.state.selectedDomain,
                packageID: this.state.currentPackageID,
            };
            this.state.messageDomainValidating == 'success' &&
                createOrder(values).then(res => {
                    if (!res.success) {
                        message.error(res.message);
                    } else {
                        message.info(res.message);
                    }
                });
        });



    }
    handleValidateDomain = () => {
        return ddnsValidateDomain({ hostname: this.state.hostname, domain: this.state.selectedDomain }).then((data) => {
            if (data.data.isUse) {
                this.setState({
                    messageDomainHelp: '此域名不可使用',
                    messageDomainValidating: 'error',
                });
            } else {
                this.setState({
                    messageDomainHelp: '域名可以使用',
                    messageDomainValidating: 'success',
                });
            }
        });

    }
    onPackageChange = (e) => {
        //console.log('radio checked', e);
        this.state.package.map(p => {
            if (e == p.id) {
                this.setState({
                    currentPackageID: p.id,
                    currentPackageName: p.name,
                    price: p.price,
                    currentPackageData: p.data,
                    domain: p.data.domain,
                    selectedDomain: p.data.domain[0],
                    recordType: p.data.recordType,
                    recordLine: p.data.recordLine,
                    recordMinTTL: p.data.recordMinTTL,
                    recordNumber: p.data.recordNumber,
                });
            }
        });

    }
    render() {

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <Row gutter={16}>
                <Form onSubmit={this.handleSubmit}>
                    <Col span={12}>
                        <Card span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="购买类型"
                            >
                                {getFieldDecorator('orderType', {
                                    initialValue: 'renew',
                                    rules: [{
                                        required: false, message: '请选择购买类型',
                                    }],
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="new">新购</Radio.Button>
                                        <Radio.Button value="renew">续费</Radio.Button>
                                        <Radio.Button value="upgrade">升级</Radio.Button>
                                    </Radio.Group>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                        套餐选择&nbsp;
                                        <Tooltip title="会调出不同界面">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                )}
                            >
                                {getFieldDecorator('packageID', {
                                    initialValue: 1,
                                    rules: [{
                                        required: false, message: '请选择套餐',
                                    }],
                                })(
                                    <Radio.Group onChange={e => this.onPackageChange(e.target.value)} buttonStyle="solid">
                                        {this.state.package.map(p =>
                                            <Radio.Button value={p.id} key={p.id}>{p.name}</Radio.Button>
                                        )}
                                    </Radio.Group>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="套餐说明"
                            >

                                <div className="desc">域名后缀： {this.state.domain.join('，')}</div>
                                <div className="desc">记录类型： {this.state.recordType.join('，')}</div>
                                <div className="desc">智能线路： {this.state.recordLine.join('，')}</div>
                                <div className="desc">记录数量： {this.state.recordNumber}</div>
                                <div className="desc">最小TTL： {this.state.recordMinTTL}</div>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="套餐单价"
                            >
                                <span className="ant-form-text">{this.state.price}元／月</span>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="购买时长"
                            >
                                {getFieldDecorator('duration', {
                                    initialValue: '1',
                                })(
                                    <Radio.Group buttonStyle="solid" onChange={e => this.setState({ currentDuration: e.target.value })}>
                                        <Radio.Button value="1">1个月</Radio.Button>
                                        <Radio.Button value="2">2个月</Radio.Button>
                                        <Radio.Button value="3">3个月</Radio.Button>
                                        <Radio.Button value="5">半年</Radio.Button>
                                        <Radio.Button value="12">1年</Radio.Button>
                                        <Radio.Button value="36">3年</Radio.Button>
                                    </Radio.Group>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="域名"
                                validateStatus={this.state.messageDomainValidating}
                                help={this.state.messageDomainHelp}
                            >
                                {getFieldDecorator('domain')(
                                    <div>
                                        <Input style={{ width: 200 }} onChange={e => this.setState({ hostname: e.target.value })} />
                                        <Select value={this.state.selectedDomain} onChange={v => this.setState({ selectedDomain: v })} style={{ width: 140 }}>
                                            {this.state.domain.map(p =>
                                                <Option value={p} key={p}>.{p}</Option>
                                            )}
                                        </Select>
                                        <Button type="primary" onClick={this.handleValidateDomain}>检测</Button>
                                    </div>
                                )}
                            </FormItem>

                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card title="已选套餐">
                            <div className="ant-row ant-form-item dnsoa-selected-package"><label>套餐名称：</label><span>{this.state.currentPackageName}</span></div>
                            <div className="ant-row ant-form-item dnsoa-selected-package"><label>域名：</label><span>{this.state.messageDomainValidating == 'success' ? this.state.hostname : ''}.{this.state.selectedDomain}</span></div>
                            <div className="ant-row ant-form-item dnsoa-selected-package"><label>记录类型：</label><span>{this.state.recordType.join('，')}</span></div>
                            <div className="ant-row ant-form-item dnsoa-selected-package"><label>智能线路：</label><span>{this.state.recordLine.join('，')}</span></div>
                            <div className="ant-row ant-form-item dnsoa-selected-package"><label>记录数量：</label><span>{this.state.recordNumber}</span></div>
                            <div className="ant-row ant-form-item dnsoa-selected-package"><label>最小TTL：</label><span>{this.state.recordMinTTL}</span></div>
                            <div className="ant-row ant-form-item dnsoa-selected-package"><label>套餐费用：</label><span className="packageMoney">￥{this.state.currentDuration * this.state.price}</span></div>
                            <div><Button type="primary" htmlType="submit" size="large" block>立即购买</Button></div>
                        </Card>
                    </Col>
                </Form>
            </Row>
        );
    }
}

export default Form.create()(DdnsForm);