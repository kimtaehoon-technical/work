import { access_token_data } from './access_token_data'
/**
 * ユーザーログインAPIインタフェース
 */
export interface user_login {
  code: number,
  detail: string,
  data: access_token_data | null
}
