import axios, { AxiosInstance } from "axios"
import host from "../logic/utils/host_util"
import access_token from "@/logic/config/access_token"

export enum client_status_enum {
  kari = `kari`, // 仮環境
  dev = `dev`, // 開発環境
  test = `test`, // テスト環境
  prod = `prod`, // 生産環境
  // 意外のこと
  others = `others`
}
class client_status {

  // 単列オブジェクト
  private static _instance: client_status
  public static get instance(): client_status {
    if (!this._instance) {
      this._instance = new client_status()
    }
    return this._instance
  }

  // クライアント環境設定
  public status: client_status_enum = client_status_enum.dev

  public client_config(status: client_status_enum) {

    let current_client: AxiosInstance

    switch (status) {
      case client_status_enum.dev:
        current_client = client_status.api_client_dev
        break;
      default:
        // デフォルトの際、Kariを設定する
        current_client = client_status.api_client_dev
        break;
    }
    return current_client
  }

  /**
   * リクエストヘッダ
   */
  private static headers = {
    'Content-Type': 'application/json',
    'Content-Encoding': 'gzip, deflate, br',
    'Authorization': access_token.fetch(),
  }



  /**
   * 開発環境 （API環境）
   */
  private static api_client_dev: AxiosInstance = axios.create({
    // APIのURI
    baseURL: `/api`,
    // リクエストヘッダ
    headers: client_status.headers,
  })

  // /**
  //  * 生産DEV環境（API環境）
  //  */
  // private static api_client_prod_dev: AxiosInstance = axios.create({
  //     // APIのURI NGINXから
  //     baseURL: `https://dev-selimic-work.imic.or.jp/api`,
  //     // リクエストヘッダ
  //     headers: client_status.headers,
  // })

  // /**
  //  * 生産TEST環境（API環境）
  //  */
  // private static api_client_prod_test: AxiosInstance = axios.create({
  //     // APIのURI NGINXから
  //     baseURL: `https://test-selimic-work.imic.or.jp/api`,
  //     // リクエストヘッダ
  //     headers: client_status.headers,
  // })

  // /**
  //  * 生産本番環境（API環境）
  //  */
  // private static api_client_prod_honban: AxiosInstance = axios.create({
  //     // APIのURI NGINXから
  //     baseURL: `https://selimic-work.imic.or.jp/api`,
  //     // リクエストヘッダ
  //     headers: client_status.headers,
  // })
}

export default client_status.instance
