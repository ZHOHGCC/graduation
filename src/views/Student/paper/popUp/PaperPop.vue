<template>
  <el-dialog title='提交论文'
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
        <el-input v-model="sizeForm.title"></el-input>
      </el-form-item>
      <el-form-item label="论文类型"
                    prop="type">
        <!-- <el-input v-model="sizeForm.type"></el-input> -->
        <el-select v-model="sizeForm.type"
                   placeholder="请选择">
          <el-option label="研发类"
                     value='研发类'></el-option>
          <el-option label="算法类"
                     value='算法类'></el-option>
          <el-option label="管理类"
                     value='管理类'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="论文">
        <input type="file"
               accept=".zip,.pdf,.doc,.docx"
               ref="upload"
               @change="handleChange">
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
import { sendFile } from '@/Api/common.js'
import { sendThesis, changeThesis } from '@/Api/student.js'
export default {
  name: "logfound",
  props: {
    data: Object,
  },

  data () {
    return {
      sizeForm: {
        title: '',
        type: ''
      },

      rules: {
        type: [
          { required: true, message: "不能为空！" }
        ],
        title: [
          { required: true, message: "不能为空！" }
        ],
      }

    };
  },

  methods: {
    handleChange (event) {

      let file = event.target.files[0]
      console.log(file)
      if (file) {
        let res = file.size / 1024 / 1024 < 10
        if (res) {
          this.fileList = file
        } else {
          // ---------------------
          this.$refs.upload.value = ''
          alert('请压缩文件，重新提交')
        }
      }
    },
    onSubmit (form) {


      if (!this.fileList) {
        alert('请选择文件')
        return false
      }

      this.$refs[form].validate(valid => {
        if (valid) {
          let file = this.fileList
          let formData = new FormData()
          formData.append('file', file)
          if (this.data.isFirst) {
            sendFile(formData).then((res) => {
              if (res.status == 200) {
                this.sizeForm.fileId = res.data.id
                //----------------------------------再上传任务
                sendThesis(this.sizeForm).then((res) => {
                  if (res.status == 200) {
                    this.data.show = false
                    this.$emit('getData')
                    alert('提交成功')
                  } else {
                  }
                })
              }
            })
          } else {
            sendFile(formData).then((res) => {
              if (res.status == 200) {
                this.sizeForm.fileId = res.data.id
                //----------------------------------再上传任务
                changeThesis(this.sizeForm).then((res) => {
                  if (res.status == 200) {
                    this.data.show = false
                    this.$emit('getData')
                    alert('提交成功')
                  } else {
                  }
                })
              }
            })
          }
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