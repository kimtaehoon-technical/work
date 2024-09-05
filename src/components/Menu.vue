<template>
  <transition name="shrink">
    <div class="menu" :class="{ hidden: menu_status_util.menu_status() === menu_enum.hide_status }"
         :style="{ backgroundColor: menu_bg_color, width: `260px` }" 
         v-show="menu_status_util.menu_status() !== menu_enum.hide_status">
      <div class="menu-content">
        <div class="fixed-header" :style="{ backgroundColor: menu_bg_color, width: `260px` }">
          <div class="header-content">
            <div class="left-panel">
              <button @click="main_back">
                <span style="vertical-align: middle; margin-left: 5px; line-height: 1.5; font-Size: 19.5px; ">Egeria - Search</span>
              </button>
            </div>
            <div class="right-panel">
              <button @click="hidden">
                <img :src=menu_hidden_icon alt="Hide" style="width: 20px; height: 20px; vertical-align: middle;">
              </button>
            </div>
          </div>
        </div>
        <div class="recent-section" :style="{ backgroundColor: menu_bg_color, width: `260px` }">
          <div class="recent-header" :style="{ backgroundColor: menu_bg_color, width: `260px` }">
            <img :src=history alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
            <span class="recent-history" style="vertical-align: middle; margin-left: 5px; line-height: 1.5; font-Size: 15px; ">最近</span>
            </div>
            <div class="recent-buttons">
              <span class="recent-subtitle">昨日</span>
              <div>
                <button @click="goToQuestionWithQuery('サステナビリティ開発計画はどのような内容ですか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">サステナビリティ開発計画はい...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <div>
                <button @click="goToQuestionWithQuery2('グローバル強化プロジェクトの責任者は誰ですか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">グローバル強化プロジェク責任...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <div>
                <button @click="goToQuestionWithQuery3('上半期の決算集計データはいつ公開されますか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">上半期の決算集計データをたい...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <div>
                <button @click="goToQuestionWithQuery4('研究プロジェクトの概要を教えていただけますか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">研究プロジェクトの概要えてく...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <span class="recent-subtitle">8月18日</span>
              <div>
                <button @click="goToQuestionWithQuery5('サステナビリティ開発計画はどのような内容ですか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">サステナビリティ開発計画つか...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <span class="recent-subtitle">8月15日</span>
              <div>
                <button @click="goToQuestionWithQuery6('上半期の決算集計データはいつ公開されますか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">上半期の決算集計データをたい...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <div>
                <button @click="goToQuestionWithQuery7('研究プロジェクトの概要を教えていただけますか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">研究プロジェクトの概要えてく...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <div>
                <button @click="goToQuestionWithQuery8('グローバル強化プロジェクトの責任者は誰ですか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">グローバル強化プロジェク責任...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <div>
                <button @click="goToQuestionWithQuery9('研究プロジェクトの概要を教えていただけますか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px; ">研究プロジェクトの概要えてく...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
              <div>
                <button @click="goToQuestionWithQuery10('グローバル強化プロジェクトの責任者は誰ですか？')" class="recent-button">
                  <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 14px  ; ">グローバル強化プロジェク責任...</span>
                  <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
                </button>
              </div>
          </div>
        </div>
      </div>
      <div v-if="menu_status_util.menu_status() === menu_enum.hide_status" class="hidden-icons">
        <img :src="menu_hidden_icon" class="hidden-menu-icon" @click="main_back()" alt="home">
        <img :src="history" class="hidden-history-icon" @click="" alt="History">
        <img :src="menu_action_logout" class="hidden-logout-icon" @click="menu_footer_item_click()" alt="Logout">
      </div>
      <div class="menu-footer-panel" :style="{ backgroundColor: menu_bg_color, width: `260px`, height: `60px` }">
        <div class="menu-footer-sep"></div>
        <div class="menu-footer-item" :style="{ backgroundColor: menu_bg_color, color: menu_color }" @click="menu_footer_item_click()">
          <span class="menu-footer-text">ログアウト</span>
          <img :src="menu_action_logout" alt="icon" class="menu-footer-icon">
        </div>
      </div>
    </div>
  </transition>
  <div v-if="menu_status_util.menu_status() === menu_enum.hide_status" class="hidden-sidebar">
    <div class="hidden-sidebar-content">
      <div class="hidden-sidebar-top-buttons">
        <button @click="toggleSidebar">
          <img :src="menu_hidden_icon_ab" alt="Toggle Menu" style="width: 20px; height: 20px; vertical-align: middle;">
        </button>
        <button class="hidden-sidebar-button">
          <img :src="menu_home" alt="Home" @click="main_back()" class="hidden-sidebar-icon">
        </button>
        <button class="hidden-sidebar-button-history" @click="toggleBlueButton">
          <img :src="history" alt="History" class="hidden-sidebar-icon">
        </button>
      </div>
      <div class="hidden-sidebar-bottom-buttons">
        <button @click="menu_footer_item_click()" class="hidden-sidebar-button">
          <img :src="menu_action_logout" alt="Logout" class="hidden-sidebar-icon">
        </button>
      </div>
    </div>
  </div>
  <transition name="toggle-button" v-if="showBlueButton">
    <div class="blue-toggle-button">
      <div class="recent-buttons-side">
        <span class="recent-subtitle-side">昨日</span>
        <div>
          <button @click="goToQuestionWithQuery('サステナビリティ開発計画はどのような内容ですか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">サステナビリティ開発計画はい...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <div>
          <button @click="goToQuestionWithQuery2('グローバル強化プロジェクトの責任者は誰ですか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">グローバル強化プロジェク責任...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <div>
          <button @click="goToQuestionWithQuery3('上半期の決算集計データはいつ公開されますか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">上半期の決算集計データをたい...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <div>
          <button @click="goToQuestionWithQuery4('研究プロジェクトの概要を教えていただけますか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">研究プロジェクトの概要えてく...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <span class="recent-subtitle-side">8月18日</span>
        <div>
          <button @click="goToQuestionWithQuery5('サステナビリティ開発計画はどのような内容ですか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">サステナビリティ開発計画つか...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <span class="recent-subtitle-side">8月15日</span>
        <div>
          <button @click="goToQuestionWithQuery6('上半期の決算集計データはいつ公開されますか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">上半期の決算集計データをたい...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <div>
          <button @click="goToQuestionWithQuery7('研究プロジェクトの概要を教えていただけますか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">研究プロジェクトの概要えてく...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <div>
          <button @click="goToQuestionWithQuery8('グローバル強化プロジェクトの責任者は誰ですか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">グローバル強化プロジェク責任...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <div>
          <button @click="goToQuestionWithQuery9('研究プロジェクトの概要を教えていただけますか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px; ">研究プロジェクトの概要えてく...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
        <div>
          <button @click="goToQuestionWithQuery10('グローバル強化プロジェクトの責任者は誰ですか？')" class="recent-button-side">
            <span style="vertical-align: middle; margin-left: 5px; margin-bottom: 5px; line-height: 1.5; font-Size: 20px  ; ">グローバル強化プロジェク責任...</span>
            <img :src=history_click alt="Hide" style="width: 20px; height: 20px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import bg_style_util from '../logic/utils/bg_style_util'
import menu_status_util from '../logic/utils/menu_status_util'
import { bg_enum } from '../logic/utils/bg_enum'
import { menu_enum } from '../logic/utils/menu_enum'
import { blue, white } from '../logic/config/color_config'
import { menu_action_enum } from '../model/menu_action_enum'

import menu_hidden_icon from '@/assets/menu_hidden.svg'
import menu_hidden_icon_ab from '@/assets/menu_hidden_ab.svg'
import menu_item_icon from '@/assets/menu_item.svg'
import menu_home from '@/assets/menu_home.svg'
import menu_action_logout from '@/assets/menu_action_logout_demo.svg'
import history from '@/assets/history.svg'
import history_click from '@/assets/history_click.svg'

import log_api from '../api/log_api'
import { log_read_list } from '../model/log_read'
import access_token from '../logic/config/access_token'
import { group_logs_by_date, grouped_log } from '@/logic/utils/date_util'

const router = useRouter()
const sections = ref<grouped_log[]>([])

const menu_bg_color = ref("")
const menu_color = ref("")
const isLoading = ref(false);
const showBlueButton = ref(false)

const emit = defineEmits(['toggle_overlay'])

interface footer_content {
  action_id: menu_action_enum
  icon: string
  text: string
}

const footer_contents = ref<footer_content[]>([])

const toggleBlueButton = () => {
  showBlueButton.value = !showBlueButton.value
}

const goToQuestionWithQuery = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery2 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery3 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery4 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery5 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery6 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery7 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery8 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery9 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

const goToQuestionWithQuery10 = (query: string) => {
  showBlueButton.value = false
  router.push({ 
    name: 'Question',
    query: { user_query: query }
  });
};

onBeforeMount(async () => {
  // アクテビティログを読み取る
  const access_token_value = access_token.fetch()
  if (0 < access_token_value.length) {
    const log_read_list: log_read_list = await log_api.read({ "lSin_deployment_tag": "rag_aoai_ada2_gpt35_16k__api_0515" })
    const log_read_list_by_date = group_logs_by_date(log_read_list)
    sections.value = log_read_list_by_date
  }

  footer_contents.value = [
    { action_id: menu_action_enum.menu_username, icon: menu_action_logout, text: 'ログアウト' }
  ]
})

/**
 * BGカーラを設定
 */
onMounted(() => {
  bg_color_config()
  menu_status_util.config_menu_status(menu_enum.appear_status)
})

/**
 * MRI FAQ画面に戻る
 */
const main_back = () => {
  router.push(`/`)
}

/**
 * 内容画面に戻る
 * @param item 
 */
const click_menu_item = (item: string) => {
  console.log(item)
  router.push(`/c/`)
}

/**
 * Panelを隠す
 */
const hidden = () => {
  menu_status_util.config_menu_status(menu_enum.hide_status)
}

/**
 * サイドバー再表示
 */
const toggleSidebar = () => {
  if (menu_status_util.menu_status() === menu_enum.hide_status) {
    menu_status_util.config_menu_status(menu_enum.appear_status);
  } else {
    menu_status_util.config_menu_status(menu_enum.hide_status);
  }
}

/**
 * MRI FAQメーニュ動作
 */
const menu_footer_item_click = () => {
    router.push('/login')
}

/**
 * BGカーラを設定
 */
const bg_color_config = () => {
  const style_enum: bg_enum = bg_style_util.bg_style()
  bg_enum.bg_blue_style == style_enum ? menu_bg_color.value = blue.menu_bg_color : menu_bg_color.value = white.menu_bg_color
  bg_enum.bg_blue_style == style_enum ? menu_color.value = blue.menu_color : menu_color.value = white.menu_color
}

</script>

<style scoped>

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.menu {
  height: 100vh;
  user-select: none;
}

.menu-content {
  padding: 0px;
  overflow-x: hidden;
  width: 260px;
}

.menu.hidden {
  transform: translateX(-260px);
}

.hidden-menu-icon {
  position: absolute;
  top: 10px;
  left: -30px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
}

.hidden-history-icon,
.hidden-logout-icon {
  position: absolute;
  left: -30px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
}

.hidden-history-icon {
  top: 40px;
}

.hidden-logout-icon {
  bottom: 10px;
}

.fixed-header {
  color: white;
  position: sticky;
  top: 0;
  z-index: 2;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.left-panel,
.right-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-panel {
  justify-content: flex-start;
  padding-left: 0px;
}

.right-panel {
  justify-content: flex-end;
  padding-right: 0px;
}

button {
  background-color: transparent;
  color: #FFFFFF;
  font-weight: bold;
  width: 160px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: transparent;
}

.recent-section span {
  color: white;
}

.recent-subtitle {
  margin-left: 10px;
  font-size: 8px;
  color: white;
}

.recent-subtitle-side {
  margin-left: 10px;
  font-size: 12px;
  color: white;
}

.recent-button {
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.recent-button span {
  margin-left: 0;
  text-align: left;
  line-height: 1.5;
  display: inline-block;
  font-weight: 300;
}

.recent-button-side {
  justify-content: flex-start;
  align-items: center;
  width: 400px;
}

.recent-button-side span {
  margin-left: 0;
  text-align: left;
  line-height: 1.5;
  display: inline-block;
  font-weight: 300;
}

.menu-section {
  margin-bottom: 0px;
}

.menu-header {
  padding-left: 10px;
  /* padding: 10px; */
  padding-top: 30px;
  padding-bottom: 10px;
  position: sticky;
  top: 80px;
  z-index: 1;
  font-size: 12px;
}

.menu-items {
  margin-top: 0px;
}

.menu-item {
  padding-left: 10px;
  padding-right: 40px;
  padding-top: 8px;
  padding-bottom: 5px;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s ease;
  position: relative;
}

.menu-item:hover {
  cursor: pointer;
}

.menu-item-icon {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.shrink-enter-active {
  animation: slideIn 0.1s forwards;
}

.shrink-leave-active {
  animation: slideOut 0.1s forwards;
}

.shrink-enter,
.shrink-leave-to

/* .shrink-leave-active in <2.1.8 */
  {
  transform: scaleX(0);
  transform-origin: left;
}

.menu-footer-panel {
  height: 150px;
  background-color: #f0f0f0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}

.menu-footer-sep {
  width: 260px;
  height: 1px;
  margin: 0 auto 20px;
  background-color: #ffffff;
}

.menu-footer-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.menu-footer-item:hover {
  cursor: pointer;
}

.menu-footer-icon {
  width: 15px;
  height: 15px;
  margin-left: 10px;
  margin-right: 25px;
}

.menu-footer-text {
  margin-left: 20px;
  font-size: 15px;
  color: inherit;
}

.hidden-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 100vh;
  background-color: #085691;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}

.hidden-sidebar-bottom-buttons {
  background-color: #085691;
  border-top: 1.5px solid white;
  display: flex;
  width: 60px;
  z-index: 2;
}

.hidden-sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.hidden-sidebar-top-buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hidden-sidebar-bottom-buttons {
  margin-top: auto;
  margin-bottom: 20px;
}

.hidden-sidebar-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 10px 0;
}

.hidden-sidebar-button-history {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 10px 0;
}

.hidden-sidebar-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.hidden-sidebar-button:hover .hidden-sidebar-icon {
  filter: brightness(1.2);
}

.hidden-sidebar-button-history:hover{
filter: brightness(1.2);
}

.blue-toggle-button {
  top: 100px;
  background-color: #085691;
  margin-left: 60.5px;
  width: 220px;
  height: 230px;
  align-items: center;
  overflow-y: auto;
  justify-content: center;
  position: fixed;
  transition: opacity 0.3s;
  z-index: 10;
}

.recent-buttons-side {
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  transform: scale(0.5); 
  transform-origin: top left;
}

.toggle-button-enter-active, .toggle-button-leave-active {
  transition: opacity 0.3s;
}

.toggle-button-enter, .toggle-button-leave-to {
  opacity: 0;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
