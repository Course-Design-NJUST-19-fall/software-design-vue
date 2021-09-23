<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">


      <el-container >
       <el-header style="background-color: #B3C0CD; height: 60px;">
       <el-menu style="background-color: #B3C0CD" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
         <el-menu-item style="color: #333333" index="1"><el-link href="\Main" >主页</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="2"><el-link href="\ListProblem" >题目列表</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="3" ><el-link href="\ProblemStatus" >提交状态</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="4" ><el-link href="\SelfCenter" >个人中心</el-link></el-menu-item>
       </el-menu>
       <div class="line"></div>
     </el-header>
      <br>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
          <el-input v-model="input" placeholder="请输入题号"></el-input></div></el-col><el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-row>

        <el-table :data="tableData" style="text-align: center;height: 40px;">
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
          <el-table-column
              align="center"
              prop="acRate"
              label="通过率（通过数/提交数）"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.submitNumber == 0">0%(0/0)</span>
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



.el-header {
  background-color: white;
  color: #333;
  line-height: 60px;
  bottom: 1px;
  width:100%;
  height:5px;
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

</style>

