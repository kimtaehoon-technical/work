/**
 * Access Tokenについてのこと実装
 */
class access_token {

  // 単列オブジェクト
  private static _instance: access_token
  public static get instance(): access_token {
    if (!this._instance) {
      this._instance = new access_token()
    }
    return this._instance
  }

  private static access_token_key = "access_token_key"

  /**
   * Access Tokenを返却
   * @returns 
   */
  public fetch(): string {

    let access_token_value = localStorage.getItem(access_token.access_token_key)
    if ((undefined == access_token_value) || (null == access_token_value)) {
      access_token_value = ""
    }
    return access_token_value
  }

  /**
   * Access Tokenを設定
   * @param current_access_token 
   */
  public config(current_access_token: string): void {
    localStorage.setItem(access_token.access_token_key, current_access_token)
  }
}

export default access_token.instance
