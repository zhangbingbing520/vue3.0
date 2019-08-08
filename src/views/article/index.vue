<template>
  <div>
    <el-card class="box-card">
      <div slot="header" >
          <MyBread>内容管理</MyBread>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio v-model="form.status" :label="null">全部</el-radio>
          <el-radio v-model="form.status" :label="0">草稿</el-radio>
          <el-radio v-model="form.status" :label="1">待审核</el-radio>
          <el-radio v-model="form.status" :label="2">审核通过</el-radio>
          <el-radio v-model="form.status" :label="3">审核失败</el-radio>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
        <div class="block">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="封面"
          >
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width: 120px;height: 80px" fit="cover">
            <!--<span style="margin-left: 10px">{{ scope.row.date }}</span>-->
            <div slot="error">
              <img src="../../assets/images/error.gif" style="width: 120px;height: 80px">
            </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
           prop="title">
        </el-table-column>
        <el-table-column label="状态"  >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
          </template>

        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="pubdate">
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="my-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="form.per_page"
        :current-page="form.page"
        @current-change="changePage"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      form: {
        status: null,
        channel_id: null,
        page: 1,
        per_page: 20,
        begin_pubdate: '',
        end_pubdate: ''
      },
      options: [],
      dataArr: [],
      tableData: [],
      total: 0

    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  },
  methods: {
    edit (id) {
      this.$router.push(`/publish/${id}`)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArticles()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeDate (dataArr) {
      if (dataArr) {
        this.form.begin_pubdate = dataArr[0]
        this.form.end_pubdate = dataArr[1]
      } else {
        this.form.begin_pubdate = null
        this.form.end_pubdate = null
      }
    },
    search () {
      this.form.page = 1
      this.getArticles()
    },
    changePage (newPage) {
      this.form.page = newPage
      this.getArticles()
    },
    async getChannels () {
      try {
        const { data: { data } } = await this.$http.get('channels')
        this.options = data.channels
      } catch (e) {
        console.log(e)
      }
    },
    async getArticles () {
      try {
        const { data: { data } } = await this.$http.get('articles', { params: this.form })
        this.tableData = data.results
        this.total = data.total_count
      } catch (e) {

      }
    }
  },
  watch: {
    'form.channel_id': function (newVal) {
      if (newVal === '') this.form.channel_id = null
    }
  }
}
</script>

<style scoped lang="less">
.el-card{
  margin-bottom: 20px;
}
  .my-pagination{
    text-align: center;
  }
</style>
