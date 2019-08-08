<template>
  <div class="container">
    <el-card class="box-card my-card">
      <img src="../../assets/images/logo_index.png"/>
      <el-form ref="form" :model="form" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码" class="code" ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="login">登 陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {

  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号格式不对'))
      callback()
    }
    return {
      form: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const { data: { data } } = await this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.form)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('错了哦，这是个错误消息')
          }

          // .then((result) => {
          //   store.setUser(result.data.data)
          //   this.$router.push('/')
          // })
          // .catch(() => {
          //   this.$message.error('错了哦，这是一条错误消息')
          // })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .my-card{
    position: absolute;
    width: 400px;
    height: 350px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
    img{
      display: block;
      width: 150px;
      margin: 0 auto 20px;

    }
    .code{
      width: 230px;
      margin-right: 10px;
    }
    .login-button{
      width: 100%;
    }
  }
}
</style>
