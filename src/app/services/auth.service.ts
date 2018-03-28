import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Injectable()

export class AuthService {
  private user: Observable<firebase.User>;
  private authState;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,
    private router: Router) {
    this.user = afAuth.authState;
  }

  get currentUserId() {
    console.log(this.authState, 'auth State');

    return this.authState !== null ? this.authState.uid : '';
  }

  authUser() {
    return this.user;
  }

  signUp(email, password, displayName) {
    const newUser = {
      email, password, displayName
    };
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.authState = user;
      const status = 'online';
      this.setUserData(email, status, displayName);
    }).catch(error => console.log(error, 'from register')
    );
  }


  setUserData(email, status, displayName) {
    const path = `users/${this.currentUserId}`;
    const data = {
      email, status, displayName
    };
    this.db.object(path).update(data).catch(error => {
      console.log(error, ' from setUserData');
    });
  }



  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(resolve => {
      const status = 'online';
      this.setUserStatus(status);
      this.router.navigate(['chat']);
    });
  }

  setUserStatus(status) {
    const path = `users/${this.currentUserId}`;
    const data = { status };
    this.db.object(path).update(data).catch(error => {
      console.log(error);
    });
  }




}
