<template>
  <div>
    <el-container>
      <div class="background">
        <vue-particles
            color="#dedede"
            :particleOpacity="0.8"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.8"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        >
        </vue-particles>
      </div>

      <el-header style="background-color: Transparent;font-size: xx-large" >您正在找回密码</el-header>
      <el-main>
        <el-form :model="account" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户名" prop="id" >
            <el-input v-model="account.id"readOnly></el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="account.phoneNumber"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="gotoLogin">返回登陆</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">找回密码</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">重置信息</el-button>
          </el-form-item>

        </el-form>
      </el-main>
    </el-container>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FindMyself",
  data() {
    return {
      account: {
        id: '',
        phoneNumber:'',
        sort: '',
      },
      rules: {
        id: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],

        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 8, max: 14, message: '长度在 8 到 14 个字符', trigger: 'blur' }
        ],

      }
    };
  },

  methods: {
    submitForm(fromName){
      const _this = this;
      axios.get('http://121.37.137.154:8181//account/findById/'+_this.account.id).then(function (resp){
        console.log(resp);
        if(resp.data==='') {
          _this.$message({
            message:"用户不存在！，请先注册",
            type:"error"
          })
          _this.$router.push({
              path:'/Signup',
              query:{
                id:_this.account.id
              }
          })
        }
        else {
          if (_this.account.phoneNumber === resp.data.phoneNumber) {
            _this.$message({
              message:"手机号验证成功！",
              type:"success"
            })
            _this.$router.push({
              path:'/FindPassword',
              query:{
                id:_this.account.id,
                phoneNumber: _this.account.phoneNumber
              }
            })
          } else {
            _this.$message({
              message:"手机号不匹配！",
              type:"error"
            })
          }
        }
        console.log(resp.data)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    gotoLogin:function(event){
      this.$router.push('/Login')
    },
  },
  created() {
    this.account.id=this.$route.query.id;
    this.account.phoneNumber=this.$route.query.phoneNumber;
  }
}
</script>

<style scoped>


.el-header{
  background-color: Transparent;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-family: "楷体", "楷体_GB2312";
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: Transparent;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.demo-ruleForm{
  max-width: 500px;
  margin: 0 auto ;
}


.background {
  background-color: #B3C0D1;
  background-size: 100% 100%;
  left: 0;
  top: 0;
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: fixed;
  /*position: absolute;*/
}


</style>