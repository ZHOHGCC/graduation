<template>
  <el-dialog title='title'
             :visible.sync="data.show"
             :close-on-click-modal='false'
             width="80%">
    <el-form ref="form"
             :model="sizeForm"
             :rules="rules"
             label-width="120px"
             size="mini">

      <el-form-item label="论文题目"
                    prop="title">
        <el-input v-model="sizeForm.paperName"></el-input>
      </el-form-item>
      <el-form-item label="论文类型"
                    prop="title">
        <el-input v-model="sizeForm.type"></el-input>
      </el-form-item>
      <el-form-item label="指导文件">
        <el-upload class="upload-demo"
                   ref="upload"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :file-list="fileList"
                   :limit=1
                   :on-exceed="exceed"
                   :auto-upload="false">
          <el-button slot="trigger"
                     size="small"
                     type="success">选取文件</el-button>

          <div slot="tip"
               class="el-upload__tip">只能上传一个文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
      <!--  -->

      <el-form-item size="large">
        <el-button type="primary"
                   @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="data.show=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "logfound",
  props: {
    data: Object,
  },

  data () {
    return {
      sizeForm: {
        paperName: '',
        type: ''
      },

      rules: {
        rate: [
          { required: true, message: "不能为空！" }
        ],

      }

    };
  },

  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    onSubmit (form) {
      console.log(this.sizeForm.rate)
      this.$refs[form].validate(valid => {
        if (valid) {

        }
      });
    }
  },
  computed: {
    title () {

    }
  },
};
</script>

<style  scoped>
.a {
}
</style>