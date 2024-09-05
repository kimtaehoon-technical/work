import { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import client_status, { client_status_enum } from './client_status'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormData from 'form-data'
import access_token from '@/logic/config/access_token'
class client {

  // 単列オブジェクト
  private static _instance: client
  public static get instance(): client {
    if (!this._instance) {
      this._instance = new client()
    }
    return this._instance
  }

  public client: AxiosInstance
  public token: string | undefined | null
  public router: any

  constructor() {
    // this.router = useRouter()
    // 初期化
    this.client = client_status.client_config(client_status.status)
    // リクエストインターセプター
    this.client.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        return res
      },
      (err: any) => err
    )

    // レスポンスインターセプター
    this.client.interceptors.response.use(
      (res: AxiosResponse) => {
        const endTime = ref(new Date().getTime())
        // 200以外の場合、APIエラーメッセージを表示する
        if (res.data.code != `200`) {
          if (res.data && (res.data.message != undefined || res.data.message != null)) {
            console.log(res.data)
            console.log(res.data.code)
          }
        }
        return res
      },
      (error: any) => {
        return error.response
      }
    )
  }

  /**
   * POST場合、資源を取得
   * @param url リクエストURL
   * @param data リクエストデータ
   * @param config リクエストコンフィグ、ちなみに、form_data場合、値必要がないため、undefinedが設定され。
   * @param is_form_data form_data形リクエストか否か、設定する
   * @returns 
   */
  public async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
    is_form_data = true): Promise<any> {

    // DEV & TEST& PROD場合、mockのリクエスト時に、JSON資源が取得され方法GETだけ、なぜ？NGINXから修正コツ
    if (client_status.status == client_status_enum.dev) {

      let headers = {
        'Content-Type': 'application/json',
        'Content-Encoding': 'gzip, deflate, br',
        'Authorization': `Bearer ${access_token.fetch()}`,
      }

      if (true == is_form_data) {
        headers['Content-Type'] = 'multipart/form-data'
        if (data instanceof FormData) {
          data = data as unknown as D;
        }
        else if (data && typeof data === 'object') {
          const formData = new FormData();
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              formData.append(key, (data as any)[key])
            }
          }
          data = formData as unknown as D;
        }
      }

      return client.instance.client.post<T, R, D>(url, data, {
        headers: headers,
        ...config
      })
    } else {
      const local_url = window.location.protocol + `//` + window.location.host + "/" + url
      const response = await fetch(local_url)
      const response_content = await response.json()
      return { 'data': response_content }
    }
  }
}

export default client.instance