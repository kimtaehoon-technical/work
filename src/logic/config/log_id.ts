/**
 * Log Idについてのこと実装
 */
class log_id {

  // 単列オブジェクト
  private static _instance: log_id
  public static get instance(): log_id {
    if (!this._instance) {
      this._instance = new log_id()
    }
    return this._instance
  }

  private static log_id_key = "log_id_key"

  /**
   * Log Idを返却
   * @returns 
   */
  public fetch(): string {

    let log_id_value = localStorage.getItem(log_id.log_id_key)
    if ((undefined == log_id_value) || (null == log_id_value)) {
      log_id_value = ""
    }
    return log_id_value
  }

  /**
   * Log Idを設定
   * @param current_log_id
   */
  public config(current_log_id: string): void {
    localStorage.setItem(log_id.log_id_key, current_log_id)
  }
}

export default log_id.instance
