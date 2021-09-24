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
      <el-header style="background-color: Transparent;font-size: xx-large" >您正在注册账号</el-header>
      <el-main>
        <el-form :model="account" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户名" prop="id">
            <el-input v-model="account.id"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="account.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="cpwd">
            <el-input v-model="account.cpwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nicoName">
            <el-input v-model="account.nicoName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="account.phoneNumber"></el-input>
          </el-form-item>

          <el-form-item label="用户类别" prop="sort">
            <el-radio-group v-model="account.sort">
              <el-radio label="学生"></el-radio>
              <el-radio label="老师"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="gotoLogin">返回登录</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">重置信息</el-button>
          </el-form-item>

        </el-form>
      </el-main>
    </el-container>

  </div>
</template>

<script>
const axios=require('axios')
export default {
  name: "Signup" ,
  data() {
    return {
      account: {
        id: '',
        password: '',
        cpwd:'',
        nicoName: '',
        phoneNumber:'',
        sort:''
      },
      rules: {
        id: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        cpwd:[{required:true,message:'确认密码',trigger:'blur'},
          {
          validator:(rule,value,callback)=>{
            if(value===''){
              callback(new Error('请再次输入密码'))
            }else if(value!==this.account.password){
              callback(new Error('两次输入密码不一致'))
            }else{
              callback( )
            }
          },
          trigger:'blur'
        }],
        nicoName: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 14, message: '长度在 8 到 14 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请选用户类型', trigger: 'change' }
        ],

      }
    };
  },

  methods: {
    submitForm(formName) {
      const _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8181//account/save',this.account).then(function (resp){
            console.log(resp);
            if(resp.data==='SUCCESS'){
              _this.$message({
                message:_this.account.id+"  添加成功！",
                type:"success"
              })
              _this.$router.push('/Login')
            }
            else if(resp.data === "ERROR") {
              _this.$message({
                message:"添加失败！",
                type:"error"
              })
            }
            else {
              _this.$message({
                message:_this.account.id + ' 已经存在!',
                type:"warning"
              })
            }
          })
        }
        else{
          return false;
        }
      });
    },
    gotoLogin:function(event){
      this.$router.push('/Login')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-family: "楷体", "楷体_GB2312";
}


.el-main {
  background-color: transparent;
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
  left: 0;
  top: 0;
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: absolute;
}


</style>