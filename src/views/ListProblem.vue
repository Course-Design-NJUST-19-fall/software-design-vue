<template>
  <div>
    <el-container style="border: 1px solid #eee">

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

       <el-header style="background-color: #DCDFE6; height: 60px;">
       <el-menu style="background-color: Transparent" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
         <el-menu-item style="color: #333333" index="1"><el-link  @click="goHref('/Main')" >主页</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
       </el-menu>
       <div class="line"></div>
     </el-header>
<!--      <el-row>-->
<!--        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>-->
<!--        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>-->
<!--        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>-->
<!--        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>-->
<!--        <el-col :span="6"><div class="grid-content bg-purple-light">-->
<!--          <el-input v-model="input" placeholder="请输入题号"></el-input></div></el-col><el-button type="primary" icon="el-icon-search">搜索</el-button>-->
<!--      </el-row>-->
        <el-table :data="tableData" style="text-align: center;font-size: 15px;">
          <el-table-column
              fixed
              align="center"
              prop="id"
              label="编号">
            <template slot-scope="scope">
              <div>
                <a href="javascript:;" @click="goProblem(scope.row)">{{scope.row.id}}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              prop="problemName"
              label="题目">
            <template slot-scope="scope">
              <div>
                <a href="javascript:;" @click="goProblem(scope.row)">{{scope.row.problemName}}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="rate" label="题目难度">
            <template slot-scope="scope">
              <span v-if="scope.row.rating === 1">简单</span>
              <span v-if="scope.row.rating === 2">较简单</span>
              <span v-if="scope.row.rating === 3">一般</span>
              <span v-if="scope.row.rating === 4">较困难</span>
              <span v-if="scope.row.rating === 5">困难</span>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              prop="acRate"
              label="通过率（通过数/提交数）"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.submitNumber === 0">0%(0/0)</span>
              <span v-if="scope.row.submitNumber > 0">
                {{numFilter(100*scope.row.acceptNumber/scope.row.submitNumber)}}%({{scope.row.acceptNumber}}/{{scope.row.submitNumber}})
              </span>
            </template>
          </el-table-column>
          <el-table-column
              v-if="false"
              align="center"
              prop="acceptNumber"
              label="通过数量"
          >
          </el-table-column>
          <el-table-column
              v-if="false"
              align="center"
              prop="submitNumber"
              label="提交数量"
          >
          </el-table-column>
          <el-table-column
              v-if="false"
              align="center"
              prop="rating"
              label="题目难度"
          >
          </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            page-size="10"
            :total="total"
            @current-change="page"
        >
        </el-pagination>
     </el-container>
  </div>
</template>

<script>
const axios = require('axios');
export default {

  name: "ListProblem",
  data() {
    return {
      tableData:null,
      activeIndex: '2',
      total:null
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
    goProblem(row){
      this.$router.push({
        path:'/ShowProblem',
        query:{
          id:row.id,
          currentPage:this.currentPage
        }
      })
    },
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(1);
      return realVal;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    page(CurrentPage){
      const _this=this;
      axios.get('http://localhost:8181//problem/findAll/'+CurrentPage+'/10').then(function (resp){
            _this.tableData=resp.data.records
            _this.total=resp.data.total
            console.log(_this.tableData)
          }
      )
    }
  },
  created(){
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    const _this=this;
    let CurrentPage= this.$route.query.currentPage;
    if(CurrentPage==null)CurrentPage=1;
    axios.get('http://localhost:8181//problem/findAll/'+CurrentPage+'/10').then(function (resp){
          _this.tableData=resp.data.records
          _this.total=resp.data.total
          console.log(_this.tableData)
        }
    )
  }

}
</script>

<style>
.el-header{
  background: white;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  align-self: center;
  margin: 0;
}

.el-menu-demo{
  background: #475669;
  color: white;
}



.el-footer{
  position:absolute;
  color:#fff;
  bottom: 100px;
  width:100%;
  height:100px;
  line-height:10px;
  text-align:center;
  background-color: white;
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

