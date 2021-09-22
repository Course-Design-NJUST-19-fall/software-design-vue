<template>
  <div>
    <el-container style="height: 1000px; border: 1px solid #eee">

      <el-header style="font-size: 30px">610B Online Judge</el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item label="用户类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择用户类型">
              <el-option label="我是学生" value="student"></el-option>
              <el-option label="我是老师" value="teacher"></el-option>
              <el-option label="我是管理员" value="administrator"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button  v-on:click="gotoSignup">注册账号</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button  v-on:click="gotoFindMyself">忘记密码</el-button>
          </el-form-item>

        </el-form>
      </el-main>
    </el-container>



  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: '',
        password: '',
        sex: true,
        birthday: '',
        phonenumber:'',
        type: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],

        phonenumber: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 14, message: '长度在 8 到 14 个字符', trigger: 'blur' }
        ],

        birthday: [
          { type: 'date', required: true, message: '请选择生日', trigger: 'change' }
        ],

        sex: [
          { required: true, message: '请选性别', trigger: 'change' }
        ],

        type: [
          { required: true, message: '请选用户类型', trigger: 'change' }
        ],

      }
    };
  },

  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.$router.push('/ListProblem')
    },

    gotoSignup:function(event){
      this.$router.push('/Signup')
    },
    gotoFindMyself:function(event){
      this.$router.push('/FindMyself')
    }

  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
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