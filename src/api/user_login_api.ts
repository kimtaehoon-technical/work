import client from './client'
import link, { key_enum } from './link/link'
import { user_login } from '../model/user_login'

/**
 * ユーザーログイン
 */
class user_login_api {

  // 単列オブジェクト
  private static _instance: user_login_api
  public static get instance(): user_login_api {
    if (!this._instance) {
      this._instance = new user_login_api()
    }
    return this._instance
  }

  // ユーザーログイン
  public async login(params: any): Promise<user_login> {
    console.log(params)
    const res = await client.post<user_login>(link.fetch(key_enum.user_login_link), params)
    return res.data
  }
}

export default user_login_api.instance