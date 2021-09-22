<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><el-link href="\Main" >主页</el-link></el-menu-item>
        <el-menu-item index="2"><el-link href="\Login" target="_blank">题目列表</el-link></el-menu-item>
        <el-menu-item index="3" ><el-link href="\ProblemStatus" target="_blank">提交状态</el-link></el-menu-item>
        <el-menu-item index="4" ><el-link href="\SelfCenter" target="_blank">个人中心</el-link></el-menu-item>
        <el-menu-item index="6" >  <el-link href="\EditMyself" target="_blank">修改信息</el-link></el-menu-item>
        <el-menu-item index="5" > <el-link href="\Login" >退出账号</el-link></el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
    <el-container>
      <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1','2', '3','4','5','6']">
          <el-submenu index="1">
            <template slot="title">青铜</template>
            <el-menu-item index="1-1"> 过题数 < 10 , 正确率 < 10% </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">白银</template>
            <el-menu-item index="2-1">10<=过题数<50,    10% < 正确率 <20%</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">黄金</template>
            <el-menu-item index="3-1">50<=过题数<100,    20% < 正确率 <30%</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">铂金</template>
            <el-menu-item index="4-1">100<=过题数<500,    30%< 正确率 <40%</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">钻石</template>
            <el-menu-item index="5-1">500<=过题数<1000,    40%< 正确率<50%</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">王者</template>
            <el-menu-item index="6-1"> 1000<  过题数 ,    50%< 正确率 </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <el-descriptions title="个人信息" direction="vertical" :column="2" border>

          <el-descriptions-item label="用户名">kooriookami</el-descriptions-item><br>
          <el-descriptions-item label="手机号">18100000000</el-descriptions-item><br>
          <el-descriptions-item label="用户类型" >老师</el-descriptions-item><br>
          <el-descriptions-item label="过题数量" >166</el-descriptions-item><br>
          <el-descriptions-item label="过题率" >36.6%</el-descriptions-item><br>
          <el-descriptions-item label="我的段位" >铂金</el-descriptions-item><br>
        </el-descriptions>

        <br>
        <el-descriptions title="我的班级" direction="vertical" :column="2" border>
          <el-descriptions-item label="班级">919106840135</el-descriptions-item><br>
          <el-descriptions-item label="我的学生" ><el-link href="\HomeworkofStudent"  type="primary">查看学生列表</el-link></el-descriptions-item><br>
          <el-descriptions-item label="作业" > <el-button type="text" @click="open">布置作业</el-button></el-descriptions-item><br>
          <el-descriptions-item label="历史作业"><el-link href="\AllHomework"  type="primary">查看历史作业</el-link></el-descriptions-item><br>
        </el-descriptions>

      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: "SelfCenterTeacher",
  data() {
    return {
      activeIndex: '4',
      activeIndex2: '4'
    }
  },
  methods: {
    open() {
      this.$prompt('请输入作业题号', '布置作业', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你布置的作业是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
}
</script>

<style scoped>

.el-header {
  background-color: White;
  color: #333;
  font-size: xx-large;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

</style>