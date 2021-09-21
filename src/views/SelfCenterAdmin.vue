<template>
  <div>



    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-row>
          <el-col :span="14">
            <div style="font-size: 30px">
              平台管理
            </div>
          </el-col>

          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-link href="\Login" >退出账号&nbsp&nbsp</el-link>
              <el-link href="\ListProblem" >题目练习&nbsp&nbsp</el-link>
              <el-link href="\EditMyself" target="_blank">修改信息</el-link>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
          <el-menu>
            <el-submenu index="1">
              <template slot="title">青铜</template>
              <el-menu-item index="1-1">过题数<10,正确率<10%</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">白银</template>
              <el-menu-item index="2-1">10<=过题数<50,    10% < 正确率 < 20%</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">黄金</template>
              <el-menu-item index="3-1">50<=过题数<100,    20%< 正确率 < 30%</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">铂金</template>
              <el-menu-item index="4-1">100<=过题数<500,    30% < 正确率 < 40% </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">钻石</template>
              <el-menu-item index="5-1">500<=过题数<1000,    40% < 正确率 < 50% </el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">王者</template>
              <el-menu-item index="6-1">1000 < 过题数 ,    50% < 正确率 </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-main>
          <el-descriptions title="管理用户" direction="vertical" :column="2" border>
            <el-descriptions-item label="题目列表" ><el-link href="\ListProblem"  type="primary">查看题目列表</el-link></el-descriptions-item><br>
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
export default {
  name: "SelfCenterAdmin",
  methods: {

    delProblem() {
      this.$prompt('请输入将要删除的题号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '已删除题目: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },

    delUser() {
      this.$prompt('请输入违规用户的账号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '已删除违规用户的账号: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
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

</style>