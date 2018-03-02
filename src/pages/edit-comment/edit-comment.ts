import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';
import { LogServiceProvider } from "../../providers/log-service/log-service";
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-edit-comment',
  templateUrl: 'edit-comment.html',
})
export class EditCommentPage {
  currentUser: firebase.User;

  commentRef: FirebaseObjectObservable<any>;
  comment: FirebaseObjectObservable<any>;
  previousAnswer: FirebaseObjectObservable<any>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private _log: LogServiceProvider) {

    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);


    const commentId = this.navParams.get('commentId');
    const postId = this.navParams.get('postId');

    this.commentRef = db.object(`/posts/${postId}/comments/${commentId}`);
    this.commentRef.forEach(element => {
      this.comment = element;
      this.previousAnswer = element.text;
    });


  }

  updateComment(comment) {
    var asr = this.previousAnswer;
    var action = "Atualização de comentário";

    comment.startedAt = firebase.database.ServerValue.TIMESTAMP;
    this.commentRef.update(comment);
    this.navCtrl.pop();

    this._log.updatelog(asr, this.currentUser);
    this._log.lastActionLog(action, this.currentUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCommentPage');
  }

}
