import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    post: FirebaseListObservable<any[]>;
  notice: FirebaseListObservable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.post = db.list('/posts', {
      query: {
        limitToLast: 1
      }
    });
    this.notice = db.list('/notices', {
      query: {
        limitToLast:1
      }
    });


  }

}
