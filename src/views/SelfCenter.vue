<template>
  <div>

    <el-container style="height: 800px; border: 1px solid #eee">


      <el-header style=" background-color: #B3C0CD; text-align: right; font-size: 12px;">

        <el-menu style="background-color: #B3C0CD" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
<!--        <el-aside width="400px" style="background-color: rgb(238, 241, 246)">-->
<!--          <el-menu :default-openeds="['1','2', '3','4','5','6']">-->
<!--            <el-submenu index="1">-->
<!--              <template slot="title">青铜</template>-->
<!--              <el-menu-item index="1-1">过题数<10,正确率<10%</el-menu-item>-->
<!--            </el-submenu>-->
<!--            <el-submenu index="2">-->
<!--              <template slot="title">白银</template>-->
<!--              <el-menu-item index="2-1">10<=过题数<50,    10% < 正确率 < 20%</el-menu-item>-->
<!--            </el-submenu>-->
<!--            <el-submenu index="3">-->
<!--              <template slot="title">黄金</template>-->
<!--              <el-menu-item index="3-1">50<=过题数<100,    20%< 正确率 < 30%</el-menu-item>-->
<!--            </el-submenu>-->
<!--            <el-submenu index="4">-->
<!--              <template slot="title">铂金</template>-->
<!--              <el-menu-item index="4-1">100<=过题数<500,    30% < 正确率 < 40% </el-menu-item>-->
<!--            </el-submenu>-->
<!--            <el-submenu index="5">-->
<!--              <template slot="title">钻石</template>-->
<!--              <el-menu-item index="5-1">500<=过题数<1000,    40% < 正确率 < 50% </el-menu-item>-->
<!--            </el-submenu>-->
<!--            <el-submenu index="6">-->
<!--              <template slot="title">王者</template>-->
<!--              <el-menu-item index="6-1">1000 < 过题数 ,    50% < 正确率 </el-menu-item>-->
<!--            </el-submenu>-->

<!--          </el-menu>-->
<!--        </el-aside>-->
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

          <br>
          <br>
<!--          <el-descriptions title="我的班级" direction="vertical" :column="2" border>-->
<!--            <el-descriptions-item label="班级">919106840135</el-descriptions-item><br>-->
<!--            <el-descriptions-item label="我的老师">衷宜</el-descriptions-item><br>-->
<!--            <el-descriptions-item label="最新作业" > <el-button type="text" @click="open">查看最新作业</el-button></el-descriptions-item><br>-->
<!--            <el-descriptions-item label="所有作业" ><el-link href="\AllHomework"  type="primary">查看历史作业</el-link></el-descriptions-item><br>-->
<!--          </el-descriptions>-->

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
    // open() {
    //   this.$alert('13,14,15,16', '最新布置的作业', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       this.$message({
    //         type: 'info',
    //         message: `action: ${ action }`
    //       });
    //     }
    //   });
    // },
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
      axios.get('http://localhost:8181//account/findById/'+_this.$store.state.userId).then(function (resp){
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



</style>