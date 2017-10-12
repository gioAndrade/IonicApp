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

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.posts = db.list('/posts');
  }

  openViewPage(postId) {
    this.navCtrl.push(PostViewPage, {postId});    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

}
