<template>
  <div class="index">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="旧密码"
                    prop="oldPass">
        <el-input type="password"
                  v-model="ruleForm.oldPass"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                    prop="pass">
        <el-input type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"></el-input>
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
import { changePass } from '@/Api/student.js'
export default {
  data () {

    var validatePass = (rule, value, callback) => {
      if (this.ruleForm.checkPass !== '') {
        // this.$refs.ruleForm.validateField('checkPass');
      }

    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '' && this.ruleForm.pass != '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules: {
        // pass: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: true, }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },

        ],
        oldPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },

        ]
      }
    };
  },
  methods: {
    submitForm (formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newPassword = this.ruleForm.pass
          let oldPassword = this.ruleForm.oldPass
          changePass({
            oldPassword, newPassword
          }).then((res) => {

          })
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