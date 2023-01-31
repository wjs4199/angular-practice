import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  // angular에서는 퍼블릭으로 선언된 프로퍼티만 바인딩 할 수 있음
  constructor(public messageService: MessageService) {
  }
  ngOnInit() {
  }

  

}
