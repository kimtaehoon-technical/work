<template>
  <div id="login-layout" :style="{ backgroundColor: login_bg_color, width: login_width }">
    <div class="fullscreen-mask" v-if="fullscreen_mask !== related_info_enum.related_info_no">
      <!-- バージョン情報 -->
      <div class="version_info_class" v-if="fullscreen_mask === related_info_enum.related_info_version_info">
        <div class="version-info-title">バージョン情報</div>
        <div class="logo-content">PKUTECH</div>
        <div class="version-number">バージョン 1.1.2</div>
        <svg @click="close_div" class="close-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
      </div>
      <!-- プライバシーポリシー -->
      <div class="privacy_policy_class" v-if="fullscreen_mask === related_info_enum.related_info_privacy_policy">
        <div class="privacy-policy-title">プライバシーポリシー</div>
        <p class="policy-content" v-html=policy_content></p>
        <svg @click="close_div" class="close-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
      </div>
      <!-- 利用規約 -->
      <div class="terms_of_use_class" v-if="fullscreen_mask === related_info_enum.related_info_terms_of_use">
        <div class="terms-of-use-title">利用規約</div>
        <p class="policy-content" v-html=terms_of_use_content></p>
        <svg @click="close_div" class="close-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
      </div>
    </div>
    <div class="content-container">
      <div class="logo-container">
        <img class="svg-container" :style="{ marginTop: logo_margin_top, width: logo_width, height: logo_height }" :src=logo_icon alt="Logo Image" />
      </div>
      <div class="login-bg-container" :style="{ marginTop: login_background_margin_top, width: login_background_width, height: login_background_height }">
        <div class="logo-title" :style="{ marginTop: logo_title_margin_top, fontSize: logo_font_size_demo }"> {{ login_title_content }}</div>
        <div class="service-name-login" :style="{ marginTop: service_margin_top, fontSize: service_font_size }"> {{ service_title_login }}</div>
        <div class="login-button-container" @click="login_click" :style="{ marginTop: login_button_container_margin_top, width: login_button, height: login_button_container_height }">
          {{ login_button_content }}
        </div>
      </div>
      <div class="company-title-footer-text" :style="{ fontSize: company_font_size, bottom: company_bottom }">
        {{ company_title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login_bg_color } from '../logic/config/color_config'

import logo_icon from '@/assets/logo.svg'
import password_icon from '@/assets/password.svg'
import enter_icon from '@/assets/enter.svg'

import user_login_api from '../api/user_login_api'
import { user_login } from '../model/user_login'
import { response_ok } from '../logic/config/response_code'
import access_token from '../logic/config/access_token'

import menu_status_util from '../logic/utils/menu_status_util'
import { menu_enum } from '../logic/utils/menu_enum'

import {
  design_width,
  design_height,
  fixed_window_width,
  fixed_window_height,
  logo_image_width,
  logo_image_height,
  logo_image_x,
  login_bg_width_demo,
  login_bg_width,
  login_bg_height_demo,
  login_bg_height,
  login_bg_y,
  logo_title_y,
  logo_title_font_size,
  service_name_y,
  service_name_font_size,
  login_button,
  login_input_width,
  login_input_height,
  visible_password_icon_len,
  login_input_font_size,
  login_input_y,
  login_button_bg_y,
  login_button_bg_width,
  login_button_bg_height,
  login_button_font_size,
  login_sep_y,
  login_sep_width,
  login_sep_height,
  forget_password_y,
  forget_password_height,
  forget_password_font_size,
  forget_password_enter_len,
  company_title_font_size,
  company_title_bottom,
} from '../logic/config/len_config'
import related_info_util from '@/logic/utils/related_info_util'
import { related_info_enum } from '@/logic/utils/related_info_enum'
const login_width = ref(`0px`)
const logo_width = ref(`0px`)
const logo_height = ref(`0px`)
const logo_margin_top = ref(`0px`)
const login_background_width = ref(`0px`)
const login_background_height = ref(`0px`)
const login_background_margin_top = ref(`0px`)
const login_title_content = ref('Egeria - Search')
const logo_title_margin_top = ref(`0px`)
const logo_font_size = ref(`0px`)
const logo_font_size_demo = ref(`0px`)
const service_margin_top = ref(`0px`)
const service_font_size = ref(`0px`)
const service_title_login = ref('ようこそ')
const login_input_container_width = ref(`0px`)
const login_input_container_height = ref(`0px`)
const login_input_container_margin_top = ref(`0px`)
const login_button_container_width = ref(`0px`)
const login_button_container_height = ref(`0px`)
const login_button_container_font_size = ref(`0px`)
const login_button_container_margin_top = ref(`0px`)
const login_mail_input_filed = ref(`メールアドレス`)
const login_password_input_filed = ref(`パスワード`)
const login_mail_address = ref('');
const login_password = ref('');
const login_input_text_font_size = ref('0px');
const login_visible_icon_len = ref('0px');
const login_button_content = ref(`Microsoftアカウントでログイン`)
const login_sep_container_width = ref(`0px`)
const login_sep_container_height = ref(`0px`)
const login_sep_container_margin_top = ref(`0px`)
const forget_password_container_margin_top = ref(`0px`)
const forget_password_container_width = ref(`0px`)
const forget_password_container_height = ref(`0px`)
const forget_password_container_font_size = ref(`0px`)
const forget_password_info = ref(`パスワードを忘れた場合`)
const forget_password_enter_icon_len = ref(`0px`)
const company_font_size = ref(`0px`)
const company_bottom = ref(`0px`)
const company_title = ref('Copyright ©2024 PKUTECH Co.,Ltd.')

const show_password = ref(false)
const fullscreen_mask = ref(related_info_enum.related_info_no)

const policy_content = ref(`<p class="XwcIZc">Google は、こうした利用規約はできれば読みたくないというユーザーの心理を理解しています。しかし、ユーザーが Google <a class="YfaGG" href="terms?hl=ja#footnote-services" data-name="services" jsaction="click:IPbaae(preventDefault=true)">サービス</a>を利用するうえで期待できること、および Google がユーザーに期待することを、利用規約に明記することは重要です。</p>
<p>本利用規約には、<a href="https://about.google/intl/ja_JP/how-our-business-works" class="N6CPUe" target="_blank">Google のビジネスの仕組み</a>、Google に適用される法律、および <a href="https://www.google.com/about/philosophy.html?hl=ja" class="N6CPUe" target="_blank">Google が常に正しいと信じてきた事柄</a>が反映されています。結果として、本利用規約は、サービスを利用するユーザーと Google との関係を定義するのに役立っています。たとえば、本規約の見出しには以下のような内容が含まれています。</p>
<p>本規約に加えて、Google は<a href="privacy?hl=ja">プライバシー ポリシー</a>も公開しています。プライバシー ポリシーは本規約とは独立した規定ですが、<a href="https://myaccount.google.com/?hl=ja" class="N6CPUe" target="_blank">ユーザーが自身の情報を更新、管理、書き出し、削除する</a>方法について理解を深めるためにもご一読されることをおすすめします。</p>
<ul><li><a href="terms?hl=ja#toc-what-you-expect">ユーザーが Google に期待できること</a>では、Google がサービスを提供および開発する仕組みについて説明します</li><li><a href="terms?hl=ja#toc-what-we-expect">Google がユーザーに期待すること</a>では、Google のサービスを利用する際のルールについて規定します</li><li><a href="terms?hl=ja#toc-content">Google サービス内のコンテンツ</a>では、Google のサービス内で見つかるコンテンツの知的所有権について説明し、そのコンテンツがユーザー、Google、または他者のうち誰に帰属するのかを示します</li><li><a href="terms?hl=ja#toc-problems">問題または意見の相違がある場合</a>では、ユーザーのその他の法的権利と、誰かが本規約に違反した場合にどうなるかについて説明します</li></ul>
<p>Google のサービスへのアクセスまたは利用によって本規約に同意することになるため、本規約の内容を理解しておくことが重要です。</p>`)

const terms_of_use_content = ref(`<p class="XwcIZc">Google は、こうした利用規約はできれば読みたくないというユーザーの心理を理解しています。しかし、ユーザーが Google <a class="YfaGG" href="terms?hl=ja#footnote-services" data-name="services" jsaction="click:IPbaae(preventDefault=true)">サービス</a>を利用するうえで期待できること、および Google がユーザーに期待することを、利用規約に明記することは重要です。</p>
<p>本利用規約には、<a href="https://about.google/intl/ja_JP/how-our-business-works" class="N6CPUe" target="_blank">Google のビジネスの仕組み</a>、Google に適用される法律、および <a href="https://www.google.com/about/philosophy.html?hl=ja" class="N6CPUe" target="_blank">Google が常に正しいと信じてきた事柄</a>が反映されています。結果として、本利用規約は、サービスを利用するユーザーと Google との関係を定義するのに役立っています。たとえば、本規約の見出しには以下のような内容が含まれています。</p>
<p>本規約に加えて、Google は<a href="privacy?hl=ja">プライバシー ポリシー</a>も公開しています。プライバシー ポリシーは本規約とは独立した規定ですが、<a href="https://myaccount.google.com/?hl=ja" class="N6CPUe" target="_blank">ユーザーが自身の情報を更新、管理、書き出し、削除する</a>方法について理解を深めるためにもご一読されることをおすすめします。</p>
<ul><li><a href="terms?hl=ja#toc-what-you-expect">ユーザーが Google に期待できること</a>では、Google がサービスを提供および開発する仕組みについて説明します</li><li><a href="terms?hl=ja#toc-what-we-expect">Google がユーザーに期待すること</a>では、Google のサービスを利用する際のルールについて規定します</li><li><a href="terms?hl=ja#toc-content">Google サービス内のコンテンツ</a>では、Google のサービス内で見つかるコンテンツの知的所有権について説明し、そのコンテンツがユーザー、Google、または他者のうち誰に帰属するのかを示します</li><li><a href="terms?hl=ja#toc-problems">問題または意見の相違がある場合</a>では、ユーザーのその他の法的権利と、誰かが本規約に違反した場合にどうなるかについて説明します</li></ul>
<p>Google のサービスへのアクセスまたは利用によって本規約に同意することになるため、本規約の内容を理解しておくことが重要です。</p>`)

const router = useRouter()

onBeforeMount(async () => {

  const related_info = related_info_util.fetch_related_info()
  if (undefined === related_info) {
    related_info_util.config_related_info(related_info_enum.related_info_no)
  }
  fullscreen_mask.value = related_info_util.fetch_related_info()

})

onMounted(async () => {
  cal_login_width()
  cal_ui()
  window.addEventListener('resize', cal_login_width)
  window.addEventListener('resize', cal_ui)
})

/**
 * ログインのコンテンツ幅を計算する
 */
const cal_login_width = () => {
  const window_width = (window.innerWidth <= fixed_window_width) ? fixed_window_width : window.innerWidth
  login_width.value = `${window_width}px`
}

/**
 * UIを計算する
 */
const cal_ui = () => {
  const window_width = ((window.innerWidth <= fixed_window_width) ? fixed_window_width : window.innerWidth) * (5.0 / 6.0)
  const window_height = (window.innerHeight <= fixed_window_height) ? fixed_window_height : window.innerHeight

  // logo image
  const current_logo_image_width = Math.floor((window_width * logo_image_width) / design_width)
  logo_width.value = `${current_logo_image_width}px`

  const current_logo_image_height = Math.floor((window_height * logo_image_height) / design_height)
  logo_height.value = `${current_logo_image_height}px`

  const current_logo_image_margin_x = Math.floor((window_height * logo_image_x) / design_height)
  logo_margin_top.value = `${current_logo_image_margin_x}px`

  // login background
  const current_login_background_width = Math.floor(login_bg_width_demo)
  login_background_width.value = `${current_login_background_width}px`

  const current_login_background_height = Math.floor(login_bg_height_demo)
  login_background_height.value = `${current_login_background_height}px`

  const current_login_background_margin_top = Math.floor((window_height * login_bg_y) / design_height)
  login_background_margin_top.value = `${current_login_background_margin_top}px`

  // logo title
  const current_logo_title_margin_top = Math.floor((window_height * logo_title_y) / design_height)
  logo_title_margin_top.value = `${current_logo_title_margin_top}px`

  const current_logo_title_font_size = Math.floor((window_height * logo_title_font_size) / design_height)
  logo_font_size.value = `${current_logo_title_font_size}px`

  const current_logo_title_font_size_demo = Math.floor((window_height * logo_title_font_size) / design_height - 20)
  logo_font_size_demo.value = `${current_logo_title_font_size_demo}px`

  // service name login title
  const current_service_margin_top = Math.floor((window_height * service_name_y) / design_height)
  service_margin_top.value = `${current_service_margin_top}px`

  const current_service_font_size = Math.floor((window_height * service_name_font_size) / design_height)
  service_font_size.value = `${current_service_font_size}px`

  // login input container
  const current_login_input_width = Math.floor(login_button)
  login_input_container_width.value = `${current_login_input_width}px`

  const current_login_input_height = Math.floor((window_height * login_input_height) / design_height)
  login_input_container_height.value = `${current_login_input_height}px`

  const current_login_input_container_margin_top = Math.floor((window_height * login_input_y) / design_height)
  login_input_container_margin_top.value = `${current_login_input_container_margin_top}px`

  const current_visible_password_icon_len = Math.floor((window_height * visible_password_icon_len) / design_height)
  login_visible_icon_len.value = `${current_visible_password_icon_len}px`

  // login button container
  const current_login_button_bg_width = Math.floor((window_width * login_button_bg_width) / design_width)
  login_button_container_width.value = `${current_login_button_bg_width}px`

  const current_login_button_bg_height = Math.floor((window_height * login_button_bg_height) / design_height)
  login_button_container_height.value = `${current_login_button_bg_height}px`

  const current_login_button_container_font_size = Math.floor((window_height * login_button_font_size) / design_height)
  login_button_container_font_size.value = `${current_login_button_container_font_size}px`

  const current_login_button_container_margin_top = Math.floor(login_button_bg_y)
  login_button_container_margin_top.value = `${current_login_button_container_margin_top}px`

  // login sep container
  const current_login_sep_width = Math.floor((window_width * login_sep_width) / design_width)
  login_sep_container_width.value = `${current_login_sep_width}px`

  const cal_login_sep_height = Math.floor((window_height * login_sep_height) / design_height)
  const current_login_sep_height = (cal_login_sep_height <= 1) ? 1 : cal_login_sep_height
  login_sep_container_height.value = `${current_login_sep_height}px`

  const current_login_sep_container_margin_top = Math.floor((window_height * login_sep_y) / design_height)
  login_sep_container_margin_top.value = `${current_login_sep_container_margin_top}px`

  // forget password
  const current_forget_password_container_margin_top = Math.floor((window_height * forget_password_y) / design_height)
  forget_password_container_margin_top.value = `${current_forget_password_container_margin_top}px`

  forget_password_container_width.value = `${current_login_sep_width}px`

  const current_forget_password_height = Math.floor((window_height * forget_password_height) / design_height)
  forget_password_container_height.value = `${current_forget_password_height}px`

  const current_forget_password_font_size = Math.floor((window_height * forget_password_font_size) / design_height)
  forget_password_container_font_size.value = `${current_forget_password_font_size}px`

  const current_forget_password_enter_icon_len = Math.floor((window_height * forget_password_enter_len) / design_height)
  forget_password_enter_icon_len.value = `${current_forget_password_enter_icon_len}px`

  const current_login_input_text_font_size = Math.floor((window_height * login_input_font_size) / design_height)
  login_input_text_font_size.value = `${current_login_input_text_font_size}px`

  // company title
  const current_company_title_font_size = Math.floor((window_height * company_title_font_size) / design_height)
  company_font_size.value = `${current_company_title_font_size}px`

  const current_company_title_bottom = Math.floor((window_height * company_title_bottom) / design_height)
  company_bottom.value = `${current_company_title_bottom}px`

}

const password_field_type = computed(() => show_password.value ? 'text' : 'password')

const forget_password_click = () => {
  alert('forget password clicked!')
}

const toggle_visible_password_click = () => {
  show_password.value = !show_password.value
}

/**
 * 認証が成功したらホームページに遷移する
 */
// Configuration for Microsoft OAuth


const login_click = async () => {
  const access_token_data: user_login = await user_login_api.login({ "api_user_id": "pkutech_bot", "api_user_pass": "Pie2eiNo", "app_user_id": "user_id" })
  console.log(access_token_data)
  if (response_ok == access_token_data.code) {
    console.log(access_token_data.data.access_token)
    access_token.config(access_token_data.data!.access_token)
    menu_status_util.config_menu_status(menu_enum.appear_status)
    localStorage.setItem('access_token_key', access_token_data.data.access_token);
    router.push('/')
  } else {
    alert(access_token_data.detail)
  }
  // const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=638604859721735056.MmE0YmRlMjEtOWQxOC00Yzc2LWE2ZWItZGU1Mjg3ODk3ODRmY2FhYzA4NWMtMDQ3Yy00NGY4LTg3ZmMtMWRjZDlkMjA2M2Vl&ui_locales=ja&mkt=ja&client-request-id=f8272b74-4df2-4550-8de7-3a83e2b45a93&state=gsduS6xk2dN4AA65wkp9Bzi5UJK7e1RaltK8-utAkPfbIqQfJKVHBQsz8hkwT2wtkkGQF1E_VXEn7eM37W5TnrzvJacI6X17Ak_ChherBRZ21yDZOXuidZyQK47gROnBK8pYCHoy3xgd7GOF6oyPtWyTxpYVDnkVK_9qZNPX7eo-aM0oex0Xf-ExyFL5SVJ8z0aaCUsaGp9nqt3IpBgxIKrMd4_GRuJ0lVIHJblGQnTe53iJGQe2f4WjSos5ioSd8i4rzYAuQWts24uzBm38HQ&x-client-SKU=ID_NET8_0&x-client-ver=7.5.1.0`;
  // window.location.href = authUrl;
};

// Handle the OAuth callback
const handleAuthCallback = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');

  if (accessToken) {
    // Save the token and redirect
    localStorage.setItem('access_token', accessToken);
    router.push('/');
  }
};

if (window.location.pathname === '/auth/callback') {
  handleAuthCallback();
}

/**
 * 情報コンポネートを閉める
 */
const close_div = () => {
  related_info_util.config_related_info(related_info_enum.related_info_no)
  fullscreen_mask.value = related_info_util.fetch_related_info()
}

</script>

<style scoped>
#login-layout {
  margin: 0 auto;
  padding: 0;
  height: 100%;
  user-select: none;
}

.fullscreen-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.version_info_class {
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  width: 600px;
  height: 300px;
  background-color: white;
  /* Add a background color if needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Optional: add some shadow for better visibility */
  z-index: 2;
  /* Ensure it's above the mask */
}

.logo-content {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #085691;
  margin: 60px;
}

.version-number {
  font-size: 16px;
  color: #085691;
  margin-top: auto;
  margin-bottom: 20px; /* Adjust as needed */
  text-align: center;
}


.privacy_policy_class {
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  width: 700px;
  height: 650px;
  background-color: white;
  /* Add a background color if needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Optional: add some shadow for better visibility */
  z-index: 2;
  /* Ensure it's above the mask */
}

.version-info-title {
  text-align: center;
  font-size: 24px;
  color: #085691;
  margin: 10px 0;
  font-weight: bold;
}

.privacy-policy-title {
  text-align: center;
  font-size: 24px;
  color: #085691;
  margin: 10px 0;
  font-weight: bold;
}

.terms-of-use-title {
  text-align: center;
  font-size: 24px;
  color: #085691;
  margin: 10px 0;
  font-weight: bold;
}

.policy-content {
  font-size: 13px;
  color: #085691;
  margin: 30px 20px;
}

.terms_of_use_class {

  position: relative;
  padding: 10px;
  box-sizing: border-box;
  width: 700px;
  height: 650px;
  background-color: white;
  /* Add a background color if needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Optional: add some shadow for better visibility */
  z-index: 2;
  /* Ensure it's above the mask */
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
}

.logo-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-bg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #25548c;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.logo-title {
  color: white;
  font-weight: bold;
}

.service-name-login {
  color: white;
}

.login-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: #F0F3F5;
  border-radius: 13px;
}

.divider {
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
}

.mail-input-field {
  margin-top: 10px;
  margin-left: 20px;
  height: 50%;
  width: 80%;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  outline: none;
}

.mail-input-field::placeholder {
  color: #A5B7C0;
}

.password-input-container {
  margin-left: 20px;
  margin-bottom: 10px;
  position: relative;
  height: 50%;
  width: 100%;
}

.password-input-field {
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  outline: none;
}

.password-input-field::placeholder {
  color: #A5B7C0;
}

.password-icon-container {
  position: absolute;
  top: 60%;
  right: 10%;
  transform: translateY(-50%);
}

.login-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #085691;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Robusta Light', sans-serif;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
}

.login-button-container {
  width: 250px;
  height: 50px;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-button-container:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-sep-container {
  background-color: #FFFFFF;
}

.company-title-footer-text {
  position: absolute;
  color: #06425D;
  text-align: center;
}

.forget-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
}

.forget-password-info {
  color: #FFFFFF;
  text-align: center;
}

.forget-password-enter {
  position: absolute;
  right: 0;
}
</style>
