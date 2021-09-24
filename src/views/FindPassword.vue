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

          <el-form-item label="用户名" prop="id">
            <el-input v-model="account.id"readOnly></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="account.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="cpwd">
            <el-input v-model="account.cpwd" type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="goBack">返回</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

        </el-form>
      </el-main>
    </el-container>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FindPassword",
  data() {
    return {
      account: {
        id: '',
        password:'',
        cpwd:''
      },
      rules: {
        id: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新的密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
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
          }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://121.37.137.154:8181//account/updated', this.account).then(function (resp) {
            console.log(resp.data);
            if (resp.data) {
              _this.$alert(_this.account.id + '  修改成功！', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/Login')
                }
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack:function(event){
      this.$router.push({
        path:'/FindMyself',
        query:{
          id:this.account.id,
          phoneNumber:this.$route.query.phoneNumber
        }
      })
    },
  },
  created() {
    this.account.id=this.$route.query.id;
  }
}
</script>

<style scoped>


.el-header, .el-footer {
  background-color: #B3C0D1;
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