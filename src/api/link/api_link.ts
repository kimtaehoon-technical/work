/**
 * API LINKについてのこと実装
 */
const api_link = {

  // ユーザーログインAPI
  user_login_link: `/auth/get_access_token_by_user_login`,
  // アクテビティログを読み取る
  aclog_read_link: `/actlog/read`,
  // よくあるお問い合わせ
  non_login_question_link: `/ai-faq/read`,
  // 登録した問い合わせから探し
  login_question_link: `/actlog/read`,
  // マニュアルリスト
  manual_list_link: `/cases-cdocs/read`,
  // 回答評価のＡＰＩ（よい、悪い）
  aclog_update_link: `/actlog/update`,
  // 一次回答
  first_answer_query_link: `/rsng/query`,

  // 二回回答
  second_answer_query_link: `/rsng/query`,
  second_answer_create_link: `/actlog/create`,
}

export default api_link