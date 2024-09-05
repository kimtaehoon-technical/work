import p from '../pinia/pinia_util'
import { id_enum } from '../pinia/pinia_id_enum'
import { menu_enum } from './menu_enum'


/**
 * メーニュ情報ツール
 */
class menu_status_util {
  // 単列オブジェクト
  private static _instance: menu_status_util
  public static get instance(): menu_status_util {
    if (!this._instance) {
      this._instance = new menu_status_util()
    }
    return this._instance
  }

  /**
   * メーニュ情報を設定
   * @param menu_enum 
   * @returns 
   */
  public config_menu_status(menu_enum: menu_enum) {
    const pinia_menu_status = p.fetch(id_enum.menu_status)
    // piniaに保存する
    pinia_menu_status.config(menu_enum)
  }

  /**
   * メーニュ情報を返却
   * @returns 
   */
  public menu_status() {
    const pinia_menu_status = p.fetch(id_enum.menu_status)
    // piniaからメーニュ情報を返却
    return pinia_menu_status.fetch()
  }
}

export default menu_status_util.instance