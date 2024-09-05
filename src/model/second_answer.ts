import { second_answer_data } from './second_answer_data'
/**
 * 二次回答（回答）のAPIインタフェース
 */
export interface second_answer {
  code: number,
  detail: string,
  data: second_answer_data | null,
  response: string,
}
