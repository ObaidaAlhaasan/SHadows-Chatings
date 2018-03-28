import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs/Observable';
import { ChatMessageModel } from '../../models/chat-msg.model';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: FirebaseListObservable<ChatMessageModel[]>;
  constructor(private chat_service: ChatService) { }

  ngOnInit() {
    this.feed = this.chat_service.getMessages();
  }

  ngOnChanges() {
    this.feed = this.chat_service.getMessages();

  }

}
