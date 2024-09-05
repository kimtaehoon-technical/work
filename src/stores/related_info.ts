import { defineStore } from 'pinia'
import { ref } from 'vue'
import { id_enum } from '../logic/pinia/pinia_id_enum'
import { related_info } from '../logic/utils/related_info'

export const use_related_info = defineStore(id_enum.related_info, () => {

  const related_info = ref<related_info>()

  const fetch = () => {
    return related_info.value
  }

  const config = (data: related_info) => {
    related_info.value = data
  }

  return { related_info, fetch, config }
}
  , {
    persist: {
      enabled: true
    }
  }
)