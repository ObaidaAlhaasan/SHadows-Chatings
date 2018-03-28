import { Injectable } from '@angular/core';
// models

import { ChatMessageModel } from '../models/chat-msg.model';
// firebase

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AngularFireAuth } from 'angularfire2/auth';
// firebase

import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
// import { AuthService } from './auth.service';

@Injectable()
export class ChatService {
  // Routes
  private addMessageURL = 'http://localhost:8080/messages/addMsg';
  private getMessageURL = 'http://localhost:8080/messages';

  user: any;

  chatMessages: FirebaseListObservable<ChatMessageModel[]>;
  chatMsg: ChatMessageModel;
  userName: Observable<string>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    private http: Http, private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().subscribe(a => {
        this.userName = a.displayName;
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = `/users`;
    return this.db.list(path);
  }

  sendMessage(message: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();

    this.chatMessages.push({
      message,
      timeSent: timestamp,
      userName: this.userName,
      email
    });

  }


  getMessages(): FirebaseListObservable<ChatMessageModel[]> {
    // query to create our list binding
    // query: { limitToLast: 24, orderbykey:true }
    return this.db.list('message', {});
  }


  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();

    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return (date + ' ' + time);
  }

  //  end
}
