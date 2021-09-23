<template>
<div>
  <el-container>
    <el-header style="background-color: #B3C0CD; text-align: right; font-size: 12px">
      <el-menu style="background-color: #B3C0CD" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item style="color: #333333" index="1"><el-link href="\Main" >主页</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="2"><el-link href="\ListProblem"  >题目列表</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="3" ><el-link href="\ProblemStatus"  >提交状态</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="4" ><el-link href="\SelfCenter"  >个人中心</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="5" >  <el-link href="\EditMyself" >修改信息</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="6" > <el-link href="\Login" >退出账号</el-link></el-menu-item>
      </el-menu>
      <div class="line"></div>

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

      },
      activeIndex: '5',
      activeIndex2: '5',
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