<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
  </div>
  <!--
    1 把数据列表绑定给表格 data
    2 设计表格列
    3 给表格列绑定要渲染的数据字段
  -->
  <el-table
      class="table-list"
      :data="articles"
      style="width: 100%"
      stripe
      >
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
      >
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.comment_status ? '正常' : '关闭'}}
        </template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="操作"
      >
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.comment_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :disabled="scope.row.statusDisabled"
          @change="onStatusChange(scope.row)"
        >
        </el-switch>
      </template>
      </el-table-column>
  </el-table>
  <!--
    绑定页码
    绑定每页大小
    current-page 控制激活页码， 初始肯定是第 1 页
    page-sizes 控制可选的每页大小
    size-change 每页大小改变以后
    current-change 页码改变以后
    page-size.sync 每页大小同步分页
  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      background
    >
    </el-pagination>
</el-card>
</template>
<script>
import {
  getArticles,
  updateCommentStatus
} from '@/api/article'
export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      articles: [], // 文章数据列表
      totalCount: 0, // 总数据条数
      pageSize: 10,
      page: 1 // 当前激活的页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    handleSizeChange () {
      this.loadArticles(1)
    },
    handleCurrentChange (page) {
      // console.log(page)
      // 页码改变， 加载指定页码数据
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      // 让分页组件激活的页码和请求数据的页码保持一致
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res)
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = results
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      // 禁用开关
      article.statusDisabled = true
      // 请求提交修改
      // console.log(article)
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        // 启动开关
        article.statusDisabled = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启文章评论状态' : '关闭文章评论'
        })
        // console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.table-list {
  margin-bottom: 30px;
}
</style>
