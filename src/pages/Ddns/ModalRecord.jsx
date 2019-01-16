import {
    Button, Modal, Form, Input, Radio, Row, Col, Select, Popover, Icon, Checkbox, Table, Popconfirm, InputNumber,
} from 'antd';

import '~/style/custom.css';
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const pluginOptions = [
    { label: 'GeoIP', value: 'geoip' },
    { label: '智能线路', value: 'line' },
    { label: '权重', value: 'weight' },
];

const geoipData = [
    { key: 'AD', label: 'Andorra' },
    { key: 'AE', label: 'United Arab Emirates' },
    { key: 'AF', label: 'Afghanistan' },
    { key: 'AG', label: 'Antigua and Barbuda' },
    { key: 'AI', label: 'Anguilla' },
    { key: 'AL', label: 'Albania' },
    { key: 'AM', label: 'Armenia' },
    { key: 'AO', label: 'Angola' },
    { key: 'AP', label: 'Asia/Pacific Region' },
    { key: 'AQ', label: 'Antarctica' },
    { key: 'AR', label: 'Argentina' },
    { key: 'AS', label: 'American Samoa' },
    { key: 'AT', label: 'Austria' },
    { key: 'AU', label: 'Australia' },
    { key: 'AW', label: 'Aruba' },
    { key: 'AX', label: 'Aland Islands' },
    { key: 'AZ', label: 'Azerbaijan' },
    { key: 'BA', label: 'Bosnia and Herzegovina' },
    { key: 'BB', label: 'Barbados' },
    { key: 'BD', label: 'Bangladesh' },
    { key: 'BE', label: 'Belgium' },
    { key: 'BF', label: 'Burkina Faso' },
    { key: 'BG', label: 'Bulgaria' },
    { key: 'BH', label: 'Bahrain' },
    { key: 'BI', label: 'Burundi' },
    { key: 'BJ', label: 'Benin' },
    { key: 'BL', label: 'Saint Barthelemy' },
    { key: 'BM', label: 'Bermuda' },
    { key: 'BN', label: 'Brunei Darussalam' },
    { key: 'BO', label: 'Bolivia' },
    { key: 'BQ', label: 'Bonaire, Saint Eustatius and Saba' },
    { key: 'BR', label: 'Brazil' },
    { key: 'BS', label: 'Bahamas' },
    { key: 'BT', label: 'Bhutan' },
    { key: 'BV', label: 'Bouvet Island' },
    { key: 'BW', label: 'Botswana' },
    { key: 'BY', label: 'Belarus' },
    { key: 'BZ', label: 'Belize' },
    { key: 'CA', label: 'Canada' },
    { key: 'CC', label: 'Cocos (Keeling) Islands' },
    { key: 'CD', label: 'Congo, The Democratic Republic of the' },
    { key: 'CF', label: 'Central African Republic' },
    { key: 'CG', label: 'Congo' },
    { key: 'CH', label: 'Switzerland' },
    { key: 'CI', label: 'Cote d\'Ivoire' },
    { key: 'CK', label: 'Cook Islands' },
    { key: 'CL', label: 'Chile' },
    { key: 'CM', label: 'Cameroon' },
    { key: 'CN', label: 'China' },
    { key: 'CO', label: 'Colombia' },
    { key: 'CR', label: 'Costa Rica' },
    { key: 'CU', label: 'Cuba' },
    { key: 'CV', label: 'Cape Verde' },
    { key: 'CW', label: 'Curacao' },
    { key: 'CX', label: 'Christmas Island' },
    { key: 'CY', label: 'Cyprus' },
    { key: 'CZ', label: 'Czech Republic' },
    { key: 'DE', label: 'Germany' },
    { key: 'DJ', label: 'Djibouti' },
    { key: 'DK', label: 'Denmark' },
    { key: 'DM', label: 'Dominica' },
    { key: 'DO', label: 'Dominican Republic' },
    { key: 'DZ', label: 'Algeria' },
    { key: 'EC', label: 'Ecuador' },
    { key: 'EE', label: 'Estonia' },
    { key: 'EG', label: 'Egypt' },
    { key: 'EH', label: 'Western Sahara' },
    { key: 'ER', label: 'Eritrea' },
    { key: 'ES', label: 'Spain' },
    { key: 'ET', label: 'Ethiopia' },
    { key: 'EU', label: 'Europe' },
    { key: 'FI', label: 'Finland' },
    { key: 'FJ', label: 'Fiji' },
    { key: 'FK', label: 'Falkland Islands (Malvinas)' },
    { key: 'FM', label: 'Micronesia, Federated States of' },
    { key: 'FO', label: 'Faroe Islands' },
    { key: 'FR', label: 'France' },
    { key: 'GA', label: 'Gabon' },
    { key: 'GB', label: 'United Kingdom' },
    { key: 'GD', label: 'Grenada' },
    { key: 'GE', label: 'Georgia' },
    { key: 'GF', label: 'French Guiana' },
    { key: 'GG', label: 'Guernsey' },
    { key: 'GH', label: 'Ghana' },
    { key: 'GI', label: 'Gibraltar' },
    { key: 'GL', label: 'Greenland' },
    { key: 'GM', label: 'Gambia' },
    { key: 'GN', label: 'Guinea' },
    { key: 'GP', label: 'Guadeloupe' },
    { key: 'GQ', label: 'Equatorial Guinea' },
    { key: 'GR', label: 'Greece' },
    { key: 'GS', label: 'South Georgia and the South Sandwich Islands' },
    { key: 'GT', label: 'Guatemala' },
    { key: 'GU', label: 'Guam' },
    { key: 'GW', label: 'Guinea-Bissau' },
    { key: 'GY', label: 'Guyana' },
    { key: 'HK', label: 'Hong Kong' },
    { key: 'HM', label: 'Heard Island and McDonald Islands' },
    { key: 'HN', label: 'Honduras' },
    { key: 'HR', label: 'Croatia' },
    { key: 'HT', label: 'Haiti' },
    { key: 'HU', label: 'Hungary' },
    { key: 'ID', label: 'Indonesia' },
    { key: 'IE', label: 'Ireland' },
    { key: 'IL', label: 'Israel' },
    { key: 'IM', label: 'Isle of Man' },
    { key: 'IN', label: 'India' },
    { key: 'IO', label: 'British Indian Ocean Territory' },
    { key: 'IQ', label: 'Iraq' },
    { key: 'IR', label: 'Iran, Islamic Republic of' },
    { key: 'IS', label: 'Iceland' },
    { key: 'IT', label: 'Italy' },
    { key: 'JE', label: 'Jersey' },
    { key: 'JM', label: 'Jamaica' },
    { key: 'JO', label: 'Jordan' },
    { key: 'JP', label: 'Japan' },
    { key: 'KE', label: 'Kenya' },
    { key: 'KG', label: 'Kyrgyzstan' },
    { key: 'KH', label: 'Cambodia' },
    { key: 'KI', label: 'Kiribati' },
    { key: 'KM', label: 'Comoros' },
    { key: 'KN', label: 'Saint Kitts and Nevis' },
    { key: 'KP', label: 'Korea, Democratic People\'s Republic of' },
    { key: 'KR', label: 'Korea, Republic of' },
    { key: 'KW', label: 'Kuwait' },
    { key: 'KY', label: 'Cayman Islands' },
    { key: 'KZ', label: 'Kazakhstan' },
    { key: 'LA', label: 'Lao People\'s Democratic Republic' },
    { key: 'LB', label: 'Lebanon' },
    { key: 'LC', label: 'Saint Lucia' },
    { key: 'LI', label: 'Liechtenstein' },
    { key: 'LK', label: 'Sri Lanka' },
    { key: 'LR', label: 'Liberia' },
    { key: 'LS', label: 'Lesotho' },
    { key: 'LT', label: 'Lithuania' },
    { key: 'LU', label: 'Luxembourg' },
    { key: 'LV', label: 'Latvia' },
    { key: 'LY', label: 'Libyan Arab Jamahiriya' },
    { key: 'MA', label: 'Morocco' },
    { key: 'MC', label: 'Monaco' },
    { key: 'MD', label: 'Moldova, Republic of' },
    { key: 'ME', label: 'Montenegro' },
    { key: 'MF', label: 'Saint Martin' },
    { key: 'MG', label: 'Madagascar' },
    { key: 'MH', label: 'Marshall Islands' },
    { key: 'MK', label: 'Macedonia' },
    { key: 'ML', label: 'Mali' },
    { key: 'MM', label: 'Myanmar' },
    { key: 'MN', label: 'Mongolia' },
    { key: 'MO', label: 'Macao' },
    { key: 'MP', label: 'Northern Mariana Islands' },
    { key: 'MQ', label: 'Martinique' },
    { key: 'MR', label: 'Mauritania' },
    { key: 'MS', label: 'Montserrat' },
    { key: 'MT', label: 'Malta' },
    { key: 'MU', label: 'Mauritius' },
    { key: 'MV', label: 'Maldives' },
    { key: 'MW', label: 'Malawi' },
    { key: 'MX', label: 'Mexico' },
    { key: 'MY', label: 'Malaysia' },
    { key: 'MZ', label: 'Mozambique' },
    { key: 'NA', label: 'Namibia' },
    { key: 'NC', label: 'New Caledonia' },
    { key: 'NE', label: 'Niger' },
    { key: 'NF', label: 'Norfolk Island' },
    { key: 'NG', label: 'Nigeria' },
    { key: 'NI', label: 'Nicaragua' },
    { key: 'NL', label: 'Netherlands' },
    { key: 'NO', label: 'Norway' },
    { key: 'NP', label: 'Nepal' },
    { key: 'NR', label: 'Nauru' },
    { key: 'NU', label: 'Niue' },
    { key: 'NZ', label: 'New Zealand' },
    { key: 'OM', label: 'Oman' },
    { key: 'PA', label: 'Panama' },
    { key: 'PE', label: 'Peru' },
    { key: 'PF', label: 'French Polynesia' },
    { key: 'PG', label: 'Papua New Guinea' },
    { key: 'PH', label: 'Philippines' },
    { key: 'PK', label: 'Pakistan' },
    { key: 'PL', label: 'Poland' },
    { key: 'PM', label: 'Saint Pierre and Miquelon' },
    { key: 'PN', label: 'Pitcairn' },
    { key: 'PR', label: 'Puerto Rico' },
    { key: 'PS', label: 'Palestinian Territory' },
    { key: 'PT', label: 'Portugal' },
    { key: 'PW', label: 'Palau' },
    { key: 'PY', label: 'Paraguay' },
    { key: 'QA', label: 'Qatar' },
    { key: 'RE', label: 'Reunion' },
    { key: 'RO', label: 'Romania' },
    { key: 'RS', label: 'Serbia' },
    { key: 'RU', label: 'Russian Federation' },
    { key: 'RW', label: 'Rwanda' },
    { key: 'SA', label: 'Saudi Arabia' },
    { key: 'SB', label: 'Solomon Islands' },
    { key: 'SC', label: 'Seychelles' },
    { key: 'SD', label: 'Sudan' },
    { key: 'SE', label: 'Sweden' },
    { key: 'SG', label: 'Singapore' },
    { key: 'SH', label: 'Saint Helena' },
    { key: 'SI', label: 'Slovenia' },
    { key: 'SJ', label: 'Svalbard and Jan Mayen' },
    { key: 'SK', label: 'Slovakia' },
    { key: 'SL', label: 'Sierra Leone' },
    { key: 'SM', label: 'San Marino' },
    { key: 'SN', label: 'Senegal' },
    { key: 'SO', label: 'Somalia' },
    { key: 'SR', label: 'Suriname' },
    { key: 'SS', label: 'South Sudan' },
    { key: 'ST', label: 'Sao Tome and Principe' },
    { key: 'SV', label: 'El Salvador' },
    { key: 'SX', label: 'Sint Maarten' },
    { key: 'SY', label: 'Syrian Arab Republic' },
    { key: 'SZ', label: 'Swaziland' },
    { key: 'TC', label: 'Turks and Caicos Islands' },
    { key: 'TD', label: 'Chad' },
    { key: 'TF', label: 'French Southern Territories' },
    { key: 'TG', label: 'Togo' },
    { key: 'TH', label: 'Thailand' },
    { key: 'TJ', label: 'Tajikistan' },
    { key: 'TK', label: 'Tokelau' },
    { key: 'TL', label: 'Timor-Leste' },
    { key: 'TM', label: 'Turkmenistan' },
    { key: 'TN', label: 'Tunisia' },
    { key: 'TO', label: 'Tonga' },
    { key: 'TR', label: 'Turkey' },
    { key: 'TT', label: 'Trinidad and Tobago' },
    { key: 'TV', label: 'Tuvalu' },
    { key: 'TW', label: 'Taiwan' },
    { key: 'TZ', label: 'Tanzania, United Republic of' },
    { key: 'UA', label: 'Ukraine' },
    { key: 'UG', label: 'Uganda' },
    { key: 'UM', label: 'United States Minor Outlying Islands' },
    { key: 'US', label: 'United States' },
    { key: 'UY', label: 'Uruguay' },
    { key: 'UZ', label: 'Uzbekistan' },
    { key: 'VA', label: 'Holy See (Vatican City State)' },
    { key: 'VC', label: 'Saint Vincent and the Grenadines' },
    { key: 'VE', label: 'Venezuela' },
    { key: 'VG', label: 'Virgin Islands, British' },
    { key: 'VI', label: 'Virgin Islands, U.S.' },
    { key: 'VN', label: 'Vietnam' },
    { key: 'VU', label: 'Vanuatu' },
    { key: 'WF', label: 'Wallis and Futuna' },
    { key: 'WS', label: 'Samoa' },
    { key: 'YE', label: 'Yemen' },
    { key: 'YT', label: 'Mayotte' },
    { key: 'ZA', label: 'South Africa' },
    { key: 'ZM', label: 'Zambia' },
    { key: 'ZW', label: 'Zimbabwe' },

];

const lineData = [
    { key: 'dx', label: '电信' },
];
const recordValue = [{
    key: '1',
    geoip: 'John Brown',
    line: '',
    weight: 3,
    value: 'xx',
}, {
    key: '2',
    geoip: 'John Brown',
    line: '',
    weight: 3,
    value: 'xx',
}, {
    key: '3',
    geoip: 'John Brown',
    line: '',
    weight: 3,
    value: 'xx',
}];

Array.prototype.sortBy = function (p) {
    return this.slice(0).sort(function (a, b) {
        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
};
let lastIndex = 0;
const updateIndex = () => {
    return lastIndex++;
};

export default Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        state = {
            pluginValue: [],
            recordValue: [],
            nameValue:'',
            defRecordColumns: [{
                title: 'GeoIP',
                sort: 1,
                dataIndex: 'geoip',
                key: 'geoip',
                render: (text, record) => {
                    return (
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={this.onChangeGeoIP(record.key)}
                        >
                            {geoipData.map(geoip => <Option key={geoip.key}>{geoip.label}</Option>)}

                        </Select>
                    );
                },

            }, {
                title: '智能线路',
                sort: 2,
                dataIndex: 'line',
                key: 'line',
                render: (text, record) => {
                    return (
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={this.onChangeLine(record.key)}
                        >
                            {lineData.map(line => <Option key={line.key}>{line.label}</Option>)}

                        </Select>
                    );
                },
            }, {
                title: '权重',
                sort: 3,
                key: 'weight',
                dataIndex: 'weight',
                render: (weight, record) => <InputNumber min={1} max={100} style={{ width: 70 }} onChange={this.onChangeWeight(record.key)} />,
            }],
            recordColumns: [{
                title: '值',
                key: 'value',
                sort: 4,
                dataIndex: 'value',
                render: (value, record) => <Input name="value" onChange={this.onChangeInput(record.key)} />,
            }, {
                title: title => <Button onClick={this.handleAddRow}><Icon type="plus" />添加</Button>,
                key: 'action',
                sort: 5,
                dataIndex: 'action',
                render: (text, record) => (
                    this.state.recordValue.length >= 1
                        ? (
                            <Popconfirm title="确定删除？" okText="确定" cancelText="取消" onConfirm={() => this.handleDelete(record.key)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        ) : null
                ),
            }],
        };
        handleAddRow = () => {
            const item = {
                key: `${updateIndex()}`,
                geoip: '',
                line: '',
                weight: 0,
                value: '',
            };
            this.setState({
                recordValue: [...this.state.recordValue, item],
            });
        }
        handleDelete = (key) => {
            const dataSource = [...this.state.recordValue];
            this.setState({ recordValue: dataSource.filter(item => item.key !== key) });
        }
        onChangeInput = key => e => {
            const { name, value } = e.target;
            const recordValue = [...this.state.recordValue];
            //得到索引
            let idx = recordValue.findIndex(item => item.key == key);
            recordValue[idx][name] = value;
            this.setState({
                recordValue,
            });
        }
        onChangeName = e => {
            const { value } = e.target;
            this.setState({
                nameValue: value,
            });
        }
        onChangeWeight = key => value => {
            const recordValue = [...this.state.recordValue];
            //得到索引
            let idx = recordValue.findIndex(item => item.key == key);
            recordValue[idx].weight = value;
            this.setState({
                recordValue,
            });
        }
        onChangeGeoIP = key => value => {
            const recordValue = [...this.state.recordValue];
            let idx = recordValue.findIndex(item => item.key == key);
            recordValue[idx].geoip = value;
            this.setState({
                recordValue,
            });
            console.log(recordValue);
        }
        onChangeLine = key => value => {
            const recordValue = [...this.state.recordValue];
            let idx = recordValue.findIndex(item => item.key == key);
            recordValue[idx].line = value;
            this.setState({
                recordValue,
            });
            console.log(recordValue);
        }
        onPluginChange = (checkedValues) => {
            this.setState({
                pluginValue: checkedValues,
            });
            let recordColumns = [{
                title: '值',
                sort: 4,
                key: 'value',
                dataIndex: 'value',
                render: (value, record) => <Input name="value" onChange={this.onChangeInput(record.key)} />,
            }, {
                title: title => <Button onClick={this.handleAddRow}><Icon type="plus" />添加</Button>,
                key: 'action',
                sort: 5,
                dataIndex: 'action',
                render: (text, record) => (
                    this.state.recordValue.length >= 1
                        ? (
                            <Popconfirm title="确定删除？" okText="确定" cancelText="取消" onConfirm={() => this.handleDelete(record.key)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        ) : null
                ),
            }];

            this.state.defRecordColumns.forEach((r, index) => {
                checkedValues.forEach(rs => {
                    if (r.key == rs) {

                        recordColumns.unshift(r);
                    }
                });
            });
            this.setState({
                recordColumns: recordColumns.sortBy('sort'),
            });
            console.log(checkedValues);
        }
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const { getFieldDecorator } = form;

            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            };
            return (
                <Modal
                    width={900}
                    visible={visible}
                    title="Create a new collection"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form>
                        {getFieldDecorator('id')(
                            <Input type='hidden' />
                        )}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    {...formItemLayout}
                                    label="记录类型">
                                    {getFieldDecorator('type', {
                                        initialValue: 'A',
                                    })(
                                        <Select
                                        >
                                            <Option value="A">A<span className="selectdesc">-将域名指向一个IPV4地址</span></Option>
                                            <Option value="CNAME">CNAME<span className="selectdesc">-将域名指向另外一个域名</span></Option>
                                            <Option value="AAAA">AAAA<span className="selectdesc">-将域名指向一个IPV6地址</span></Option>
                                            <Option value="NS">NS<span className="selectdesc">-将子域名指定其他DNS服务器解析</span></Option>
                                            <Option value="MX">MX<span className="selectdesc">-将域名指向邮件服务器地址</span></Option>
                                            <Option value="SRV">SRV<span className="selectdesc">-记录提供特定的服务的服务器</span></Option>
                                            <Option value="TXT">TXT<span className="selectdesc">-文本长度限制512，通常做SPF记录（反垃圾邮件）</span></Option>
                                            <Option value="CAA">CAA<span className="selectdesc">-CA证书颁发机构授权校验</span></Option>
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label={(
                                        <span>主机记录&nbsp;
                                            <Popover
                                                content={(
                                                    <div className="ant-popover-inner-content">
                                                        <div>主机记录就是域名前缀，常见用法有：</div>
                                                        <div><strong>www：</strong><span>解析后的域名为www.aliyun.com。</span></div>
                                                        <div><strong>@：</strong><span>直接解析主域名 aliyun.com。</span></div>
                                                        <div><strong>*：</strong><span>泛解析，匹配其他所有域名 *.aliyun.com。</span></div>
                                                        <div><strong>mail：</strong><span>将域名解析为mail.aliyun.com，通常用于解析邮箱服务器。</span></div>
                                                        <div><strong>二级域名：</strong><span>如：abc.aliyun.com，填写abc。</span></div>
                                                        <div><strong>手机网站：</strong><span>如：m.aliyun.com，填写m。</span></div>
                                                        <div><strong>显性URL：</strong><span>不支持泛解析（泛解析：将所有子域名解析到同一地址）</span></div>
                                                    </div>
                                                )}>
                                                <Icon type="question-circle-o" />
                                            </Popover>
                                        </span>
                                    )}>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: false, placeholder: 'Please input the title of collection!' }],
                                    })(
                                        <Input onChange={this.onChangeName} addonAfter=".test.com" />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="插件选择"
                                >
                                    {getFieldDecorator('pluginType', {
                                        //initialValue: [''],
                                    })(
                                        <CheckboxGroup options={pluginOptions} onChange={this.onPluginChange} />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Table
                                        pagination={false}
                                        columns={this.state.recordColumns}
                                        dataSource={this.state.recordValue} />
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>
                </Modal >
            );
        }
    }
);