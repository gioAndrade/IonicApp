import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userProfile: any = null;

  constructor(public navCtrl: NavController, private _auth: AuthServiceProvider, private googlePlus: GooglePlus) {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.userProfile = user;
        }else{
          this.userProfile = null;
        }
      });
  }

  loginUser(): void {
    this.googlePlus.login({
      'webClientId': '332658053860-g2sh29627vn0692d8trtde6f83uo2vq8.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then( success => {
          console.log("Firebase sucess: " + JSON.stringify(success));          
        })
        .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
    }).catch(err => console.error(err));
  }

  // signInWithGoogle(): void {
  //   this._auth.signInWithGoogle()
  //     .then(() => this.onSignInSucess());
  // }

  // private onSignInSucess(): void {
  //   console.log("Google display name ", this._auth.displayName());
  // }

}
