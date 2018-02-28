
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html'
})
export class NoticesPage {

  notices: FirebaseListObservable<any[]>;
  order: string = 'startedAt';
  logoURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.notices = db.list('/notices');
    this.logoURL = 'https://firebasestorage.googleapis.com/v0/b/blog-di.appspot.com/o/Blog-DI-1-2.png?alt=media&token=a319ddf3-e179-4fb4-b8d5-f0f3b5e7c9f7';

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticesPage');
  }

}
