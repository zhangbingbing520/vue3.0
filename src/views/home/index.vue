<template>
  <div>
    <el-container class="my-container">
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
          default-active="1"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="line-height: 60px">
          <span class="el-icon-s-fold"></span>
          <span>江苏传智播客科技教育有限公司</span>
          <el-dropdown>
            <span class="el-dropdown-link">
               <img src="../../assets/images/avatar.jpg">
              用户名称<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
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
export default {

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
    .el-menu{
      border-right: none;
    }
  }
}
</style>
