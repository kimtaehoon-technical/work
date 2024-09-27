<template>
  <div id="home-layout" :style="{ backgroundColor: content_bg_color, width: '100%' }">
    <div class="main-title" :style="{ width: '100%', height: '25px' }">無題の会話</div>
    <div class="menu-appear-div" :style="{ position: 'absolute', top: '30px', left: '20px' }" @click="on_show_menu_click"><img :src=menu_appear_icon alt="icon" class="q_section_icon" :style="{ width: q_item_length, height: q_item_length }"></div>
    <div class="content-container">
      <div class="input-section">
        <div class="input-section-first" :style="{ width: '900px', height: '50px', backgroundColor: '#FFFFFF', marginTop: '20px', marginBottom: input_bottom }">
          <div class="icon-container">
            <img @click="main_back" :src="backleft" alt="backleft" class="backleft-icon" :style="{ width: '20px', height: input_icon_length, marginRight: '10px' }">
          </div>
          <textarea v-model="input_value" class="input-box" @keyup.enter="handleKeydown" :placeholder="input_placeholder" :style="{ fontSize: input_font_size }"></textarea>
          <div class="input-icons">
            <img @click="clear_input" :src="delete_input_icon" alt="delete" class="icon" :style="{ width: input_icon_length, height: input_icon_length, marginBottom: '10px' }">
          </div>
        </div>
      </div>
      <div class="chat-container">
        <div class="message">
          <div class="message">
            <img class="user-icon" :src="user_icon" alt="User-icon" :style="{ width: input_icon_length, height: input_icon_length }">
            <div class="message-bubble">
              {{ user_message }}
            </div>
          </div>
        </div>
        <div v-if="showAnswer" class="message-answer">
          <div class="q-section-header" :style="{ backgroundColor: content_bg_color, height: section_height }">
            <span class="q-section-title" :style="{ fontSize: '20px' }">{{ isLoading ? answer_title : answer_title_complete }}</span>
            <div class="loading-container" v-if="isLoading">
              <div class="spinner"></div>
              <div class="circle"></div>
            </div>
          </div>
        </div>
        <div v-if="!isLoading && response_message" v-html="response_message" class="answer-box"></div>
        <div v-if="!isLoading && response_message" :style="{ height: `220px`}">
          <div class="input-section-second" :style="{ width: `900px`, height: `50px`, marginTop: '20px', marginBottom: '10px' }">
            <div class="icon-container">
              <img @click="main_back" :src="answer_logo_mark" alt="backleft" class="answer-mark-icon" :style="{ width: '15px', height: input_icon_length, marginBottom: '10px' }">
            </div>
            <div class="q-section-info">
              <span class="q-section-title-reanswer" :style="{ fontSize: '13px' }">{{ answer_info_title }}</span>
              <span class="q-section-subtitle" :style="{ fontSize: '10px' }">{{ answer_info_subtitle }}</span>
            </div>
            <div class="search_click_button_div" :style="{ fontSize: '13px' }">
              <button class="search_click_button" @click="send_input_reanswer" :disabled="isReanswerButtonDisabled">
                  <img :src="isHovered ? new_search_manual_blue : new_search_manual" alt="search" class="answer-mark-icon" :style="{ width: '20px', height: input_icon_length, marginRight: '90px' }">
                  <img :src="!isHovered ? new_search_manual_blue : new_search_manual_blue" alt="search" class="answer-mark-icon" :style="{ width: '20px', height: input_icon_length, marginRight: '90px' }">
                  <span style="vertical-align: middle; margin-left: 15px; line-height: 1.5; font-Size: 13px;">新規回答生成</span>
                </button>
            </div>
          </div>
          <div v-if="showMessageSecond" class="message-second">
            <img class="user-icon" v-if="showMessageSecond" :src="user_icon" alt="User-icon" :style="{ width: input_icon_length, height: input_icon_length }">
            <div v-if="showMessageSecond" class="message-bubble-second">
              {{ user_message_second }}
            </div>
          </div>
          <div v-if="showReAnswer" class="re-message">
            <div class="q-section-header" :style="{ backgroundColor: content_bg_color, height: section_height }">
              <span class="q-section-title" :style="{ fontSize: '20px' }">{{ isContentReady ? reanswer_title : reanswer_title_complete }}</span>
              <div v-if="isContentReady" class="loading-indicator">
                <div class="spinner_second_answer"></div>
                <div class="circle_second_answer"></div>
              </div>
            </div>
          </div>
          <div v-if="showFileDialog" class="file-dialog">
            <div class="file-dialog-content">
              <button @click="closeDialog" class="close-button">×</button>
              <iframe :src="fileUrl" frameborder="0" class="file-frame"></iframe>
            </div>
          </div>
          <div v-if="showReAnswer && !isContentReady" class="re-answer-box" v-html="response_second_message"></div>
          <div v-if="showFileLink && showReAnswer && !isContentReady" class="file-link-section">
            <a @click="openDialog(fileUrl)" class="file-link">{{ fileName }}</a>
          </div>
          <div v-if="!isLoading && !isContentReady" class="reanswer-input">
            <textarea v-model="research_input_value" class="input-box-research" @keydown="handleKeydown_second" :placeholder="input_placeholder_reanswer" :style="{ fontSize: '12px' }"></textarea>
            <img @click="send_input_button_reanswer" :src="send_answer" alt="send" class="send-answer-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { content_bg_color } from '../logic/config/color_config'
import access_token from '../logic/config/access_token'
import 'loaders.css/loaders.min.css';
import { nextTick } from 'vue';

// アイコンや画像をインポート
import menu_appear_icon from '@/assets/menu_appear.svg'
import delete_input_icon from '@/assets/delete_input.svg'
import backleft from '@/assets/backleft.svg'
import user_icon from '@/assets/user_icon.svg'
import answer_logo_mark from '@/assets/answer_logo_mark.svg'
import new_search_manual from '@/assets/new_search_manual.svg'
import new_search_manual_blue from '@/assets/new_search_manual_blue.svg'
import send_answer from '@/assets/send_answer.svg'

// 表示用の参考ファイルをインポート
import second_answer_file_1 from '@/file/マニュアル_1_except_FAQ.pdf'
import second_answer_file_2 from '@/file/マニュアル_2_except_FAQ.pdf'


// APIやモデルのインポート
import answer_api_first from '../api/answer_api_first'
import answer_api_second from '../api/answer_api_second'
import { log_read_list } from '../model/log_read'
import { manual_list } from '../model/manual_list'

// 設定値をインポート
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

// ユーティリティや列挙型のインポート
import menu_status_util from '@/logic/utils/menu_status_util'
import { menu_enum } from '@/logic/utils/menu_enum'
import { watch } from 'vue';

// タイトルやUIのサイズを保持するためのrefを定義
const title = ref('IT - IS')
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
const q_item_answer_font_size = ref(`0px`)
const q_item_answer_from_font_size = ref(`0px`)
const q_item_answer_from_title = ref(`<strong>出典：</strong>この回答は以下のFAQを参照しました`)

// ユーザー入力に関するrefを定義
const input_value = ref<string>('');
const research_input_value = ref(``)
const showReAnswer = ref(false);
const showAnswer = ref(false);
const isContentReady = ref(false);
const isReanswerButtonDisabled = ref(false);
const showMessageSecond = ref(false);
const showFileLink = ref(false);
const showFileDialog = ref(false);
const isLoading = ref(false);
const isHovered = ref(false);
const fileUrl = ref('');
const fileName = ref('');

// メッセージ関連のrefを定義
const user_message = ref<string | null>(null);
const user_message_second = ref<string | null>(null)
const response_message = ref<string | null>(null)
const response_second_message = ref<string | null | undefined>(null)

// 質問アイテムのインターフェースを定義
interface qa_item {
  log_id: string,
  show_answer: answer_enum
  question: string
  answer: string
  from: string
  judge: number
  judge_content: string
  show_disagree: boolean
}

// 回答状態を定義するenum
enum answer_enum {
  wait = `wait`,
  cancel = `cancel`,
  answer = `answer`,
  not_found = `not_found`,
}

// 質問アイテムのrefを定義
const qa_items = ref<qa_item[]>([])

// タイトルやプレースホルダーのrefを定義
const answer_title = ref(`FAQから検索しています : `)
const answer_title_complete = ref(`FAQの検索結果 : `)
const reanswer_title = ref(`ドキュメントから回答を生成してます : `)
const reanswer_title_complete = ref(`ドキュメントから生成 : `)
const answer_info_title = ref(`この回答はFAQから表示しています`)
const answer_info_subtitle = ref(`FAQ以外の情報を参照して、回答を生成する場合 : `)
const input_placeholder = ref('何を検索しますか?\nEnterで改行')
const input_placeholder_reanswer = ref('追加情報を送信.....')

// ファイルダイアログを表示する
const openDialog = (fileType: 'file1' | 'file2') => {
  showFileDialog.value = true;
};

// ファイルダイアログを閉じる
const closeDialog = () => {
  showFileDialog.value = false;
};

// ルーターやルートを取得
const router = useRouter()
const route = useRoute()

// ログイン、非ログイン、マニュアルのアイテムリストを定義
const no_login_items = ref<log_read_list>([])
const login_items = ref<log_read_list>([])
const manual_items = ref<manual_list>([])

// APIレスポンスをシミュレートする関数
const simulateApiResponse = (query: string) => {
  switch(query) {
    case 'サステナビリティ開発計画はどのような内容ですか？':
      return '<strong>【オーナーが機種変更した場合】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
    case 'グローバル強化プロジェクトの責任者は誰ですか？':
      return '<strong>【オーナーが機種変更した場合】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
    case '上半期の決算集計データはいつ公開されますか？':
      return '<strong>【オーナーが機種変更した場合】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
    case '研究プロジェクトの概要を教えていただけますか？':
      return '<strong>【オーナーが機種変更した場合】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
    default:
      return '';
  }
}
// クエリを処理する関数
const processQuery = (query: string | undefined) => {
  if (query) {
    isLoading.value = true; // ローディング状態を開始
    user_message.value = query as string; // ユーザーの入力を設定
    response_message.value = simulateApiResponse(query as string); // APIからの模擬応答を設定
    showAnswer.value = true; // 応答を表示
    setTimeout(() => {
      isLoading.value = false; // 1秒後にローディング状態を解除
    }, 1000);
  }
}

// ユーザーのクエリに応じてprocessQueryを実行するウォッチャー
watch(() => route.query.user_query, (newQuery) => {
  processQuery(newQuery as string); // 新しいクエリを処理
}, { immediate: true }); // コンポーネントがマウントされた直後に実行

// キーボードイベントを処理する関数 (Enterキーで入力を送信)
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // デフォルトのEnterキー動作を防止
    send_input(); // 入力を送信
  }
}

// もう一つのキーボードイベント処理 (Enterキーで再回答を送信)
const handleKeydown_second = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // デフォルトのEnterキー動作を防止
    send_input_button_reanswer(); // 再回答を送信
  }
}

// コンポーネントがマウントされる前に実行される処理 (非同期)
onBeforeMount(async () => {
})

// コンポーネントがマウントされた後に実行される処理 (非同期)
onMounted(async () => {
  const query = route.query.user_query as string; // ルートクエリからユーザーのクエリを取得
  user_message.value = query; // ユーザーのメッセージを設定
  response_message.value = simulateApiResponse(query); // 応答メッセージを設定

  if (route.query.textarea) {
    input_value.value = route.query.textarea as string; // テキストエリアの値を設定
  }

  cal_home_width(); // ホームのコンテンツ幅を計算
  cal_ui(); // UIを計算
  window.addEventListener('resize', cal_home_width); // ウィンドウリサイズ時にコンテンツ幅を再計算
  window.addEventListener('resize', cal_ui); // ウィンドウリサイズ時にUIを再計算

  await nextTick(); // DOM更新後まで待機
  
  send_input(); // 入力を送信
});

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
 * 入力内容をクリアする
 */
const clear_input = () => {
  input_value.value = ''
}

/**
 * 一次回答受送信
 */
const send_input = async () => {
  if (!input_value.value || input_value.value.trim() === '') {
    return
  }
  
  user_message.value = input_value.value;

  showAnswer.value = true;
  isLoading.value = true;
  await nextTick();
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    response_message.value = '<strong>【一次回答のテスト】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
    // const second_answer_data = await answer_api_first.fetch_first_answer({ text: user_message.value });
    // response_message.value = second_answer_data;
  } catch (error) {
    console.error('Error fetching second answer:', error);
    await new Promise(resolve => setTimeout(resolve, 5000));
    response_message.value = '<strong>【一次回答のテスト】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
  } finally {
    input_value.value = '';
    isLoading.value = false;
  } 
}

/**
 * 二次回答受送信：追加質問
 */
const send_input_reanswer = async () => {
  if (!user_message.value || user_message.value.trim() === '') {
    return;
  }

  showMessageSecond.value = false;
  isContentReady.value = true;
  showReAnswer.value = true;
  isReanswerButtonDisabled.value = true;

  fileUrl.value = second_answer_file_1;
  fileName.value = 'マニュアル_1_except_FAQ.pdf';
  showFileLink.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    response_second_message.value = '<strong>【二次回答のテスト】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
    // const second_answer_data = await answer_api_second.fetch_second_answer({ text: user_message.value });
    // response_second_message.value = second_answer_data;
  } catch (error) {
    console.error('Error fetching second answer:', error);
    await new Promise(resolve => setTimeout(resolve, 5000));
    response_second_message.value = '<strong>【二次回答のテスト】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
  } finally {
    isContentReady.value = false;
  }
};

/**
 * 二次回答受送信：新規回答生成
 */
const send_input_button_reanswer = async () => {
  if (research_input_value.value.trim() === '') {
    return;
  }

  showMessageSecond.value = true;
  user_message_second.value = research_input_value.value;

  showReAnswer.value = true;
  isContentReady.value = true;

  fileUrl.value = second_answer_file_2;
  fileName.value = 'マニュアル_2_except_FAQ.pdf';
  showFileLink.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    response_message.value = '<strong>【二次回答のテスト】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
    // const second_answer_data = await answer_api_second.fetch_second_answer({ text: research_input_value.value });
    // response_second_message.value = second_answer_data;
  } catch (error) {
    console.error('Error fetching second answer:', error);
    await new Promise(resolve => setTimeout(resolve, 5000));
    response_second_message.value = '<strong>【二次回答のテスト】</strong><br>スマホを機種変更した場合、変更後のスマホで、キー情報の引き継ぎを行ってください。※1操作方法は、[キーの引継ぎ]をご確認ください。動作確認済のスマホ[動作確認済スマートフォン一覧]でのご利用を推奨しております。※1デジタルキーはスマホの標準バックアップ機能に対応しておりません。<br><br><strong>【シェアユーザーが機種変更した場合】</strong><br>シェアキーは引き継ぐことができません。スマホを機種変更した場合、シェアキーは自動で削除されます。（オーナーによるシェアキーの再発行が必要です。）<br>';
  } finally {
    isContentReady.value = false;
  }
}

/**
 * MRI FAQ画面に戻る
 */
 const main_back = () => {
  router.push(`/`)
}

/**
 * メーニュを出る
 */
const on_show_menu_click = () => {
  menu_status_util.config_menu_status(menu_enum.appear_status)
}

</script>

<style scoped>
#home-layout {
  margin: 0 auto;
  padding: 0;
  height: auto;
  width: 100%;
  position: 'relative';
  user-select: none;
}

.main-title {
  background-color: #558f8f;
  color: #FFFFFF;
  font-size: 13px;
  padding: 3px;
  width: 100%;
  text-align: center;
  line-height: 28px;
}

.content-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
  padding: 0px;
}

.title-header {
  display: flex;
  justify-content: center;
  width: 100%;
  color: #000000;
  font-weight: bold;
}

.login-related-container {
  display: flex;
  justify-content: space-between;
}

.non-login-q-section {
  box-sizing: border-box;
  overflow: auto;
}

.login-q-section {
  box-sizing: border-box;
  overflow: auto;
}

.search_click_button {
  width: 120px;
  height: 30px;
  background-color: #ffffff;
  border: 2px solid #0066ff;
  border-radius: 5px;
  color: #0066ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-right: 280px;
}

.search_click_button img {
  display: block;
  position: absolute;
}

.search_click_button_div {
  position: relative;
}

.search_click_button:hover {
  background-color: #0066ff;
  color: #ffffff;
}

.search_click_button:disabled {
  background-color: #5a80fe;
  color: #fff;
  cursor: not-allowed;
  border: 1px solid #c0c0c0;
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

.icon-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.q-section-info {
  width: 250px;
  display: flex;
  flex-direction: column;
}

.q-section-title-reanswer {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.q-section-subtitle {
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.manual-section {
  background-color: #FFFFFF;
  box-sizing: border-box;
  overflow: auto;
}

.manual-item {
  display: flex;
  align-items: center;
  color: #043146;
  background-color: #FFFFFF;
  margin-bottom: 5px;
}

.manual-item:hover {
  cursor: pointer;
}

.manual-item .date-spacer {
  width: 10px;
}

.manual-item .title-spacer {
  width: 50px;
}

.manual-item .title {
  font-weight: bold;
}

.manual-item .status-spacer {
  width: 20px;
}

.input-section {
  width: 100%;
  height: 80px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  padding-top: 5px;
  box-shadow: 0 0 10px rgba(91, 91, 91, 0.1);
}

.input-section-first {
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
}

.input-section-second {
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
}

.input-box {
  flex: 1;
  height: 60px;
  padding: 0 10px;
  resize: none;
  border: 2px solid #A0D3F2;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 5px rgba(160, 211, 242, 1.5);
  color: #043146;
  padding-right: 40px;
  overflow-y: auto;
  box-sizing: border-box;
  line-height: 1.5;
}

.input-box::placeholder {
  color: #C3CFD5;
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
  color: #8d959a;
  font-size: 15px;
  line-height: 1.5;
}

.input-box-research::placeholder {
  color: #C3CFD5;
  font-size: 12px;
}

.chat-container {
  width: 900px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
}

.message {
  display: flex;
  align-items: center;
  align-items: flex-start;
  transform: translateY(20px);
  animation: slideUp 0.3s ease-out forwards;
}

.message-answer {
  display: flex;
  align-items: center;
  align-items: flex-start;
  transform: translateY(30px);
  animation: slideUp 2s ease-out forwards;
}

.message-second {
  display: flex;
  align-items: center;
  align-items: flex-start;
  transform: translateY(20px);
  animation: slideUp 0.2s ease-out forwards;
}

.re-message{
  display: flex;
  align-items: center;
  align-items: flex-start;
  transform: translateY(30px);
  animation: slideUp 2.5s ease-out forwards;
}

.user-icon {
  margin-right: 10px;
  animation: fadeIn 1.5s forwards;
}

.message-bubble {
  background-color: #ffffff;
  padding: 10px;
  font-size: 13px;
  border-radius: 10px;
  max-width: 840px;
  word-wrap: break-word;
  margin-bottom: 20px;
  animation: fadeIn 1.5s forwards;
}

.message-bubble-second {
  background-color: #ffffff;
  padding: 10px;
  font-size: 13px;
  border-radius: 10px;
  max-width: 840px;
  word-wrap: break-word;
  margin-bottom: 20px;
  animation: fadeIn 1.5s forwards;
}

.answer-box {
  background-color: transparent;
  padding: 10px;
  border: 2px solid #b5b5b5;
  border-radius: 4px;
  max-width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 12px;
  animation: fadeIn 1.5s forwards;
}

.re-answer-box {
  background-color: transparent;
  padding: 10px;
  border: 2px solid #b5b5b5;
  border-radius: 4px;
  margin-bottom: 10px;
  max-width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 12px;
  animation: fadeIn 1.5s forwards;
}

.input-box-research {
  flex: 1;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  padding-top: 10px;
  resize: none;
  border: 2px solid #A0D3F2;
  border-radius: 40px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 10px rgba(160, 211, 242, 1.5);
  color: #043146;
  padding-right: 40px;
  box-sizing: border-box;
  margin-bottom: 50px;
}

.input-box-research:focus {
  background-color: #FFFFFF;
  border: 3px solid #A0D3F2;
  box-shadow: 0 0 10px rgba(160, 211, 242, 2.5);
  outline: none;
}

.reanswer-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 65%;
  animation: fadeIn 1s forwards;
}

.loading-container {
  align-items: center;
  right: 0;
  margin-left: 5px;
  margin-right: 10px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid #a5a5a5;
  animation: spin 1s linear infinite;
}

.circle {
  border: 4px solid #333;
  border-top: 4px solid #333;
  border-radius: 100%;
  width: 1px;
  height: 1px;
  position: absolute;
  margin-left: 8px;
  top: 9.5px;
  animation: pulse 1s infinite;
}

.pulse {
  position: absolute;
  border: 3px solid #333;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: pulse 1.5s infinite;
}

.send-answer-icon {
  position: absolute;
  right: 10px;
  bottom: 55px;
  height: 24px;
  width: 24px;
}

.loading-indicator {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.spinner_second_answer {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid #a5a5a5;
  animation: spin 1s linear infinite;
}

.circle_second_answer {
  border: 4px solid #333;
  border-top: 4px solid #333;
  border-radius: 100%;
  width: 1px;
  height: 1px;
  position: absolute;
  margin-left: 8px;
  top: 9px;
  animation: pulse 1s infinite;
}

.backleft-icon {
  transition: transform 0.3s, opacity 0.3s;
  filter: drop-shadow(1px 1px 1px rgb(0, 157, 255))
}

.backleft-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.file-link-section {
  margin-top: 10px;
  margin-bottom: 10px
}

.file-link {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  animation: fadeIn 0.5s forwards;
}

.file-link-section {
  margin-top: 20px;
}

.file-content-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  overflow: auto;
  padding: 20px;
}

.file-content-container iframe {
  width: 100%;
  height: 80vh;
}

.file-content-container button {
  margin-top: 20px;
}

.file-link:hover {
  text-decoration: underline;
}

.file-dialog {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}

.file-dialog-content {
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  background-color: black;
  border-radius: 10px;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 30px;
  cursor: pointer;
  color: #fff;
  background-color: rgb(53, 52, 52);
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.file-frame {
  width: 100%;
  height: 100%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>