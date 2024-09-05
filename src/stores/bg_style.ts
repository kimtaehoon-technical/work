import { defineStore } from 'pinia'
import { ref } from 'vue'
import { id_enum } from '../logic/pinia/pinia_id_enum'
import { bg_style } from '../logic/utils/bg_style'

export const use_bg_style = defineStore(id_enum.bg_style, () => {

  const bg_style = ref<bg_style>()

  const fetch = () => {
    return bg_style.value
  }

  const config = (data: bg_style) => {
    bg_style.value = data
  }

  return { bg_style, fetch, config }
}
  , {
    persist: {
      enabled: true
    }
  }
)