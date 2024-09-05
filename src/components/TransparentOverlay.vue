<!-- TransparentOverlay.vue -->
<template>
  <div v-if="is_visible" class="overlay" @click="hide_overlay"></div>
  <div v-if="is_visible" class="operation-box">
    <div class="menu-item" @click="logout">ログアウト</div>
    <div class="menu-item" @click="terms_of_use">利用規約</div>
    <div class="menu-item" @click="privacy_policy">プライバシーポリシー</div>
    <div class="menu-item" @click="version_info">バージョン情報</div>
  </div>
</template>

<script setup lang="ts">
import access_token from '@/logic/config/access_token'
import related_info_util from '../logic/utils/related_info_util'
import { related_info_enum } from '../logic/utils/related_info_enum'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  is_visible: boolean;
}>()

const emit = defineEmits(['hide', 'terms_of_use', 'privacy_policy', 'version_info'])

const hide_overlay = () => {
  emit('hide')
}

const logout = () => {
  emit('hide')
  access_token.config('')
  router.push('/login')
}

const terms_of_use = () => {

  related_info_util.config_related_info(related_info_enum.related_info_terms_of_use)
  emit('hide')
  access_token.config('')
  router.push('/login')
}

const privacy_policy = () => {

  related_info_util.config_related_info(related_info_enum.related_info_privacy_policy)
  emit('hide')
  access_token.config('')
  router.push('/login')
}

const version_info = () => {

  related_info_util.config_related_info(related_info_enum.related_info_version_info)
  emit('hide')
  access_token.config('')
  router.push('/login')
}

</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.0);
  z-index: 1000;
}

.operation-box {
  position: fixed;
  left: 324px;
  bottom: 20px;
  width: 226px;
  height: 150px;
  background-color: #085691;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu-item {
  color: white;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 15px;
  margin-left: 40px;
}

.menu-item:hover {
  cursor: pointer;
}
</style>
