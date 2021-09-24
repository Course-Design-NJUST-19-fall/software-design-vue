<template>
  <div>
    <el-container style="background-color: Transparent; height: 1000px; ">


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

      <el-header style="background-color: Transparent; font-size: 30px;">
        

        <img class="mlogo" src="../assets/title.png"  alt="" >

      </el-header>
      <br>

      <el-main style="background-color: Transparent" >

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户名" prop="id">
            <el-input v-model="ruleForm.id"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="gotoSignup">注册账号</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="primary" @click="gotoFindMyself()">忘记密码</el-button>
          </el-form-item>

        </el-form>
      </el-main>
    </el-container>


  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        id:null,
        password: null,
      },
      rules: {
        id: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
      }
    };
  },

  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    submitForm(formName) {
      const _this=this;
      axios.get('http://121.37.137.154:8181//account/signIn/'+this.ruleForm.id+'/'+this.ruleForm.password).then(function (resp){
               console.log(resp.data);
               if(resp.data!==''){
                 _this.$message({
                   message:"登录成功!",
                   type:"success"
                 })
                 _this.$store.commit('update',['userId',_this.ruleForm.id])
                 sessionStorage.setItem('store',JSON.stringify(_this.$store.state))
                 if(resp.data==='学生')
                 _this.$router.push('/SelfCenter');
                 else if(resp==='老师')
                   _this.$router.push('/SelfCenterTeacher');
                 else _this.$router.push('/SelfCenterAdmin')
               }
               else {
                 _this.$message({
                   message:"账号不存在或密码错误!",
                   type:"error"
                 })
               }
          })
    },

    gotoSignup:function(event){
      this.$router.push('/Signup')
    },
    gotoFindMyself(){
      const _this=this;
      this.$router.push({
          path:'/FindMyself',
         query:{
            id:this.ruleForm.id
         }
      })
    }
  },
  created() {
    this.$store.commit('update',['userId',null])
    sessionStorage.setItem('store',JSON.stringify(this.$store.state))
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-family: "Arial Black";
}

.el-main {
  background-color: #E9EEF3;
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

.mlogo{
  height: 160%;
}
.background {
  background-color: white;
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