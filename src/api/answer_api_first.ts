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
class answer_api_first {
  private static _instance: answer_api_first;

  public static get instance(): answer_api_first {
    if (!this._instance) {
      this._instance = new answer_api_first();
    }
    return this._instance;
  }

  public async fetch_first_answer(params: any) {
    console.log(params);
    try {
      const accessToken = await getAccessToken();
      console.log(accessToken)
      const queryString = new URLSearchParams(params).toString();
      console.log('Encoded query string:', queryString);

      const create_form_data = new FormData();
      create_form_data.append("text", decodeURIComponent(queryString));
      create_form_data.append("deployment_tag", "mri_faqNew_aoai_e3large_gpt4_0613_api_1201");
      create_form_data.append("rsng", "query")
     
      const urlLink = `api${api_link.first_answer_query_link}?auto_error=true`;
      const response = await axios.post(
        urlLink,
        create_form_data,
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
      if (sourceNodes.length > 0) {
        const firstElementText = sourceNodes[0]?.node?.text;
        return firstElementText && firstElementText.length > 0 ? firstElementText : null;
      } else {
        console.log('Not enough elements in source_nodes array');
        return null;
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      return null;
    }
  }
}

export default answer_api_first.instance;