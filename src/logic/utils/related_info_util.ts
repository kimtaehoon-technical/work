import p from '../pinia/pinia_util'
import { id_enum } from '../pinia/pinia_id_enum'
import { related_info_enum } from './related_info_enum'


/**
 * 関連情報ツール
 */
class related_info_util {
  // 単列オブジェクト
  private static _instance: related_info_util
  public static get instance(): related_info_util {
    if (!this._instance) {
      this._instance = new related_info_util()
    }
    return this._instance
  }

  /**
   * 関連情報を設定
   * @param related_info_enum 
   * @returns 
   */
  public config_related_info(related_info_enum: related_info_enum) {
    const pinia_related_info = p.fetch(id_enum.related_info)
    // piniaに保存する
    pinia_related_info.config(related_info_enum)
  }

  /**
   * 関連情報を返却
   * @returns 
   */
  public fetch_related_info() {
    const pinia_related_info = p.fetch(id_enum.related_info)
    // piniaから関連情報を返却
    return pinia_related_info.fetch()
  }
}

export default related_info_util.instance