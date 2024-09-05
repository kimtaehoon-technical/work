import client from './client';
import link, { key_enum } from './link/link';
import axios from 'axios';
import user_login_api from './user_login_api';
import { user_login } from '../model/user_login';
import api_link from './link/api_link';

const getAccessToken = async () => {
  const access_token_data: user_login = await user_login_api.login({
    "api_user_id": "pkutech_bot",
    "api_user_pass": "Pie2eiNo",
    "app_user_id": "user_id"
  });
  console.log(access_token_data);
  return localStorage.getItem('access_token_key');
};

/**
 * 回答API
 */
class answer_api_second {
  private static _instance: answer_api_second;

  public static get instance(): answer_api_second {
    if (!this._instance) {
      this._instance = new answer_api_second();
    }
    return this._instance;
  }

  public async fetch_second_answer(params: any) {
    console.log(params);
    try {
      const accessToken = await getAccessToken();
      console.log(accessToken)
      const queryString = new URLSearchParams(params).toString();
      console.log('Encoded query string:', queryString);

      const requestBody = `rsng_query_input=${encodeURIComponent(queryString)}&deployment_tag=mri_aifaq_aoai_e3large_gpt4_0613_api_1201&rsng=query&lSin_cdoc_id=&node_list_retrieved=`;
      const urlLink = `api${api_link.second_answer_query_link}?auto_error=true`;
      const response = await axios.post(
        urlLink,
        requestBody,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('Response:', response.data);

      const sourceNodes = response.data?.data?.rsng_query_result?.source_nodes || [];
      const thirdElementText = sourceNodes[2]?.node?.text;

      const create_form_data = new FormData();
      create_form_data.append("text", decodeURIComponent(queryString));
      create_form_data.append("deployment_tag", "mri_aifaq_aoai_e3large_gpt4_0613_api_1201");
      create_form_data.append("rsng", "complete")
      create_form_data.append("node_list_retrieved", thirdElementText + "（回答内容にコード以外の部分を日本語で及びMarkdown記法の箇条書き形式で整形してください。）" || "");

      const urlLink_complete = `api${api_link.second_answer_query_link}?auto_error=true`;
      const response_complete = await axios.post(
        urlLink_complete,
        create_form_data,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
         },
        }
      );

      console.log('Response:', response_complete.data);

      const second_answer_complete = response_complete.data?.data?.rsng_query_result?.response || [];
      console.log(second_answer_complete);

      return second_answer_complete.length > 0 ? second_answer_complete : null;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  }
}

export default answer_api_second.instance;