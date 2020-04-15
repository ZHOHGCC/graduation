<template>
  <div class="index">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">

      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话号"
                    prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="办公地址"
                    prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="qq"
                    prop="qq">
        <el-input v-model="ruleForm.qq"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { changeInfo } from '@/Api/teacher.js'
export default {
  data () {

    return {
      ruleForm: {

        email: '',
        address: '',
        phone: '',
        qq: ''
      },
      rules: {
        // pass: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],

        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ], address: [
          { required: true, message: '请输入地址', trigger: 'blur' },

        ], phone: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
          { len: 11, message: '请输入正确的电话号', trigger: 'blur' }
        ],
        qq: [
          { required: true, message: '请输入QQ号', trigger: 'blur' },

        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          changeInfo(this.ruleForm).then((res) => {

          })
        } else {

          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}


</script>
<style  scoped>
.index {
  width: 100%;
  /* height: 100%; */
}
</style>