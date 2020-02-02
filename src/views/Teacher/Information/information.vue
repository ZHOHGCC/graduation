<template>
  <div class="index">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="密码"
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
      <el-form-item label="QQ"
                    prop="QQ">
        <el-input v-model="ruleForm.QQ"></el-input>
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
        email: '',
        address: '',
        phone: '',
        QQ: ''
      },
      rules: {
        // pass: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ], address: [
          { required: true, message: '请输入地址', trigger: 'blur' },

        ], phone: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
          { len: 11, message: '请输入正确的电话号', trigger: 'blur' }
        ],
        QQ: [
          { required: true, message: '请输入QQ号', trigger: 'blur' },

        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
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