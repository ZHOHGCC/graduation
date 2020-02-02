<template>
  <div class="index">

    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="任务名称"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="发布者"
                    prop="region">
        <el-select v-model="ruleForm.region"
                   placeholder="请选择">
          <el-option label="指导老师"
                     value="指导老师"></el-option>
          <el-option label="院级"
                     value="院级"></el-option>
          <el-option label="校级"
                     value="校级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="截至时间"
                    required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.date1"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>

      </el-form-item>

      <el-form-item label="任务简介"
                    prop="desc">
        <el-input type="textarea"
                  v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="指导文件">
        <el-upload class="upload-demo"
                   ref="upload"
                   action="https://jsonplaceholder.typicode.com/posts/"
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
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>

export default {
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写简介', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // ---------------------------文件
    exceed () {
      alert('只能上传一个，如有多个请打包后上传')
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    }
  }
}
</script>
<style  scoped>
.upload-demo {
  width: 500px;
}
.btn {
  margin-bottom: 10px;
}
.index {
  width: 100%;
  /* height: 100%; */
}
</style>