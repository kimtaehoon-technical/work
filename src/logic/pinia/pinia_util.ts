import { id_enum } from './pinia_id_enum'
import { func_enum } from './pinia_function_enum'

/**
 * Pinia操作ツール
 */
class p {

  // 単列オブジェクト
  private static _instance: p
  public static get instance(): p {
    if (!this._instance) {
      this._instance = new p()
    }
    return this._instance
  }

  private store_list: any = []

  /**
   * Pinia全てのアイテム初期化
   */
  public init() {

    /**
     * this.store_list中にアイテムあれば、直接に戻る
     */
    if (this.store_list.length > 0) {
      return
    }

    for (let index = 0; index < func_enum.length; index++) {
      const current_store_function = func_enum[index]
      this.store_list.push(current_store_function())
    }
  }

  /**
   * あるPiniaのアイテムを取得
   * 
   * @param target 取得ユニークIDの名前
   * @returns 
   */
  public fetch(target: id_enum) {

    let current_store
    for (let index = 0; index < this.store_list.length; index++) {
      const store_item = this.store_list[index]
      if (target == store_item.$id) {
        current_store = store_item
      }
    }

    return current_store
  }
}

export default p.instance

