<template>
  <div>


    <el-container style="height: 800px; ">
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

      <el-header style="background-color: #DCDFE6">
  <el-menu style="background-color: Transparent" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
    <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
    <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
    <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
  </el-menu>
  <div class="line" ></div>
</el-header>

      <el-main style="overflow: hidden">

        <div >
          <h2 class="word-v-middle" style="font-size: xx-large;">欢迎回来！</h2>
          <br>
<!--          <div>-->
<!--            <div class="word-v-middle" style="font-size: larger">-->
<!--              距 <strong>CSP-J/S 2021 第二轮</strong> 还剩 <strong>28 天</strong><br>-->
<!--            </div>-->
<!--            <div class="word-v-middle" style="font-size: larger">-->
<!--              距 <strong>NOIP 2021</strong> 还剩 <strong>56 天</strong><br>-->
<!--            </div>-->
<!--          </div>-->
        </div>

        <el-calendar v-model="value">
        </el-calendar>
      </el-main>


    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Main",
  data() {
    return {
      tableData: Array(20).fill(item),
      activeIndex: '1',
      activeIndex2: '1',
      value: new Date()
    }
  },
  methods:{
    goHref(href){
      this.$router.push(href);
    },
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>



.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  bottom: 1px;
  width:100%;
  height:500px;
}

.el-aside {
  color: #333;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  align-self: center;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  align-self: center;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
  align-self: center;
}

.el-col{
  text-align: right;

}

.el-calendar{
  align-self: center;
  align-items: center;
  align-content: center;
margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 300px;
}

.word-v-middle{
  margin-bottom: 0;
  font-size: 12px;
  min-height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  margin-top: 5px;
  color: black;
  white-space: normal;
  font-family: "楷体", "楷体_GB2312";
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

