/**
 * アクテビティログを読み取る(datas)
 */
export interface log_read_data {
  log_id: string
  faq_id: string
  created_at: string,
  user_query: string,
}