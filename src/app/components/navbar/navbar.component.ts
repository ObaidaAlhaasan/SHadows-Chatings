import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  editColorMagic: Boolean = false;

  user: Observable<firebase.User>;
  userEmail: string;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.authUser();
    this.user.subscribe(user => {
      this.userEmail = user.email;
    });
  }


  login() {

  }

  logout() {

  }
}
