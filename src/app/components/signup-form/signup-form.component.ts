import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  email: String; password: String; displayName: String; errorMsg: string;
  constructor(private router: Router, private auth_service: AuthService, public flash: FlashMessagesService) { }

  ngOnInit() {
  }

  signUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.auth_service.signUp(email, password, displayName).then(result => {
      if (result) {


        this.router.navigate(['signup']);
      }
      this.router.navigate(['chat']);
    }).catch(error => {
      this.errorMsg = error.message;
      this.flash.show(this.errorMsg, { cssClass: 'alert-danger' });
    });
  }
}
