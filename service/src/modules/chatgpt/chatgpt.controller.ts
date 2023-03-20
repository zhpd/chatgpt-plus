import { All, Controller, Get, Post, Sse, Req } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import type { ConfigOptions } from './chatgpt.service';
import type { ChatMessage, SendMessageOptions } from 'chatgpt';
import type { OutputOptions } from 'src/utils';
import type { Request } from 'express';
import { Observable } from 'rxjs';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @All('message')
  @Sse('message')
  sendMessage(@Req() request: Request): Observable<any> {
    const {
      content,
      options = {},
      config = {},
    } = request.body as {
      content: string;
      options?: SendMessageOptions;
      config?: ConfigOptions;
    };

    console.log('request.body', request.body);
    console.log('request.query', request.query);
    // return stream
    const ob$ = new Observable((subscriber) => {
      this.chatgptService
        .sendMessage(
          content || request?.query?.content?.toString(),
          options,
          config,
          (chat: ChatMessage) => {
            subscriber.next({ data: JSON.stringify(chat) });
          },
        )
        .then((res: OutputOptions<any>) => {
          subscriber.next(res);
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
