import { Button, Row, Col, Card, Table, Divider, Tag, Icon, Select, Checkbox, Input, Collapse,Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import ModalRecord from './ModalRecord';
import Breadcrumb from '../../components/Breadcrumb';

import { getDomainList, getSynthesizeRecordList } from '~/api/service';

import '~/style/custom.css';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;

const columns = [{
    title: '记录类型',
    dataIndex: 'type',
    key: 'type',
    render: text => <span>{text}</span>,
}, {
    title: '主机记录',
    dataIndex: 'name',
    key: 'name',
    render: text => <span>{text}</span>,
}, {
    title: '插件',
    dataIndex: 'plugin',
    key: 'plugin',
    render: text => (
        <span>
            <Tag color="green">GeoIP</Tag>
            <Tag color="blue">智能DNS</Tag>
            <Tag color="cyan">权重</Tag>
        </span>
    ),
}, {
    title: 'TTL',
    dataIndex: 'ttl',
    key: 'ttl',
    render: text => <span>{text}</span>,
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="javascript:;">修改</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
        </span>
    ),
}];

const titleRecordAdd = '添加记录';
const titleRecordEdit = '修改记录';
const expandedRowRender = record => <p>{record.description}</p>;

export default class Component extends React.Component {
    state = {
        modalTitle: titleRecordAdd,
        visibleGithub: false,
        confirmLoading: false,
        initValues: null,
        data: [],
        recordsSynthesize: [],
        pagination: {},
        loading: false,
        valueSynthesizeType: 'dyn',
        editingID: '',
        valueSynthesize: {
            type: 'dyn',
            name: '',
            github: '',
        },
    };
    isEditing = record => record.id === this.state.editingID;
    onSubmitSynthesize = () => {
        console.log(this.state.valueSynthesize);
    }
    onChangeSynthesizeType = (value) => {
        setTimeout(() => {
            this.setState({
                valueSynthesize: {
                    ...this.state.valueSynthesize,
                    type: value,
                },
            });
        }, 0);

        switch (value) {
        case 'github':
            this.setState({
                visibleGithub: true,
            });
            break;
        case 'dyn':
            this.setState({
                visibleGithub: false,
            });
            break;
        }
    }
    onChangeSynthesizeName = e => {
        const { value } = e.target;
        this.setState({
            valueSynthesize: {
                ...this.state.valueSynthesize,
                name: value,
            },
        });
    }
    onChangeSynthesizeGithub = e => {
        const { value } = e.target;
        this.setState({
            valueSynthesize: {
                ...this.state.valueSynthesize,
                github: value,
            },
        });
    }
    onChangeSynthesizeHeader = e => {
        console.log(e.length);
        if(e.length == 0) {
            return;
        }
    }
    deleteSynthesizeRecord = id => {
        console.log(id);
    }
    updateSynthesizeRecord = id => {
        this.setState({ editingID: id });
        console.log(id);
    }
    showModalRecordAdd = () => {
        this.setState({
            modalTitle: titleRecordAdd,
            visible: true,
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }

    handleSave = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    cancelModal = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        this.fetch();
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            limit: pagination.pageSize,
            page: pagination.current,
            ...filters,
        });
    }
    addProduct = () => {
    }
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        getSynthesizeRecordList().then((data) => {
            console.log(data);
            this.setState({
                recordsSynthesize: data.data,
            });
        });
        getDomainList(params).then((data) => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = data.total;
            this.setState({
                loading: false,
                data: data.data,
                pagination,
            });
        });
    }
    render() {
        const { visible, modalTitle, confirmLoading } = this.state;
        return (
            <div>
                <Breadcrumb first="动态DNS" second="域名管理" />
                <Card style={{ width: '70%' }} bordered={true}>
                    <div style={{ marginBottom: 16 }}>
                        <h3>综合记录</h3>
                        <p>综合记录可让您一步到位为您的网域添加常用功能（例如域名转向或 G Suite）。每份综合记录都是自动生成的与某项具体功能相关的资源记录集。</p>
                        <div>
                            <div className="oa-c-w">
                                <div className="oa-c-t">
                                    <div style={{ width: '20%' }}>
                                        <Select
                                            value={this.state.valueSynthesize.type}
                                            style={{ width: 150 }}
                                            onChange={this.onChangeSynthesizeType.bind(this)}
                                        >
                                            <Option key="dyn">动态DNS</Option>
                                            <Option key="github">GITHUB站点</Option>
                                        </Select>
                                    </div>
                                    <div style={{ width: '30%' }}>
                                        <Input style={{ width: 300 }} value={this.state.valueSynthesize.name} onChange={this.onChangeSynthesizeName} addonAfter=".test.com" />
                                    </div>
                                    <div style={{ width: '50%' }}>
                                        {this.state.visibleGithub &&
                                            <React.Fragment><span style={{ fontSize: '18px' }}>→</span> <Input style={{ width: 300 }} value={this.state.valueSynthesize.github} addonBefore="https://github.com/" onChange={this.onChangeSynthesizeGithub} placeholder="yourname/repo" /></React.Fragment>}
                                    </div>
                                    <div>
                                        <Button type="primary" onClick={this.onSubmitSynthesize}>添加</Button>
                                    </div>
                                </div>
                            </div>
                            <Collapse onChange={this.onChangeSynthesizeHeader} bordered={false}>
                                {this.state.recordsSynthesize.map((item, idx) => {
                                    const editable = this.isEditing(item);
                                    if (item.type == 'dyn') {
                                        return (<Panel header={(
                                            <React.Fragment>
                                                <div className="oa-u-nb">
                                                    动态DNS
                                                </div>
                                                {editable ? (
                                                    <div className="oa-c-t">
                                                        <div style={{ width: '30%' }}>
                                                            <Input style={{ width: 300 }} value={this.state.valueSynthesize.name} onChange={this.onChangeSynthesizeName} addonAfter=".test.com" />
                                                        </div>
                                                        <div style={{ width: '50%' }}>

                                                        </div>
                                                        <div style={{ width: '10%' }}>
                                                            <Button onClick={(e) => { e.stopPropagation();this.setState({ editingID: '' }); }}>取消</Button>
                                                        </div>
                                                        <div style={{ width: '10%' }}><Button type="primary" onClick={(e) => { e.stopPropagation(); this.updateSynthesizeRecord(item.id); }}>保存</Button></div>
                                                    </div>
                                                ) : (
                                                    <div className="oa-c-t">
                                                        <div style={{ width: '30%' }}>{item.name}</div>
                                                        <div style={{ width: '60%' }}>

                                                        </div>
                                                        <div style={{ width: '5%' }}>
                                                            <Popconfirm title="确定要删除综合记录吗？" okText="确定" onCancel={(e) => { e.stopPropagation(); }} cancelText="取消" onConfirm={(e) => { e.stopPropagation(); this.deleteSynthesizeRecord(item.id); }}>
                                                                <a onClick={(e) => { e.stopPropagation(); }}>删除</a>
                                                            </Popconfirm>
                                                        </div>
                                                        <div style={{ width: '5%' }}><a onClick={(e) => { e.stopPropagation(); this.updateSynthesizeRecord(item.id); }}>修改</a></div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        )} key={item.id}
                                        className="oa-c-tb"
                                        >
                                            <div style={{ margin: '8px' }}>
                                                <div className="oa-u-u">
                                                    <div>用户名：xxxxxx</div>
                                                    <div>密码：xxxxxxx <a style={{ float: 'right' }}> 重置凭据 </a></div>
                                                </div>
                                            </div>
                                        </Panel>);
                                    }else if(item.type == 'github') {
                                        return (
                                            <Panel header={(
                                                <React.Fragment>
                                                    <div className="oa-u-nb">
                                                        GITHUB站点
                                                    </div>
                                                    {editable ? (
                                                        <div className="oa-c-t">
                                                            <div style={{ width: '30%' }}>
                                                                <Input style={{ width: 300 }} value={this.state.valueSynthesize.name} onChange={this.onChangeSynthesizeName} addonAfter=".test.com" />
                                                            </div>
                                                            <div style={{ width: '50%' }}>
                                                                <span style={{ fontSize: '18px' }}>→</span> <Input style={{ width: 300 }} value={this.state.valueSynthesize.github} addonBefore="https://github.com/" onChange={this.onChangeSynthesizeGithub} placeholder="yourname/repo" />
                                                            </div>
                                                            <div style={{ width: '10%' }}>
                                                                <Button onClick={(e) => { e.stopPropagation();this.setState({ editingID: '' }); }}>取消</Button>
                                                            </div>
                                                            <div style={{ width: '10%' }}><Button type="primary" onClick={(e) => { e.stopPropagation(); this.updateSynthesizeRecord(item.id); }}>保存</Button></div>
                                                        </div>
                                                    ):(
                                                        <div className="oa-c-t">
                                                            <div style={{ width: '30%' }}>{item.name}</div>
                                                            <div style={{ width: '60%' }}>
                                                                <span style={{ fontSize: '18px' }}>→</span> https://github.com/{item.github}
                                                            </div>
                                                            <div style={{ width: '5%' }}>
                                                                <Popconfirm title="确定要删除综合记录吗？" okText="确定" onCancel={(e) => { e.stopPropagation(); }} cancelText="取消" onConfirm={(e) => { e.stopPropagation(); this.deleteSynthesizeRecord(item.id); }}>
                                                                    <a onClick={(e) => { e.stopPropagation(); }}>删除</a>
                                                                </Popconfirm>
                                                            </div>
                                                            <div style={{ width: '5%' }}><a onClick={(e) => { e.stopPropagation(); this.updateSynthesizeRecord(item.id); }}>修改</a></div>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            )} key={item.id}
                                            className="oa-c-tb"
                                            >
            
                                            </Panel>
                                        );
                                    }
                                    
                                })}

                            </Collapse>
                        </div>
                    </div>
                </Card>
                <Card style={{ width: '70%' }} bordered={true}>
                    <div style={{ marginBottom: 16 }}>
                        <h3>自定义资源记录</h3>
                        <p>资源记录定义了您的域名的运作方式，其常见用途包括让您的域名指向您的网络服务器，或者为域名配置电子邮件递送。</p>

                        <div >
                            <Link to="/ddns/record/update"><Button type="primary" >添加记录</Button></Link>
                            
                        </div>
                        <Table columns={columns}
                            dataSource={this.state.data}
                            onChange={this.handleTableChange}
                            pagination={this.state.pagination}
                            loading={this.state.loading} />
                    </div>
                </Card>
            </div>
        );
    }
}