import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContatoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {

  logoURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.logoURL = 'https://firebasestorage.googleapis.com/v0/b/blog-di.appspot.com/o/Blog-DI-1-2.png?alt=media&token=a319ddf3-e179-4fb4-b8d5-f0f3b5e7c9f7';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoPage');
  }

}
