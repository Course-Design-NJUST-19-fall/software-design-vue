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
    <el-container>
      <el-main>
    <el-descriptions title="个人信息" direction="vertical" :column="2" border>
      <el-descriptions-item label="用户名">{{ account.id }}</el-descriptions-item><br>
      <el-descriptions-item label="昵称">{{ account.nicoName }}</el-descriptions-item><br>
      <el-descriptions-item label="密码">{{ account.password }}</el-descriptions-item><br>
      <el-descriptions-item label="用户类型" >{{ account.sort }}</el-descriptions-item><br>
      <el-descriptions-item label="手机号">{{ account.phoneNumber }}</el-descriptions-item><br>
      <el-descriptions-item label="通过数量" >{{ account.acceptNumber }}</el-descriptions-item><br>
      <el-descriptions-item label="提交数量" >{{ account.submitNumber }}</el-descriptions-item><br>
      <el-descriptions-item label="正确率" >{{getAcRate() }}</el-descriptions-item><br>
      <el-descriptions-item label="积分">{{ account.rating }}</el-descriptions-item><br>
    </el-descriptions>
        <el-form :model="account" :rules="rules" ref="ruleForm" label-width="100px" align="center" class="demo-ruleForm">
          <el-form-item>
          <el-button type="primary" @click="goBack()" size="small" >返回</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckAccount",
  data() {
    return {
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
  methods:{
    goBack(){
      this.$router.push(this.$route.query.url);
    },
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(1);
      return realVal;
    },
    getAcRate(){
      if(this.account.submitNumber===0)return '0.0%';
      else return this.numFilter(100*this.account.acceptNumber/this.account.submitNumber)+'%';
    },
  },
  created() {
      const _this = this;
      axios.get('http://121.37.137.154:8181//account/findById/'+_this.$route.query.id).then(function (resp){
        _this.account=resp.data;
        console.log(resp.data)
      })
    }
}
</script>

<style scoped>
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