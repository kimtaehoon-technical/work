import { defineStore } from 'pinia'
import { ref } from 'vue'
import { id_enum } from '../logic/pinia/pinia_id_enum'
import { menu_status } from '../logic/utils/menu_status'

export const use_menu_status = defineStore(id_enum.menu_status, () => {

  const menu_status = ref<menu_status>()

  const fetch = () => {
    return menu_status.value
  }

  const config = (data: menu_status) => {
    menu_status.value = data
  }

  return { menu_status, fetch, config }
}
  , {
    persist: {
      enabled: true
    }
  }
)