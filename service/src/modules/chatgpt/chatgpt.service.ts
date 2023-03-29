import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  ChatGPTAPI,
  ChatGPTUnofficialProxyAPI,
  ChatGPTAPIOptions,
  ChatMessage,
  SendMessageOptions,
  SendMessageBrowserOptions,
} from 'chatgpt';
// import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
// import fetch from 'node-fetch';
import type { OutputOptions } from 'src/utils';
import { output } from 'src/utils';

// fixed load esm module
export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

export interface ConfigOptions {
  API_TYPE?: 'chatgpt-api' | 'chatgpt-web';
  OPENAI_API_KEY?: string;
  OPENAI_ACCESS_TOKEN?: string;
  API_REVERSE_PROXY?: string;
}

@Injectable()
export class ChatgptService {
  setConfig(): OutputOptions<any> | PromiseLike<OutputOptions<any>> {
    throw new Error('Method not implemented.');
  }
  private api: ChatGPTAPI | ChatGPTUnofficialProxyAPI;

  constructor(private config: ConfigService) {}

  async getApi(
    options?: SendMessageOptions & SendMessageBrowserOptions,
    config?: ConfigOptions,
  ): Promise<ChatGPTAPI | ChatGPTUnofficialProxyAPI> {
    const API_TYPE =
      config?.API_TYPE || this.config.get('API_TYPE') || 'chatgpt-web';
    const OPENAI_API_KEY =
      config?.OPENAI_API_KEY || this.config.get('OPENAI_API_KEY');
    const OPENAI_ACCESS_TOKEN =
      config?.OPENAI_ACCESS_TOKEN || this.config.get('OPENAI_ACCESS_TOKEN');
    const API_REVERSE_PROXY =
      config?.API_REVERSE_PROXY || this.config.get('API_REVERSE_PROXY');

    // async load chatgpt
    const { ChatGPTAPI, ChatGPTUnofficialProxyAPI } = await importDynamic(
      'chatgpt',
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let fetch = await importDynamic('node-fetch');
    fetch = fetch.default;

    const _options: ChatGPTAPIOptions = {
      apiKey: '',
      fetch,
      debug: false,
    };

    let api = this.api;
    // chatgpt-api style
    if (API_TYPE == 'chatgpt-api') {
      api = new ChatGPTAPI({
        apiKey: OPENAI_API_KEY,
        apiBaseUrl: API_REVERSE_PROXY || 'https://api.openai.com/v1',
        completionParams: {
          model: 'gpt-3.5-turbo',
          temperature: 0.8,
          top_p: 1.0,
          presence_penalty: 1.0,
          ...(options as SendMessageOptions)?.completionParams,
        },
        maxModelTokens: 4000,
        maxResponseTokens: 1000,
        ..._options,
      });
    }
    // chatgpt-web style
    if (API_TYPE == 'chatgpt-web') {
      api = new ChatGPTUnofficialProxyAPI({
        accessToken: OPENAI_ACCESS_TOKEN,
        apiReverseProxyUrl:
          API_REVERSE_PROXY || 'https://bypass.duti.tech/api/conversation',
        model: 'text-davinci-002-render-sha',
        ..._options,
      });
    }

    this.api = api;
    return this.api;
  }

  /**
   * send message
   * @param text
   * @param opt
   * @param onProgress
   * @returns
   */
  async sendMessage(
    text: string,
    options?: SendMessageOptions & SendMessageBrowserOptions,
    config?: ConfigOptions,
    onProgress?: (chat: ChatMessage) => void,
  ): Promise<OutputOptions> {
    const api = await this.getApi(options, config);
    let resData: ChatMessage;
    await api.sendMessage(text, {
      ...options,
      // print the partial response as the AI is "typing"
      onProgress: (partialResponse) => {
        console.log('gpt:', partialResponse);
        resData = partialResponse;
        onProgress?.(partialResponse);
      },
    });
    return output({ code: 0, data: resData });
  }

  /**
   * get account bill token
   */
  async getBill(): Promise<OutputOptions> {
    // throw new Error('Method not implemented.');
    return output({ code: 0, data: null });
  }
}
