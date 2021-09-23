<template>
  <div>
    <el-container style="height: 1000px; border: 1px solid #eee">

      <el-header style="font-size: 30px">610B Online Judge</el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户名" prop="id">
            <el-input v-model="ruleForm.id"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button  v-on:click="gotoSignup">注册账号</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="gotoFindMyself()">忘记密码</el-button>
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
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
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
      axios.get('http://localhost:8181//account/signIn/'+this.ruleForm.id+'/'+this.ruleForm.password).then(function (resp){
               console.log(resp.data);
               if(resp.data!=null){
                 _this.$message({
                   message:"登录成功!",
                   type:"success"
                 })
                 _this.$store.commit('update',['userId',_this.ruleForm.id])
                 sessionStorage.setItem('store',JSON.stringify(_this.$store.state))
                 if(resp.data=='学生')
                 _this.$router.push('/SelfCenter');
                 else if(resp=='老师')
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
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-family: "Arial Black";
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
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



</style>