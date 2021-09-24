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
      <el-header style=" background-color: #DCDFE6; text-align: right; font-size: 12px;">

        <el-menu style="background-color: Transparent" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="5" > <el-link @click="goExit()" >退出账号</el-link></el-menu-item>
        </el-menu>
        <div class="line"></div>

      </el-header>
      <el-container>
        <el-main>
          <el-descriptions title="题目管理" direction="vertical" :column="2" border>
            <el-descriptions-item label="增加" ><el-link href="\AddProblem"  type="primary">新增题目</el-link></el-descriptions-item><br>
            <el-descriptions-item label="删除" >
              <el-button type="text" @click="delProblem">删除题目</el-button>
            </el-descriptions-item><br>
          </el-descriptions>

          <el-descriptions title="用户管理" direction="vertical" :column="2" border>
            <el-descriptions-item label="用户列表" ><el-link href="\UserList"  type="primary">查看所有用户</el-link></el-descriptions-item><br>
            <el-descriptions-item label="封禁用户" >
              <el-button type="text" @click="delUser">删除违规用户</el-button>
            </el-descriptions-item><br>
          </el-descriptions>

        </el-main>
      </el-container>
    </el-container>



  </div>
</template>

<script>
const axios =require('axios');

export default {
  name: "SelfCenterAdmin",
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    delProblem() {
      const _this=this;
      this.$prompt('请输入将要删除的题号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        axios.delete('http://localhost:8181//problem/deleteById/'+value).then(function (resp){
            if(resp.data){
              _this.$message({
                type: 'success',
                message: '已删除题目: ' + value
              });
            }else{
              _this.$message({
                type: 'error',
                message: '删除失败'
              });
            }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },

    delUser() {
      const _this=this;
      this.$prompt('请输入违规用户的账号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        axios.delete('http://localhost:8181//account/deleteById/'+value).then(function (resp){
          if(resp.data){
            _this.$message({
              type: 'success',
              message: '已删除违规用户: ' + value
            });
          }else{
            _this.$message({
              type: 'error',
              message: '删除失败'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
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
  background-color: #B3C0D1;
  color: #333;
  font-size: xx-large;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
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