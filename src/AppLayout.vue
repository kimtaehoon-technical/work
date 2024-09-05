<template>
  <div class="layout" :style="{ backgroundColor: content_bg_color }">
    <Menu v-if="show_menu" @toggle_overlay="toggle_overlay"/>
    <TransparentOverlay :is_visible="is_overlay_visible" @hide="hide_overlay" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import Menu from './components/Menu.vue'
import TransparentOverlay from './components/TransparentOverlay.vue'
import bg_style_util from '../src/logic/utils/bg_style_util'
import { bg_enum } from '../src/logic/utils/bg_enum'
import { content_bg_color } from './logic/config/color_config'

onBeforeMount(async () => {
  // BGスタイルを設定
  bg_style_util.config_bg_style(bg_enum.bg_blue_style)
})

const route = useRoute()
const show_menu = computed(() => {
  const path = route.path
  return path === '/' || path.startsWith('/question')
})

const is_overlay_visible = ref(false)
const toggle_overlay = () => {
  is_overlay_visible.value = !is_overlay_visible.value
}

const hide_overlay = () => {
  is_overlay_visible.value = false
}

</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 0px;
}
</style>
