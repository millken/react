import { Button, Row, Col, Icon, Card, Tooltip, Checkbox, Form, Select, Input, Radio } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { message } from 'antd';

import Breadcrumb from '../../components/Breadcrumb';

import { addProduct } from '~/api/service';

import '~/style/custom.css';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class FormEdit extends React.Component {
    state = {
        data: [],
        loading: false,
        typeValue: 1,
        editorState: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                addProduct(values).then(res => {
                    if (!res.success) {
                        message.error(res.message);
                    } else {
                        message.info(res.message);
                    }
                });
            } else {
                message.error(err);
            }
        });
    }
    onTypeChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            typeValue: e.target.value,
        });
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }
    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
        this.props.form.setFieldsValue({
            'content': draftToHtml(editorContent),
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { editorContent, editorState } = this.state;
        const editorStyle = {
            border: '1px solid black',
            padding: '5px',
            borderRadius: '2px',
            height: '300px',
            width: '100%',
        };

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        const typeOptions = [
            { label: '文章', value: 1 },
            { label: '模板', value: 2 },
        ];
        return (
            <div>
                <Breadcrumb first="产品" second="添加产品" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                                产品类型&nbsp;
                                                <Tooltip title="会调出不同界面">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>
                                        )}
                                    >
                                        {getFieldDecorator('type', {
                                            rules: [{
                                                required: true, message: '请选择产品类型',
                                            }],
                                        })(
                                            <RadioGroup onChange={this.onTypeChange} options={typeOptions} />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="标题"
                                    >
                                        {getFieldDecorator('title', {
                                            rules: [{
                                                required: true, message: '请输入标题',
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="正文"
                                    >
                                        {getFieldDecorator('content', {
                                            rules: [{
                                                required: true, message: '请输入正文',
                                            }],
                                        })(
                                            <Editor
                                                editorState={editorState}
                                                toolbarClassName="home-toolbar"
                                                wrapperClassName="home-wrapper"
                                                editorClassName="home-editor"
                                                onEditorStateChange={this.onEditorStateChange}
                                                toolbar={{
                                                    history: { inDropdown: true },
                                                    inline: { inDropdown: false },
                                                    list: { inDropdown: true },
                                                    textAlign: { inDropdown: true },
                                                    image: { uploadCallback: this.imageUploadCallBack },
                                                }}
                                                editorStyle={editorStyle}
                                                onContentStateChange={this.onEditorChange}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" size="large">提交</Button><Button htmlType="submit" size="large">返回</Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(FormEdit);