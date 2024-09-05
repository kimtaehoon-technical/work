import { use_bg_style } from '../../stores/bg_style'
import { use_related_info } from '../../stores/related_info'
import { use_menu_status } from '../../stores/menu_status'

/**
 * Pinia初期化関数のリスト
 */
export const func_enum = [
  use_bg_style,
  use_related_info,
  use_menu_status,
]