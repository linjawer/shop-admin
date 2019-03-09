<template>
  <!-- 树形的自定义插件 show-checkbox上是打开的,default-expand-all默认展开-->
  <div class="category">
      <!-- 顶部的工具栏 -->
    <el-row type="flex" justify="space-between" align="middle" class="mb20">
      <div>
        <!-- 跳转到新增商品 -->
        <el-button @click="handleCategoryAdd">新增</el-button>
      </div>
    </el-row>
    <el-row type='flex' justify='space-between' class="tree-header">
      <span>类别</span>
      <span>排序</span>
      <span>操作</span>
</el-row>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <!-- node,data是scope解构出来的一个属性 const{node,data}=scope -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
           <span>
             <el-input size='mini' v-model="data.sort_id" @blur="handleEnter(data)"/>
           </span>
        <span>
          <el-button type="text" size="mini" @click="() => edit(data)">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
// 树形控件
export default {
  // 与上边的data5对应
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        // 代表的是组件的子元素
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      }
    ];
    return {
      //把他转换成成一个严格的json格式
      data:[

      ]
    };
  },
  mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      //  获取message的信息
      let { message } = res.data;

          // 重新排序
      message = message.sort((a, b) => {
          // 如果a的category_id大于B的，那么b数据就排到a的前面
          return a.category_id - b.category_id;
      });

      //最终结果是一个数组
      let arr = [];
      //递归自己调用自己
      function loop(arr, item) {
        //最重要的是判断，item的id是否和父级的category_id相等,item是父级
        //如果相等的话就把item加入到当前分类下的children
        arr.forEach(v => {
          if (v.category_id == item.parent_id) {
            //  判断当前是否有children属性
            if (!v.children) {
              //没有的话，初始值为空
              v.children = [];
            }
            // 加入当前分类下的children
            v.children.push({
              ...item,
              id: item.category_id,
              label: item.title
            });
            return;
          }
          // 如果不符合以上条件的话，继续判断当前分类的子元素
          if (v.children) {
            loop(v.children, item);
          }
        });
      }
      //顶级分类
      message.forEach(v => {
        if (v.parent_id == 0) {
          arr.push({
            ...v,
            id: v.category_id,
            label: v.title
          });
        }else{
          // 如果不是顶级分类，通过递归函数去查找父级分类
          loop(arr, v);
        }
      });
         this.data = arr;
    });
  },
  methods: {
    edit(data) {
      console.log(data);
    },
    //修改排序回车事触发
    handleEnter(data){
      // 修改排序
      this.$axios({
       method: "POST",
       url: `/admin/category/edit/${data.category_id}`,
       data,
       //post请求要处理跨域
          withCredentials: true
      }).then(res=>{
          const { status, message } = res.data;
        if (status == 0) {
          this.$message({
            type: "success",
            message
          });
        }
      })
    },
    // 跳转到新增栏目页
    handleCategoryAdd(){
        this.$router.push("/admin/category-add");
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.category .el-input--mini .el-input__inner {
  width: 80px;
  height: 18px !important;
  line-height: 18px !important;
}
.tree-header {
  background: #fff;
  padding: 10px;
}
.tree-header span{
  color: pink;
}
</style>
