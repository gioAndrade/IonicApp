import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-edit-comment',
  templateUrl: 'edit-comment.html',
})
export class EditCommentPage {

  commentRef: FirebaseObjectObservable<any>;
  comment: FirebaseObjectObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase) {

    const commentId = this.navParams.get('commentId');
    const postId = this.navParams.get('postId');   
    
    this.commentRef = db.object(`/posts/${postId}/comments/${commentId}`);
    this.commentRef.forEach(element => {
      this.comment = element;
    });
    
    
  }

  updateComment(comment) {
    comment.startedAt= firebase.database.ServerValue.TIMESTAMP;
    this.commentRef.update(comment);       
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCommentPage');
  }

}
