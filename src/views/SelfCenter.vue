<template>
  <div>

    <el-container style="height: 800px;">

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

      <el-header style=" background-color: #DCDFE6; text-align: right; font-size: 12px;">

        <el-menu style="background-color: Transparent" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="6" >  <el-link  @click="goUpdate()" >修改信息</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="5" > <el-link @click="goExit()" >退出账号</el-link></el-menu-item>
        </el-menu>
        <div class="line"></div>

      </el-header>
      <el-container>
        <el-main>
          <br>
          <el-descriptions title="个人信息" direction="vertical" :column="2" border>
            <el-descriptions-item label="用户名">{{ account.id }}</el-descriptions-item><br>
            <el-descriptions-item label="昵称">{{ account.nicoName }}</el-descriptions-item><br>
            <el-descriptions-item label="用户类型" >{{ account.sort }}</el-descriptions-item><br>
            <el-descriptions-item label="手机号">{{ account.phoneNumber }}</el-descriptions-item><br>
            <el-descriptions-item label="通过数量" >{{ account.acceptNumber }}</el-descriptions-item><br>
            <el-descriptions-item label="提交数量" >{{ account.submitNumber }}</el-descriptions-item><br>
            <el-descriptions-item label="正确率" >{{getAcRate() }}</el-descriptions-item><br>
            <el-descriptions-item label="我的积分" >{{ account.rating }}</el-descriptions-item><br>
          </el-descriptions>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
const axios=require('axios')
export default {
  name: "SelfCenter",
  data() {
    return {
      activeIndex: '4',
      account: {
        id:null,
        password:null,
        nicoName:null,
        sort:null,
        phoneNumber:null,
        listenMessage:null,
        submitNumber:null,
        acceptNumber:null,
        rating:null
      }
    }
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
        axios.get('http://121.37.137.154:8181//account/findById/'+_this.$store.state.userId).then(function (resp){
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
    goHref(href){
      this.$router.push(href);
    },
    goUpdate(){
      this.$router.push({
        path:'/EditMyself',
        query:{
          account:this.account,
          url:this.$route.path
        }
      });
    },
    goExit(){
      this.$store.commit('update',['userId',null])
      sessionStorage.setItem('store',JSON.stringify(this.$store.state))
      this.$message({
        message:"退出成功!",
        type:"success"
      })
      this.$router.push('/Main')
    },
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(1);
      return realVal;
    },
    getAcRate(){
      if(this.account.submitNumber===0)return '0.0%';
      else return this.numFilter(100*this.account.acceptNumber/this.account.submitNumber)+'%';
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
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
      const _this = this;
      axios.get('http://121.37.137.154:8181//account/findById/'+_this.$store.state.userId).then(function (resp){
          _this.account=resp.data;
          console.log(resp.data)
      })
    }
  }
}
</script>

<style scoped>

.el-header {
  background-color: white;
  color: #333;
  font-size: xx-large;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
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