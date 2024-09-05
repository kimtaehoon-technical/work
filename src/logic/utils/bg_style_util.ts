import p from '../pinia/pinia_util'
import { id_enum } from '../pinia/pinia_id_enum'
import { bg_enum } from './bg_enum'


/**
 * BGスタイルツール
 */
class bg_style_util {
  // 単列オブジェクト
  private static _instance: bg_style_util
  public static get instance(): bg_style_util {
    if (!this._instance) {
      this._instance = new bg_style_util()
    }
    return this._instance
  }

  /**
   * BGスタイルを設定
   * @param bg_enum 
   * @returns 
   */
  public config_bg_style(bg_enum: bg_enum) {
    const pinia_bg_style = p.fetch(id_enum.bg_style)
    // piniaに保存する
    pinia_bg_style.config(bg_enum)
  }

  /**
   * BGスタイルを返却
   * @returns 
   */
  public bg_style() {
    const pinia_bg_style = p.fetch(id_enum.bg_style)
    // piniaからBGスタイルを返却
    return pinia_bg_style.fetch()
  }
}

export default bg_style_util.instance