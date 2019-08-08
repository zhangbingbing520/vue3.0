<template>
  <div>
    <el-container class="my-container">
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="logo" :class="{miniLogo:isCollapse}"></div>
        <el-menu
          :default-active="$route.path"
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="line-height: 60px">
          <span class="el-icon-s-fold" @click="change" ></span>
          <span>这是zbb小窝，欢迎到来</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
               <img :src="photo">
              {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown"  >
              <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      uname: '',
      photo: ''
    }
  },
  methods: {
    change () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('./setting')
    },
    logout () {
      store.clerarUser()
      this.$router.push({ name: 'login' })
    },
    handleCommand (command) {
      this[command]()
    }
  },
  created () {
    this.name = store.getUser().name
    this.photo = store.getUser().photo
  }
}

</script>

<style scoped lang="less">
.my-container{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-header{
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold{
      font-size: 24px;
      margin-right: 10px;
      vertical-align: middle;
    }
    .el-dropdown{
      float: right;
      img{
        width: 32px;
        height: 32px;
        vertical-align: middle;
      }
    }
  }
  .el-aside{
    background-color: #002033;
    .logo{
      width: 100%;
      height: 60px;
      background: #002244 url("../../assets/images/logo_admin.png") no-repeat center /140px auto;
    }
    .miniLogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
    .el-menu{
      border-right: none;
    }
  }
}
</style>
