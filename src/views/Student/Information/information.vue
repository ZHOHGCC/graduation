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