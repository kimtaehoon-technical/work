import client_status, { client_status_enum } from "../client_status"
import api_link from "./api_link"
import kari_link from "./kari_link"

/**
 * Link関するユニークキーの名前
 */
export enum key_enum {
  // ユーザーログイン
  user_login_link = `user_login_link`,
  // アクテビティログを読み取る
  aclog_read_link = `aclog_read_link`,
  // よくあるお問い合わせ
  non_login_question_link = `non_login_question_link`,
  // 登録した問い合わせから探し
  login_question_link = `login_question_link`,
  // マニュアルリスト
  manual_list_link = `manual_list_link`,
  // 回答評価のＡＰＩ（よい、悪い）
  aclog_update_link = `aclog_update_link`,
  // 二回回答
  second_answer_query_link = `second_answer_query_link`,
  second_answer_create_link = `second_answer_create_link`,
}

/**
 * LINKについてのこと実装
 */
class link {

  // 単列オブジェクト
  private static _instance: link
  public static get instance(): link {
    if (!this._instance) {
      this._instance = new link()
    }
    return this._instance
  }

  // 実際のLinkを戻る
  public fetch(api_name: any): string {

    const is_api = (client_status.status == client_status_enum.dev) || (client_status.status == client_status_enum.test) || (client_status.status == client_status_enum.prod)
    const link_series = is_api ? api_link : kari_link
    let content = ``
    const index = Object.keys(link_series).indexOf(api_name)
    if (index != -1) {
      content = Object.values(link_series)[index]
    }
    return content
  }
}

export default link.instance