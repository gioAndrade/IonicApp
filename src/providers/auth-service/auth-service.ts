import { GooglePlus } from '@ionic-native/google-plus';
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


  constructor(public afAuth: AngularFireAuth, private googlePlus: GooglePlus) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);

  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  // signInWithFacebook(): firebase.Promise<any> {
  //   return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  // }

  signInWithGoogle(): Promise<any> {
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
    if (this.currentUser !== null) {
      return this.currentUser.photoURL;
    }
  }

  signIn() {
    this.googlePlus.login({
      'webClientId': '332658053860-g2sh29627vn0692d8trtde6f83uo2vq8.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(success => {
          console.log("Firebase sucess: " + JSON.stringify(success));
        })
        .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
    }).catch(err => console.error(err));
  }

}
