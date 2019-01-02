
import { Menu, Icon, Layout, Badge, Popover } from 'antd';

import { withRouter } from 'react-router-dom';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Component extends React.Component {
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login');
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };

    render() {
        return (
            <Header className="custom-theme header" >
                <Icon
                    className="header__trigger custom-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >

                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.user.userName}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

export default withRouter(Component);