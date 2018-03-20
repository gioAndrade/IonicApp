import { StatusBar } from '@ionic-native/status-bar';
import { PostViewPage } from './../post-view/post-view';
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
  logoURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, private  statusBar: StatusBar) {
    this.logoURL = 'https://firebasestorage.googleapis.com/v0/b/blog-di.appspot.com/o/Blog-DI-1-2.png?alt=media&token=a319ddf3-e179-4fb4-b8d5-f0f3b5e7c9f7';

    this.post = db.list('/posts', {
      query: {
        limitToLast: 3
      }
    });
    this.notice = db.list('/notices', {
      query: {
        limitToLast: 3
      }
    });


  }

  openViewPage(postId) {
    this.navCtrl.push(PostViewPage, { postId });
  }

  ionViewDidEnter() {
    this.statusBar.backgroundColorByHexString('#1e475e');
  }

}
