<template>
  <Dialog :show="dialogConfig.show" :title="dialogConfig.title" :buttons="dialogConfig.buttons" width="400px"
    :showCancel="true" @close="closeDialog" :top="100">
    <el-form class="login-register" :model="formData" :rules="rules" ref="formDataRef">
      <el-form-item prop="password">
        <el-input show-password size="large" placeholder="请输入旧密码" v-model="formData.oldPassword">
          <template #prefix>
            <span class="iconfont icon-password"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input show-password size="large" placeholder="请输入新密码" v-model="formData.password">
          <template #prefix>
            <span class="iconfont icon-password"></span>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUpdated,
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import md5 from 'js-md5'
const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()

import { useLoginStore } from '@/stores/loginStore.js'
const loginStore = useLoginStore()

const dialogConfig = ref({
  show: false,
  title: '修改密码',
  buttons: [
    {
      type: 'primary',
      text: '修改密码',
      click: (e) => {
        doSubmit()
      },
    },
  ],
})

const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}

const formData = ref({})
const formDataRef = ref()
const rules = {
  oldPassword: [{ required: true, message: '请输入旧密码' }],
  password: [{ required: true, message: '请输入新密码' }],
}

// 登录、注册、重置密码  提交表单
const doSubmit = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    let params = {}
    Object.assign(params, formData.value)
    let result = await proxy.Request({
      url: proxy.Api.updatePassword,
      params: params,
    })
    if (!result) {
      return
    }
    proxy.Message.success('修改成功')
    dialogConfig.value.show = false
  })
}

const closeDialog = () => {
  dialogConfig.value.show = false
}

const show = async () => {
  dialogConfig.value.show = true
  await nextTick()
  formDataRef.value.resetFields()
}

defineExpose({
  show,
})
</script>

<style lang="scss">
</style>