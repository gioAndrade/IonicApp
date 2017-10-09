import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _auth: AuthServiceProvider) {

  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSucess());
  }

  private onSignInSucess(): void {
    console.log("Google display name ", this._auth.displayName());
  }

}
