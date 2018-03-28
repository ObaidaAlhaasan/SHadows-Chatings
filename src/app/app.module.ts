import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { RouterModule } from '@angular/router';


//  firebase config
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';



// For proxy config to delete / to dont hapend errors
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//  Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { FeedComponent } from './components/feed/feed.component';
import { MessageComponent } from './components/message/message.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';

//  Services
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { environment } from '../environments/environment.prod';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    UserListComponent,
    UserItemComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    FlashMessagesService,
    AuthService,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
