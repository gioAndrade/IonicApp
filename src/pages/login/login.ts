import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {



  constructor(public navCtrl: NavController, private _auth: AuthServiceProvider, private googlePlus: GooglePlus) {
      
  }

  

    // signInWithGoogle(): void {
  //   this._auth.signInWithGoogle()
  //     .then(() => this.onSignInSucess());
  // }

  // private onSignInSucess(): void {
  //   console.log("Google display name ", this._auth.displayName());
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
