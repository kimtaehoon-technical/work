<template>
  <div id="home-layout" :style="{ backgroundColor: content_bg_color }">
    <div class="menu-appear-div" :style="{ position: 'absolute', top: '30px', left: '20px' }"
      @click="on_show_menu_click">
      <img :src="menu_appear_icon" alt="icon" class="q_section_icon"
        :style="{ width: q_item_length, height: q_item_length }">
    </div>
    <div class="content-container">
      <div class="title-header"
        :style="{ fontSize: title_font_size }">{{ title }}</div>
      <div class="login-related-container" :style="{ marginTop: login_related_top }">
        <div class="non-login-q-section" :style="{ marginBottom: non_login_bottom, padding: '0 20px' }">
          <div class="q-section-header" :style="{ backgroundColor: content_bg_color, height: section_height }">
            <span class="q-section-title" :style="{ fontSize: '13px' }">{{ non_login_title }}</span>
          </div>
          <div class="input-section" :style="{  marginBottom: input_bottom, width: 'calc(100% - 40px)' }">
            <textarea v-model="input_value" class="input-box" @keyup.enter="send_input"
              :placeholder="input_placeholder"
              :style="{ fontSize: input_font_size }"></textarea>
            <div class="input-icons">
              <img @click="clear_input" :src="delete_input_icon" alt="delete" class="icon"
                :style="{ width: input_icon_length, height: input_icon_length }">
            </div>
          </div>
          <button class="search_click_button" @click="send_input">
            <img :src="search_button" alt="send" class="icon" :style="{ width: input_icon_length, height: input_icon_length }">
            <span style="vertical-align: middle; margin-left: 5px; line-height: 1.5; font-size: 15px;">検索</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { content_bg_color } from '../logic/config/color_config'
import access_token from '../logic/config/access_token'

import menu_appear_icon from '@/assets/menu_appear.svg'
import delete_input_icon from '@/assets/delete_input.svg'
import search_button from '@/assets/search_button.svg'

import { log_read_list } from '../model/log_read'
import { manual_list } from '../model/manual_list'


import {
  menu_width,
  design_width,
  design_height,
  fixed_window_width,
  fixed_window_height,
  design_title_header_y,
  design_title_header_height,
  design_input_section_width,
  design_input_section_height,
  design_login_related_y,
  design_item_font_size,
  design_manual_font_size,
  design_input_font_size,
  item_length,
  manual_length,
  item_title_size,
  manual_title_size,
  design_section_height,
  design_input_icon_length,
  design_input_sep_height,
  design_input_section_top,
  design_input_section_bottom,
  design_title_header_font_size,
  design_non_login_q_section_x,
  design_non_login_q_between_width,
  design_non_login_q_section_height,
  design_non_login_q_section_bottom,
  design_login_q_section_x,
  design_login_q_between_width,
  design_login_q_section_height,
  design_login_q_section_bottom,
  design_manual_section_height,
} from '../logic/config/len_config'
import menu_status_util from '@/logic/utils/menu_status_util'
import { menu_enum } from '@/logic/utils/menu_enum'

const title = ref('業務サポート：AI検索ツール【IT - IS】')
const home_width = ref(`0px`)
const title_margin_top = ref(`0px`)
const title_height = ref(`0px`)
const login_related_top = ref(`0px`)
const q_item_font_size = ref(`0px`)
const manual_item_font_size = ref(`0px`)
const input_font_size = ref(`0px`)
const q_item_length = ref(`0px`)
const manual_icon_length = ref(`0px`)
const q_title_font_size = ref(`0px`)
const manual_title_font_size = ref(`0px`)
const section_height = ref(`0px`)
const input_icon_length = ref(`0px`)
const input_sep_height = ref(`0px`)
const input_top = ref(`0px`)
const input_bottom = ref(`0px`)
const input_width = ref(`0px`)
const input_height = ref(`0px`)
const title_font_size = ref(`0px`)
const non_login_x = ref(`0px`)
const non_login_bottom = ref(`0px`)
const non_login_width = ref(`0px`)
const non_login_height = ref(`0px`)
const non_login_between_width = ref(`0px`)
const login_x = ref(`0px`)
const login_bottom = ref(`0px`)
const login_width = ref(`0px`)
const login_height = ref(`0px`)
const manual_height = ref(`0px`)
const input_value = ref(``)

const non_login_title = ref(`IT - ISとは? : FAQ(よくあるお問い合わせ集)、マニュアル、過去の問合せ履歴から質問を横断検索します。`)
const login_title = ref(`登録した問い合わせから探す`)
const input_placeholder = ref('何を検索しますか?\nEnterで改行')
const manual_title = ref(`マニュアル更新情報`)

const router = useRouter()

const no_login_items = ref<log_read_list>([])
const login_items = ref<log_read_list>([])
const manual_items = ref<manual_list>([])

onBeforeMount(async () => {
  const access_token_value = access_token.fetch()
})

onMounted(async () => {
  cal_home_width()
  cal_ui()
  window.addEventListener('resize', cal_home_width)
  window.addEventListener('resize', cal_ui)
})

/**
 * ホームのコンテンツ幅を計算する
 */
const cal_home_width = () => {
  const window_width = (window.innerWidth <= fixed_window_width) ? fixed_window_width : window.innerWidth
  const content_width = window_width - menu_width
  home_width.value = `${content_width}px`
}

/**
 * UIを計算する
 */
const cal_ui = () => {
  const window_width = ((window.innerWidth <= fixed_window_width) ? fixed_window_width : window.innerWidth) * (5.0 / 6.0)
  const window_height = (window.innerHeight <= fixed_window_height) ? fixed_window_height : window.innerHeight

  // title header
  const title_header_y = Math.floor((window_height * design_title_header_y) / design_height)
  title_margin_top.value = `${title_header_y}px`

  const title_header_height = Math.floor((window_height * design_title_header_height) / design_height)
  title_height.value = `${title_header_height}px`

  const title_header_font_size = Math.floor((window_height * design_title_header_font_size) / design_height)
  title_font_size.value = `${title_header_font_size}px`

  // input section
  const input_section_width = Math.floor(((window_width - menu_width) * design_input_section_width) / (design_width - menu_width))
  input_width.value = `${input_section_width}px`

  const input_section_height = Math.floor((window_height * design_input_section_height) / design_height)
  input_height.value = `${input_section_height}px`

  const input_section_top = Math.floor((window_height * design_input_section_top) / design_height)
  input_top.value = `${input_section_top}px`

  const input_section_bottom = Math.floor((window_height * design_input_section_bottom) / design_height)
  input_bottom.value = `${input_section_bottom}px`

  // design_login_related
  const login_related_y = Math.floor((window_height * design_login_related_y) / design_height)
  login_related_top.value = `${login_related_y}px`

  // non login q section
  const non_login_q_section_x = Math.floor(((window_width) * design_non_login_q_section_x) / (design_width))
  const non_login_q_between_width = Math.floor(((window_width) * design_non_login_q_between_width) / (design_width))
  non_login_between_width.value = `${non_login_q_between_width}px`

  non_login_width.value = `${(input_section_width - non_login_q_between_width) / 2}px`
  non_login_x.value = `${non_login_q_section_x}px`

  const non_login_q_section_height = Math.floor((window_height * design_non_login_q_section_height) / design_height)
  non_login_height.value = `${non_login_q_section_height}px`

  const non_login_q_section_bottom = Math.floor((window_height * design_non_login_q_section_bottom) / design_height)
  non_login_bottom.value = `${non_login_q_section_bottom}px`

  // login q section
  const login_q_section_x = Math.floor(((window_width) * design_login_q_section_x) / (design_width))
  const login_q_between_width = Math.floor(((window_width) * design_login_q_between_width) / (design_width))
  login_width.value = `${(input_section_width - login_q_between_width) / 2}px`
  login_x.value = `${login_q_section_x}px`

  const login_q_section_height = Math.floor((window_height * design_login_q_section_height) / design_height)
  login_height.value = `${login_q_section_height}px`

  const login_q_section_bottom = Math.floor((window_height * design_login_q_section_bottom) / design_height)
  login_bottom.value = `${login_q_section_bottom}px`

  const item_font_size = Math.floor((window_height * design_item_font_size) / design_height)
  q_item_font_size.value = `${item_font_size}px`

  const current_manual_font_size = Math.floor((window_height * design_manual_font_size) / design_height)
  manual_item_font_size.value = `${current_manual_font_size}px`

  const current_input_font_size = Math.floor((window_height * design_input_font_size) / design_height)
  input_font_size.value = `${current_input_font_size}px`

  const current_item_length = Math.floor((window_height * item_length) / design_height)
  q_item_length.value = `${current_item_length}px`

  const current_manual_length = Math.floor((window_height * manual_length) / design_height)
  manual_icon_length.value = `${current_manual_length}px`

  const current_item_title_size = Math.floor((window_height * item_title_size) / design_height)
  q_title_font_size.value = `${current_item_title_size}px`

  const current_manual_title_size = Math.floor((window_height * manual_title_size) / design_height)
  manual_title_font_size.value = `${current_manual_title_size}px`

  const current_section_height = Math.floor((window_height * design_section_height) / design_height)
  section_height.value = `${current_section_height}px`

  const current_input_icon_length = Math.floor((window_height * design_input_icon_length) / design_height)
  input_icon_length.value = `${current_input_icon_length}px`

  const current_input_sep_height = Math.floor((window_height * design_input_sep_height) / design_height)
  input_sep_height.value = `${current_input_sep_height}px`
}

/**
 * メーニュを出る
 */
 const on_show_menu_click = () => {
  menu_status_util.config_menu_status(menu_enum.appear_status)
}

/**
 * 入力内容をクリアする
 */
const clear_input = () => {
  input_value.value = ''
}

/**
 * 一次回答、リクエストする（仮）
 */
const send_input = () => {
  if (input_value.value.trim() !== '') {
    router.push({ name: 'Question', query: { textarea: input_value.value } })
  }
}

</script>

<style scoped>
#home-layout {
  margin: 0 auto;
  padding: 0;
  height: 100%;
  position: 'relative';
  user-select: none;
  overflow: hidden;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin-top: 20px;
  margin-left: 60px;
  transition: margin-left 0.3s;
}

.title-header {
  display: flex;
  justify-content: center;
  width: 100%;
  color: #000000;
  font-weight: bold;
}

.login-related-container {
  justify-content: center;
  width: 100%;

}

.non-login-q-section {
  box-sizing: border-box;
  overflow: auto;
  height: 500px;
}

.login-q-section {
  box-sizing: border-box;
  overflow: auto;
}

.search_click_button {
  width: 100px;
  height: 40px;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-left: auto;
  margin-right: 40px;
}

.search_click_button:hover {
  background-color: #00BFFF;
}

.icon {
  cursor: pointer;
}

.text-item {
  font-size: 14px;
  color: #043146;
  background-color: #FFFFFF;
  word-wrap: break-word;
  margin-bottom: 10px;
}

.text-item:hover {
  cursor: pointer;
}

.q-section-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #06425D;
  position: sticky;
  top: 0;
  z-index: 1;
}

.q-section-title {
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-section {
  display: flex;
  width: 100%;
  height: 300px;
  align-items: center;
  position: relative;
}

.input-box {
  flex: 1;
  height: 100%;
  padding: 5px 10px;
  resize: none;
  border: 2px solid #A0D3F2;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 10px rgba(160, 211, 242, 1.5);
  color: #043146;
  padding-right: 40px;
  overflow-y: auto;
  box-sizing: border-box;
  line-height: 1.5;

}

.input-box:focus {
  background-color: #FFFFFF;
  border: 3px solid #A0D3F2;
  box-shadow: 0 0 10px rgba(160, 211, 242, 2.5);
  outline: none;
}

.input-icons {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 20px;
}

.icon {
  cursor: pointer;
}

.vertical-line {
  width: 1px;
  background-color: #A5B7C0;
  margin-left: 10px;
  margin-right: 10px;
}

.input-box::placeholder {
  color: #C3CFD5;
  font-size: 20px;
  line-height: 1.5;
}
</style>
