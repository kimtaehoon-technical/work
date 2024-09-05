import client from './client'
import link, { key_enum } from './link/link'
import { log_read_list } from '@/model/log_read'
import { log_read_data } from '@/model/log_read_data'
import { format_date } from '@/logic/utils/date_util'

/**
 * ログAPI
 */
class log_api {

  // 単列オブジェクト
  private static _instance: log_api
  public static get instance(): log_api {
    if (!this._instance) {
      this._instance = new log_api()
    }
    return this._instance
  }

  // アクテビティログを読み取る
  public async read(params: any): Promise<log_read_list> {
    const request_link = link.fetch(key_enum.aclog_read_link) + "?iSeq_i_page_offset=0&iSeq_i_page_limit=10&auto_error=true"
    const res = await client.post<log_read_list>(request_link, params)
    const log_read_item_list = []
    if (200 == res.status) {
      const log_read_list: log_read_list = res.data[0]
      // ソートする Array.prototype.sort
      log_read_list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      // データ処理
      for (let index = 0; index < log_read_list.length; index++) {
        const element = log_read_list[index]
        if (undefined == element.user_query) {
          continue
        }
        const log_read_item: log_read_data = {
          log_id: element.log_id,
          created_at: format_date(element.created_at),
          user_query: element.user_query,
          faq_id: ''
        }
        log_read_item_list.push(log_read_item)
      }
    }
    return log_read_item_list
  }

  // 回答評価のＡＰＩ（よい、悪い）
  public async update(params: any): Promise<boolean> {
    const request_link = link.fetch(key_enum.aclog_update_link) + "?auto_error=true"
    const res = await client.post<boolean>(request_link, params)
    console.log(res.status)
    if (200 == res.status) {
      return true
    } else {
      return false
    }
  }

}

export default log_api.instance