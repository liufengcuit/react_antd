import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu, Icon, Dropdown } from 'antd';
import routeMenu from '../menu/index';

import './main.scss';


const { SubMenu } = Menu;

/**openKey */
const rootSubmenuKeys = routeMenu.map(item=>item.key);
const openKey = rootSubmenuKeys[0];
console.log(routeMenu[0].children[0].index)

const defaultSelectedKeys = [routeMenu[0].children[0].index];

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [openKey],
            collapsed: false
        };
    }

    /**菜单只展开一项 */
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    
    /**渲染二级目录 */
    renderSecondContent(content = []) {
        return content.map(item=>{
            return <Menu.Item key={item.index}>
                <Link to={item.index}>{ item.name }</Link>
            </Menu.Item>
        })
    };

    /**菜单栏的隐藏于显示 */
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    /**退出系统 */
    loginOut() {
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="main-container">
                <div className="left-menu">
                    <div className="left-menu-top">LOGO</div>
                    <div className="left-menu-bottom">
                        <Menu
                            defaultSelectedKeys={defaultSelectedKeys}
                            style={{width: !this.state.collapsed ? 260: ""}}
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange}
                            mode="inline"
                            inlineCollapsed={this.state.collapsed}
                        >
                            {
                                routeMenu.map(item=>{
                                    return <SubMenu
                                        key={item.key}
                                        title={
                                            <span>
                                                <Icon type={item.icon} />
                                                <span>{ item.name }</span>
                                            </span>
                                        }
                                    >
                                        { this.renderSecondContent(item.children) }
                                    </SubMenu>
                                })
                            }
                        </Menu>
                    </div>
                </div>
                <div className="main-right-content">
                    <div className="main-right-content-header">
                        <Icon className="main-menu-fold" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed}/>
                        <div className="main-userinfo">
                        <Dropdown overlay={
                            (
                                <Menu>
                                    <Menu.Item key="0">
                                        <div onClick={this.loginOut.bind(this)}>退出系统</div>
                                    </Menu.Item>
                                </Menu>
                            )
                        } trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                            欢迎您，刘峰&nbsp;<Icon type="down" />
                            </a>
                        </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;