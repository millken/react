import { Button, Row, Col, Card, Table, Divider, Tag,Icon } from 'antd';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

import { getDomainList } from '~/api/service';

const columns = [{
    title: '域名',
    dataIndex: 'name',
    key: 'name',
    render: text => <span>{text}</span>,
}, {
    title: '套餐',
    dataIndex: 'package',
    key: 'package',
    render: text => <Tag color="#2db7f5">{text}</Tag>,
}, {
    title: '更新时间',
    dataIndex: 'lastDate',
    key: 'lastDate',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="javascript:;">解析设置</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
        </span>
    ),
}];

export default class Component extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };

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
        return (
            <div>
                <Breadcrumb first="动态DNS" second="域名管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Link to="/product/add"><Button type="primary"><Icon style={{ color: '#fff' }} type="plus" />添加产品</Button></Link>
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