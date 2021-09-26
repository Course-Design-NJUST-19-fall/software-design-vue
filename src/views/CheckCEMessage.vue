<template>
  <div>
    <el-container style="height: 600px;">

      <el-header style="background-color: #DCDFE6" >
        <el-menu style="background-color: Transparent"  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
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
      <div >
        <br>
        <p class="word-v-middle" style="font-size: xx-large;">用户：{{this.$store.state.userId}}</p>
        <br>
        <p class="word-v-middle" style="font-size: xx-large;">题目编号：{{problemId}}</p>
        <br>
      </div>
      <el-main style="overflow: hidden">
        <h3 style="font-family: '楷体'; font-size: 25px;">错误信息：</h3>
        <div v-text="testRecord.compilationErrorMessage"style="font-family: '楷体'; font-size: 20px;"></div>
      </el-main>
    </el-container>
    <el-row>
       <div style="width:100%;display: inline-block;text-align: center;" ><el-button type="primary" round @click="goBack()" >返回</el-button></div>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckCEMessage",
  data() {
    return {
      testRecord:null
    }
  },
  methods:{
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
          console.log(resp)
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goBack(){
      const url=this.$route.query.url;
      this.$router.push(url);
    }

  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    const _this=this;
    this.fromPage=this.$route.query.currentPage;
    this.problemId=this.$route.query.id;
    axios.get('http://121.37.137.154:8181//testRecord/findById/'+this.$route.query.id).then(function (resp){
      _this.testRecord=resp.data;
      console.log(resp.data);
    })


  }
}
</script>

<style scoped>
.word-v-middle{
  margin-bottom: 0;
  font-size: 10px;
  min-height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  margin-top: 5px;
  color: black;
  white-space: normal;
  font-family: "楷体", "楷体_GB2312";
}
</style>