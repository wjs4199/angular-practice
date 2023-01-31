import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor() { }

  messages: string[] = [];

  // 메세지 추가
  add(message: string) {
    this.messages.push(message);
  }
  // 메세지 배열 삭제
  clear() {
    this.messages = []
  }
}
