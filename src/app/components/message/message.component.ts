import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChatMessageModel } from '../../models/chat-msg.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {
  @Input() chatMessag: ChatMessageModel;
  userEmail: String;
  userName: String;
  messageContent: String;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  constructor() { }

  ngOnInit(chatMessage = this.chatMessag) {
    this.messageContent = this.chatMessag.message;
    this.timeStamp = this.chatMessag.timeSent;
    this.userEmail = this.chatMessag.email;
    this.userName = this.chatMessag.userName;
  }
  ngOnChanges(chatMessage = this.chatMessag) {
    this.messageContent = this.chatMessag.message;
    this.timeStamp = this.chatMessag.timeSent;
    this.userEmail = this.chatMessag.email;
    this.userName = this.chatMessag.userName;
  }

}
