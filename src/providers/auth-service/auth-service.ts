import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';

@Injectable()
export class AuthServiceProvider {
private currentUser: firebase.User;


  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
    
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  // signInWithFacebook(): firebase.Promise<any> {
  //   return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  // }

  signInWithGoogle(): Promise<any>{  
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  displayName(): string {
    if (this.currentUser !== null) {
      return this.currentUser.displayName;
    } else {
      return 'deu errado';
    }
  }

  photoURL(): string {
    if(this.currentUser !== null) {
      return this.currentUser.photoURL;
    }
  }

}
