<template>
  <el-form ref="form" :model="form" label-width="80px">

    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择活动区域">
        <!-- 顶级渲染，是渲染第一层 -->
        <el-option-group v-for="(item,index) in opantion"
         :key="index"
          :label="item.title">
          <!-- 顶级下边的渲染，第二层渲染 -->
          <el-option
            v-for="(sub,idden) in item.group"
            :key="idden"
            :label="sub.title"
            :value="sub.category_id"
          ></el-option>
        </el-option-group>
      </el-select>
    </el-form-item>
     <!--这里的数据根据后台数据新增文章数据来渲染，里边有数据 -->
    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="是否显示">
       <el-switch v-model="form.is_slide"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
        <el-checkbox label="置顶" name="type" v-model='form.is_top'></el-checkbox>
        <el-checkbox label="热门" name="type" v-model='form.is_hot'></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <!-- 单张图片上传,记得图片请求地址是来自后台文档数据的请求地址 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="wenjianshangc"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <el-form-item label="内容描述" class>
      <quill-editor v-model="form.content"></quill-editor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
//符文本编辑器的css文件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

//引入编辑器组件
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      form: {
        category_id: "",
        status:false,
        is_top:false,
        is_hot:false,
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        zhaiyao: "",
        content: "",
        //封面图片imgList,是一个数组，通常只有一张
        // 封面图片
        imgList: [],
        //文章附件数组,可以有多个附件
        fileList:[],
        is_slide: false
      },

      // 头像图片
      imageUrl: "",
      // 图片墙的预览图片链接
      dialogImageUrl: "",
      // 是否预览图片
      dialogVisible: false,
      //把分类id的数据添加到data里边
      opantion: []
    };
  },
  // 注册组件
 components:  {
     quillEditor
  },
  methods: {
    onSubmit() {
     /* 
     新增商品
     开发者可以通过本接口实现商品数据的新增
     */
      this.$axios({
        method:'POST',
        url:'/admin/goods/add/goods',
        data:this.form,
        //处理跨域问题
        withCredentials: true,
      }).then(res=>{
        /* message和status从res.data里边解构出来 */
        const {message,status}=res.data;
        if(status==0){
          //请求成功
          this.$message({
               message:message,
               type:'success'
          });
          //给他加个定时器
          setTimeout(()=>{
            //新增完毕后,让他跳转到新增的页面
            this.$router.replace('/admin/goods-list')
          },1000)
        }
      })
    },
     //图片上传成功后的回调函数
    handleAvatarSuccess(res,file) {
        // 头像预览，把图片解析成base64字符串
        this.imageUrl=window.URL.createObjectURL(file.raw);
    
        this.form.imgList=[res];
    },

    // 多张图片上传成功后的回调函数
    wenjianshangc(res){
      this.form.fileList.push(res)  
    },
    //判断图片是否大于2M
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
       return isLt2M;
    },
    // 移除选中的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  //请求分类的数据

  /* 
  系统类别数据管理
  获取频道下的所有分类数据
  */
  mounted() {
    this.$axios({
      method: "GET",
      url: "/admin/category/getlist/goods"
    }).then(res => {
      const { message } = res.data;
      //获取了massage里边的信息
      let opantion = [];
      message.forEach(v => {
        //  console.log(v)
        //把顶级的数据打印出来
        if (v.parent_id == 0) {
          v.group = [];
          opantion.push(v);
          console.log(opantion);
        } else {
          //子类别判断
          opantion.forEach(item => {
            console.log(item);
            //如果成立的话，顶级下边就有一个子选项
            if (item.category_id == v.parent_id) {
              item.group.push(v);
            }
          });
        }
      });
      this.opantion = opantion;
      console.log(this.opantion);
    });
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

