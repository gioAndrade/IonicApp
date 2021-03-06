import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';


import { PostViewPage } from '../../pages/post-view/post-view';

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  posts: FirebaseListObservable<any[]>;
  order: string = 'startedAt';
  logoURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.posts = db.list('/posts');
    this.logoURL = 'https://firebasestorage.googleapis.com/v0/b/blog-di.appspot.com/o/Blog-DI-1-2.png?alt=media&token=a319ddf3-e179-4fb4-b8d5-f0f3b5e7c9f7';

  }

  openViewPage(postId) {
    this.navCtrl.push(PostViewPage, { postId });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

}
