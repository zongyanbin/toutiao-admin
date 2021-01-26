<template>
  <div class="image-container">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
    <div class="action-head">
      <el-radio-group v-model="radio1" size="mini">
      <el-radio-button
        label="全部"
        @click.native="loadImages(false)"
      ></el-radio-button>
      <el-radio-button
        label="收藏"
        @click.native="loadImages(true)"
      ></el-radio-button>
      </el-radio-group>
      <el-button
        size="mini"
        type="success"
        @click="dialogUploadVisible = true"
      >上传素材</el-button>
    </div>
    <!-- 素材列表 -->
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="(img, index) in images"
        :key="index"
      >
        <el-image
          style="height: 100px"
          :src="img.url"
          fit="cover"
        ></el-image>
      </el-col>
    </el-row>
    <!-- /素材列表 -->
  </el-card>

  <el-dialog title="上传素材"
    :visible.sync="dialogUploadVisible"
    :append-to-body="true"
  >
    helloworld
  </el-dialog>
  </div>
</template>

<script>
import {
  getImages
} from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      radio1: '全部',
      images: [], // 图片素材列表
      dialogUploadVisible: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    loadImages (collect = false) {
      getImages({
        collect: collect
      }).then(res => {
        this.images = res.data.data.results
      })
    }
  },
  created () {
    this.loadImages(false)
  },
  mounted () {}
}
</script>
<style lang="less">
.action-head {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
}
.wrapper{}
</style>
