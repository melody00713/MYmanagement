<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <Row>
          <Col span="12">
          <img class="layout-header-logo" src="../assets/images/logo.png" alt="">
          <span class="layout-header-copname">EASTED</span>
          <span class="layout-header-proname">云桌面</span>
          <Menu mode="horizontal" :active-name="`/${$route.path.split('/')[1]}`">
            <MenuItem name="/dashboard">
              <router-link to="/dashboard">首页</router-link>
            </MenuItem>
            <MenuItem name="/terminal">
              <router-link to="/terminal">终端</router-link>
            </MenuItem>
            <MenuItem name="/desktop">
              <router-link to="/desktop">桌面</router-link>
            </MenuItem>
            <MenuItem name="/log">
              <router-link to="/log">日志</router-link>
            </MenuItem>
          </Menu>
          </Col>
          <Col span="12" style="text-align: right">
          <Dropdown placement="bottom-end" @on-click="logoutHandler">
            <a href="javascript:void(0)">
              <img class="layout-header-avatar" src="../assets/images/avatar.png" alt="">
              {{username}}
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content>
        <transition>
          <keep-alive :include="['Terminal', 'Desktop', 'Log', 'Dashboard']">
            <router-view ref="container"/>
          </keep-alive>
        </transition>
      </Content>
    </Layout>
  </div>
</template>

<script>
import API from '../api/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: localStorage.user
    }
  },
  methods: {
    logoutHandler() {
      API.Logout().then(res => {
        this.$router.push('/login')
      })
    }
  },
  mounted() {
    this.$nextTick(_ => {
      var time = null
      if (!time) {
        time = setInterval(() => {
          if (this.$refs.container) {
            this.$refs.container.getDataHandler(true)
          }
        }, 10000)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  html, body, .ivu-layout {overflow: hidden}
  .ivu-layout {
    height: 100vh;
    background: #F5F7FA;
  }
  .layout-header {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.20);
    color: #FFFFFF;
    line-height: 50px;
    .ivu-menu-horizontal {
      display: inline-block;
      vertical-align: top;
      height: 50px;
      line-height: 50px;
      background: #172A35;
      margin-left: 60px;
      a {
        color: #fff;
        display: inline-block;
        height: 100%;
        padding: 0 20px;
      }
    }
    .ivu-menu-horizontal.ivu-menu-light:after {
      background: #172A35;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
      color: #ffffff;
      padding: 0;
    }
    .layout-header-copname {
      font-size: 18px;
      color: #DFE6EB;
    }
    .layout-header-proname {
      font-size: 18px;
      color: #FFFFFF;
      padding-left: 5px;
    }
    .layout-header-logo {
      margin-right: 12px;
    }
    .layout-header-avatar {
      margin-right: 5px;
    }
    .layout-header-logo, .layout-header-proname, .layout-header-copname, .layout-header-avatar {
      vertical-align: middle;
    }
    .ivu-dropdown a {
      color: #DFE6EB;
    }
    .ivu-dropdown .ivu-icon.ivu-icon-arrow-down-b {
      margin-left: 10px;
    }
    .ivu-dropdown-menu {
      text-align: center;
    }
  }
  .ivu-layout-content {
    position: relative;
    & > div {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
    }
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    border-bottom: 3px solid #3D70B2;
  }
</style>
