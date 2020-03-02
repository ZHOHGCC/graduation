<template>
  <div class="index">

    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="140px"
             class="demo-ruleForm">
      <el-form-item label="任务/公告 名称"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="发布类型"
                    prop="publisher">
        <el-select v-model="ruleForm.publisher"
                   placeholder="请选择">
          <el-option label="公告"
                     value=1></el-option>
          <el-option label="任务"
                     value=2></el-option>

        </el-select>
      </el-form-item>

      <el-form-item label="截至时间"
                    v-show="ruleForm.publisher==2"
                    required>
        <el-col :span="8">
          <el-form-item prop="date1">
            <!-- -------------------------  --------------- 日期··········· -->
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.date1"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line"
                :span="2">-------------</el-col>
        <!-- ---------------------------------------时间 -->
        <el-col :span="6">
          <el-form-item prop="date2">
            <el-time-select v-model="ruleForm.date2"
                            :picker-options="{
    start: '06:00',
    step: '01:00',
    end: '24:00'
  }"
                            placeholder="选择时间">
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="任务/公告 简介"
                    prop="description">
        <el-input type="textarea"
                  v-model="ruleForm.description"></el-input>
      </el-form-item>

      <el-form-item label="发布对象"
                    prop="name">
        <el-checkbox-group v-model="ruleForm.studentIds">
          <el-checkbox v-for="(i,index) in grade"
                       :key="index"
                       :label="stuId(i[0])"
                       border>{{i[0]}}级</el-checkbox>

        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="指导文件">
        <!-- <el-upload class="upload-demo"
                   action="/"
                   ref="upLoad"
                   accept=".zip,.pdf,.doc,.docx"
                   :on-change="handleChange"
                   :limit=1
                   :on-exceed="exceed"
                   :auto-upload="false">
          <el-button slot="trigger"
                     size="small"
                     type="success">选取文件</el-button>

          <div slot="tip"
               class="el-upload__tip">只能上传一个文件，且不超过10M</div>

        </el-upload> -->
        <input type="file"
               accept=".zip,.pdf,.doc,.docx"
               @change="handleChange">
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
import { getStudent, sendTask } from '@/Api/teacher.js'
import { sendFile } from '@/Api/common.js'
export default {
  data () {
    return {
      ruleForm: {
        date2: '',
        date1: '',
        name: '',
        publisher: '',
        endTime: '',
        description: '',
        studentIds: []
      },

      pageSize: 100,
      pageNum: 1,
      grade: '',
      fileList: '',
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        date1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写简介', trigger: 'blur' }
        ],

      }
    };
  },
  computed: {

  },
  created () {
    let pageSize = this.pageSize
    let pageNum = this.pageNum

    getStudent({ pageSize, pageNum }).then((res) => {
      let allData = res.data.list
      let map = new Map()
      for (let i of allData) {
        if (map.has(i.grade)) {
          map.set(i.grade, [...map.get(i.grade), i.stuId])
        } else {
          map.set(i.grade, [i.stuId])
        }
      }
      this.grade = map
    })
  },
  methods: {
    stuId (grade) {
      return this.grade.get(grade)
    },
    submitForm (formName) {
      let from = this.ruleForm
      if (from.publisher == 1) {
        from.date2 = '00:00'
        from.date1 = '2200-01-01'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          from.endTime = from.date1 + "T" + from.date2 + ':00'
          let arr = []
          for (let i of from.studentIds) {
            arr.push(...i)
          }
          from.studentIds = arr
          let formData = new FormData()
          let file = this.fileList
          formData.append('file', file)
          if (this.fileList) {
            sendFile(formData).then((res) => {
              if (res.status == 200) {
                from.fileId = res.data.id
                sendTask(from).then((res) => {
                  console.log(res)
                })
              }
            })
          }
        } else {
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

    handleChange (event) {
      let file = event.target.files[0]
      if (file) {
        let res = file.size / 1024 / 1024 < 10
        if (res) {
          this.fileList = file
        } else {
          alert('请压缩文件')
          this.$refs.upLoad.uploadFiles = []
        }
      }
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