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

}
