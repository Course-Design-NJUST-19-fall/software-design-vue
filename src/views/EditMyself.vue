<template>
<div>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">

      <el-row>
        <el-col :span="14">
          <div style="font-size: 30px">
            <span>
            </span>
              您正在修改个人信息
          </div>
        </el-col>

        <el-col :span="10" >
          <div class="grid-content bg-purple-light">
            <el-link style="text-align: right" href="\SelfCenter" target="_blank">返回</el-link>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="ruleForm.phonenumber"></el-input>
        </el-form-item>

        <el-form-item label="生日" required>
          <el-col :span="11">
            <el-form-item prop="birthday">
              <el-date-picker type="date" placeholder="选择生日" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用户类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择用户类型">
            <el-option label="我是学生" value="student"></el-option>
            <el-option label="我是老师" value="teacher"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button v-on:click="gotoSelfCenter">返回登陆页面</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置信息</el-button>
        </el-form-item>

      </el-form>
    </el-main>
  </el-container>
</div>
</template>

<script>
export default {
  name: "EditMyself",
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    gotoSelfCenter:function(event){
      this.$router.push('/SelfCenter')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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