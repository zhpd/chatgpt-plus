import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  ChatGPTAPI,
  ChatGPTUnofficialProxyAPI,
  ChatGPTAPIOptions,
  ChatMessage,
  SendMessageOptions,
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
  API_TYPE?: 'chatgpt-api' | 'chatgpt-proxy';
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
    config: ConfigOptions,
    completionParams?: SendMessageOptions['completionParams'],
  ): Promise<ChatGPTAPI | ChatGPTUnofficialProxyAPI> {
    const API_TYPE =
      config?.API_TYPE || this.config.get('API_TYPE') || 'chatgpt-proxy';
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

    const options: ChatGPTAPIOptions = {
      apiKey: OPENAI_API_KEY,
      completionParams: {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        top_p: 0.8,
        ...completionParams,
      },
      fetch,
      debug: false,
    };

    let api = this.api;
    // chatgpt-api style
    if (API_TYPE == 'chatgpt-api') {
      api = new ChatGPTAPI({
        apiKey: OPENAI_API_KEY,
        completionParams: {
          temperature: 0.5,
          top_p: 0.8,
          ...completionParams,
        },
        ...options,
      });
    }
    // chatgpt-proxy style
    if (API_TYPE == 'chatgpt-proxy') {
      api = new ChatGPTUnofficialProxyAPI({
        accessToken: OPENAI_ACCESS_TOKEN,
        apiReverseProxyUrl:
          API_REVERSE_PROXY || 'https://bypass.duti.tech/api/conversation',
        model: options?.completionParams?.model,
        ...options,
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
    opt?: SendMessageOptions,
    config?: ConfigOptions,
    onProgress?: (chat: ChatMessage) => void,
  ): Promise<OutputOptions> {
    const api = await this.getApi(config, opt?.completionParams);
    const options: SendMessageOptions = opt;
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
