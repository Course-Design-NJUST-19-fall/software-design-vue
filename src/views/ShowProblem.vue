<template>
  <div>
<el-container>
  <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><el-link href="\Main" >主页</el-link></el-menu-item>
      <el-menu-item index="2"><el-link href="\ListProblem" >题目列表</el-link></el-menu-item>
      <el-menu-item index="3" ><el-link href="\ProblemStatus" >提交状态</el-link></el-menu-item>
      <el-menu-item index="4" ><el-link href="\SelfCenter" >个人中心</el-link></el-menu-item>
      <el-menu-item index="5" ><el-link type="success" href="\ShowProblem" >题目详情</el-link></el-menu-item>
      <el-menu-item index="6" ><el-link type="success" href="\Submit" >提交代码</el-link></el-menu-item>
    </el-menu>
    <div class="line"></div>
  </el-header>

      <el-container>
        <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1','2', '3','4','5','6']">
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

      <el-container>

        <el-main>
          <h2>题目:</h2>
          <div>
            这里写题目内容
          </div>
          <h2>题目背景</h2>
          <div>
            这里写题目背景
          </div>

          <h2>题目描述</h2>
          <div>
            这里写题目描述：
          </div>

          <h2>输入输出格式</h2>

          <h3>输入格式</h3>
          <br/>

          <div>
            这里写输入格式
          </div>

          <h3>输出格式</h3>
          <br/>

          <div>
            这里写输出格式
          </div>

          <h2>输入输出样例</h2>
          <h3>输入样例 #1</h3>

          <pre>
    <code>
    这里写输入样例
     </code>
  </pre>

          <h3>输出样例 #1</h3>
          <pre>
    <code>
    这里写输出样例
    </code>
  </pre>

          <h2>说明</h2>

          <div>
            这边写说明
          </div>

        </el-main>
      </el-container>

      </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
  name: "ShowProblem",
  data() {
    return {
      activeIndex: '5',
      activeIndex2: '5'
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>

<style scoped>
.el-header{
  background: white;
}
</style>