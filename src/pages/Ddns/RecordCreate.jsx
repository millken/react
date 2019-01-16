import { Button, Row, Col, Card, Table, Divider, Tag, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ModalRecord from './ModalRecord';
import Breadcrumb from '../../components/Breadcrumb';

import { getDomainList } from '~/api/service';

const columns = [{
    title: '记录类型',
    dataIndex: 'record_type',
    key: 'record_type',
    render: text => <span>{text}</span>,
}, {
    title: '主机记录',
    dataIndex: 'name',
    key: 'name',
    render: text => <Tag color="#2db7f5">{text}</Tag>,
}, {
    title: '插件',
    dataIndex: 'plugin',
    key: 'plugin',
}, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
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

export default class Component extends React.Component {
    state = {
        modalTitle: titleRecordAdd,
        visible: false,
        confirmLoading: false,
        initValues: null,
        data: [],
        pagination: {},
        loading: false,
    };

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
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.showModalRecordAdd}>添加记录</Button>
                                    <ModalRecord
                                        ref={this.saveFormRef}
                                        title={this.state.modalTitle}
                                        visible={this.state.visible}
                                        initValues={this.state.initValues}
                                        onCancel={this.cancelModal}
                                        handleSave={this.handleSave}

                                    />
                                </div>
                                <Table columns={columns}
                                    dataSource={this.state.data}
                                    onChange={this.handleTableChange}
                                    pagination={this.state.pagination}
                                    loading={this.state.loading} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}