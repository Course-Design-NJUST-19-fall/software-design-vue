<template>
<div>
  <el-container style="height: 800px; border: 1px solid #eee">
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

    <el-header style="background-color: #DCDFE6; text-align: right; font-size: 12px">
      <el-menu style="background-color: Transparent" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')"  >题目列表</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')"  >提交状态</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="5" >  <el-link @click="goUpdate()" >修改信息</el-link></el-menu-item>
        <el-menu-item style="color: #333333" index="6" > <el-link @click="goExit()" >退出账号</el-link></el-menu-item>

      </el-menu>
      <div class="line"></div>

    </el-header>
    <el-main>
      <el-form :model="account" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="用户名" prop="id">
          <el-input v-model="account.id" readOnly></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="account.password" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="account.cpwd" ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nicoName">
          <el-input v-model="account.nicoName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="account.phoneNumber"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="gotoSelfCenter()">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button type="primary" v-on:click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </el-main>
  </el-container>
</div>
</template>

<script>
const axios=require('axios');

export default {
  name: "EditMyself",
  data() {
    return {
      url:null,
      account: {
        id: '',
        password: '',
        nicoName:'',
        cpwd:'',
        phoneNumber:'',
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

        phoneNumber: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 14, message: '长度在 8 到 14 个字符', trigger: 'blur' }
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
        ]
      },
      activeIndex: '5',
    };
  },

  methods: {
    goCenter(){
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
      }
      const _this=this;
      if(this.$store.state.userId==null){
        _this.$message({
          message:"请登录",
          type:"error"
        })
        this.$router.push('/Login');
      }
      else {
        axios.get('http://localhost:8181//account/findById/'+_this.$store.state.userId).then(function (resp){
          _this.account=resp.data;
          console.log(resp.data)
          if(_this.account.sort==='学生')
            _this.$router.push('/SelfCenter');
          else if(_this.account.sort==='老师')
            _this.$router.push('/SelfCenterTeacher');
          else if(_this.account.sort==='管理员')
            _this.$router.push('/SelfCenterAdmin');
        })
      }
    },
    gotoSelfCenter(){
      const url=this.$route.query.url;
      this.$router.push(url);
    },
    goHref(href){
      this.$router.push(href);
    },
    goUpdate(){
      this.$router.push({
        path:'/EditMyself',
        query:{
          id:this.account.id

        }
      });
    },
    goExit(){
      this.$message({
        message:'成功推出！',
        type:"success"
      })
      this.$store.commit('update',['userId',null])
      sessionStorage.setItem('store',JSON.stringify(this.$store.state))
      this.$router.push('/Main')
    },
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181//account/updated', this.account).then(function (resp) {
            console.log(resp.data);
            if (resp.data) {
              _this.$message({
                message:_this.account.id + '  修改成功！',
                type:"success"
              })
              _this.$router.push(_this.url)
            }
          })
        } else {
          return false;
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.account=this.$route.query.account;
    this.url=this.$route.path;
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

.background {
  left: 0;
  top: 0;
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: absolute;
}

</style>