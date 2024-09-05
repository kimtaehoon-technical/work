/**
 * ホストツール
 */
class host {
  // 単体テスト実施する時には、DOMの環境じゃないため、window変数がないだから、一旦固定される
  static base_url: string = (`development` == process.env.NODE_ENV) ? `http://192.168.1.118:33841/` : (window.location.protocol + `//` + window.location.host)
}

export default host
