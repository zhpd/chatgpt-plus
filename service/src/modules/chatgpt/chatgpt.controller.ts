import { All, Controller, Get, Post, Sse, Req } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import type { ConfigOptions } from './chatgpt.service';
import type {
  ChatMessage,
  SendMessageBrowserOptions,
  SendMessageOptions,
} from 'chatgpt';
import type { OutputOptions } from '../../utils';
import type { Request } from 'express';
import { Observable } from 'rxjs';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @All('chat')
  @Sse('chat')
  sendMessage(@Req() request: Request): Observable<any> {
    const {
      text,
      options = {},
      config = {},
    } = request.body as {
      text: string;
      options?: SendMessageOptions & SendMessageBrowserOptions;
      config?: ConfigOptions;
    };

    console.log('request.body', request.body);
    console.log('request.query', request.query);
    // return stream
    const ob$ = new Observable((subscriber) => {
      this.chatgptService
        .sendMessage(
          text || request?.query?.text?.toString(),
          options,
          config,
          (chat: ChatMessage) => {
            subscriber.next(JSON.stringify(chat));
          },
        )
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((res: OutputOptions<any>) => {
          subscriber.next(JSON.stringify({ complete: true, ...res?.data }));
          subscriber.complete();
        })
        .catch((err) => {
          console.log('err', err);
          subscriber.next(JSON.stringify({ error: true, err: err?.message }));
          // subscriber.error(err);
          subscriber.complete();
        });
    });
    return ob$;
  }

  @Get('set')
  async setConfig(): Promise<OutputOptions<any>> {
    return await this.chatgptService.setConfig();
  }

  @Get('bill')
  async getBill(): Promise<OutputOptions<any>> {
    return await this.chatgptService.getBill();
  }
}
