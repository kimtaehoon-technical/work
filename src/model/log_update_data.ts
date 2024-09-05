/**
 * 回答評価のＡＰＩ（よい、悪い）(datas)
 */
export interface log_update_data {
  faq_id: string
  created_at: string,
  user_query: string,
}