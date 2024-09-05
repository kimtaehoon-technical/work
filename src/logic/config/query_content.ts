/**
 * Query Contentについてのこと実装
 */
class query_content {

  // 単列オブジェクト
  private static _instance: query_content
  public static get instance(): query_content {
    if (!this._instance) {
      this._instance = new query_content()
    }
    return this._instance
  }

  private static query_content_key = "query_content_key"

  /**
   * Query Contentを返却
   * @returns 
   */
  public fetch(): string {

    let query_content_value = localStorage.getItem(query_content.query_content_key)
    if ((undefined == query_content_value) || (null == query_content_value)) {
      query_content_value = ""
    }
    return query_content_value
  }

  /**
   * Query Contentを設定
   * @param current_query_content
   */
  public config(current_query_content: string): void {
    localStorage.setItem(query_content.query_content_key, current_query_content)
  }
}

export default query_content.instance
