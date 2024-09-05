import { second_question_data } from './second_question_data'
/**
 * 二次回答（質問）のAPIインタフェース
 */
export interface second_question {
  code: number,
  detail: string,
  data: second_question_data | null,
  response: string,
}
