import { Button, Row, Col, Card, Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

import { getProductList } from '~/api/service';

const columns = [{
    title: '订单号',
    dataIndex: 'name',
    key: 'name',
    render: text => <span>{text}</span>,
}, {
    title: '订单信息',
    dataIndex: 'category',
    key: 'category',
}, {
    title: '创建时间',
    dataIndex: 'type',
    key: 'type',
}, {
    title: '订单金额',
    dataIndex: 'aaa',
    key: 'aaa',
},{
    title: '订单状态',
    dataIndex: 'lastDate',
    key: 'lastDate',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="javascript:;">编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
        </span>
    ),
}];

export default class Component extends React.Component {
    state = {
        data: [],
        pagination: {current:1, pageSize: 10},
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
        // getProductList(params).then((data) => {
        //     const pagination = { ...this.state.pagination };
        //     // Read total count from server
        //     // pagination.total = data.totalCount;
        //     pagination.total = data.total;
        //     this.setState({
        //         loading: false,
        //         data: data.data,
        //         pagination,
        //     });
        // });
    }
    render() {
        return (
            <div>
                <Breadcrumb first="产品" second="产品列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Link to="/app/order/create"><Button type="primary" icon="plus">创建订单</Button></Link>
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