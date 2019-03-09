<template>
  <div>
    <!-- 顶部工具栏 -->
    <el-row type="flex" justify="space-between" align="middle">
      <div>
        <el-button @click="skip">新增</el-button>
        <!-- 删除的是动态参数 -->
        <el-button @click="handdelect(idsDtr)">删除</el-button>
      </div>
      <!-- 搜索框 -->
      <div>
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
          <el-button slot="append" icon="el-icon-search" @click="hangSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 表格 -->
    <!-- data用于接收表格的数据 -->
    <el-table :data="tableData" style="width: 100%;" class="mt20" @selection-change="trigger">
      <!-- 添加表格的多选框,其中的select是点击的时候触发 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="标题" width="300">
        <!-- 添加图片 -->
        <template slot-scope="scope">
          <!-- 记得要用上flex的话，必须是要加上type='flex' 用上模板的话是要加上slot-scope='scope' -->
          <el-row type='flex' align='middle'>
            <img :src="`http://localhost:8899/${scope.row.img_url}`" class="good-img" />
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="180" prop="categoryname"></el-table-column>

      <el-table-column label="价格" width="200">
        <!-- 自定义模板 slot-scope指定当前每一行的数据，scope数据是一个对象，scope.row可以获取当前对象 -->
        <template slot-scope="scope">
          <span>{{scope.row.market_price | tofixed}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- scope.row是当前一行的信息 -->
          <el-button size="mini" type="danger" @click="handdelect(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- size-change:切换页面数据显示条数的时候触发 -->
    <!-- current-change：切换页面的时候触发 -->
    <!-- current-page：代表当前页 -->
    <!-- total：数据的总条数 -->
    <div class="block mt20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      //   当前页面
      pageIndex: 1,
      //  当前显示的条数
      pageSize: 2,
      // 模糊条件
      searchValue: "",
      // 数据总条数
      totalCount: 0,
      //保存要删除的商品
      idsDtr: ""
    };
  },
  //获取数据
  mounted() {
    // 请求商品类别数据
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .get(
          `http://localhost:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
        )
        .then(res => {
          console.log(res);
          // 获取返回的数据
          const { data } = res;
          // 表格的数据
          this.tableData = data.message;
          // 修改总条数
          this.totalCount = data.totalcount;
        });
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push(`/admin/goods-edit/${row.id}`)
    },
    // 切换显示条数时候触发
    handleSizeChange(num) {
      //修改pagesize重新发送请求
      this.pageSize=num;
      this.getList();
    },
    // 切换页数触发
    handleCurrentChange(num) {
      // 把pageSize修改为当前页数
    this.pageIndex=num;
    this.getList()
    },
    //点击新增按钮跳转到新的页面
    skip() {
      //通过vue里边的router方法来跳转页面，其中的跳转的方法还有
      this.$router.push("/admin/goods-add");
    },
    //当表格选中时触发
    trigger(data) {
      // 请求url： /admin/goods/del/:ids,通过id删除

      //1.点击的时候，获取数据
      console.log(data);
      const ids = data.map(v => {
        return v.id;
      });
      console.log(ids);

      //拼接商品选中的id
      const idsDtr = ids.join(",");

      //把数据保存到data里边
      this.idsDtr = idsDtr;
    },
    //点击删除的时候传入值就能删除了
    handdelect(ids) {
      this.$axios
        .get(`http://localhost:8899/admin/goods/del/${ids}`)
        .then(res => {
          const { message, status } = res.data;
          if (status == 0) {
            //提示删除成功,在组件里边的消息框是有提示的
            this.$message({
              showClose: true,
              message: "恭喜你，删除成功",
              type: "success"
            });
            // 删除成功之后，数据要刷新
            this.getList();
          }
        });
    },
    //搜索框的定义
    hangSearch() {
      //把当前页面重置为1
      this.pageSize = 1;
      //点击搜索的时候，重新加载
      this.getList();
    }
  },
  // 过滤器
  filters: {
    tofixed: function(data) {
      return Number(data).toFixed(2);
    }
  }
};
</script>
<style scoped>
.good-img{
  width: 64px;
  height: 64px;
  display: block;
  margin-right: 10px;
  /* 保证当前的元素不会被挤压 */
  flex-shrink: 0;
}
</style>
