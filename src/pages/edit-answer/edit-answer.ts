import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { LogServiceProvider } from './../../providers/log-service/log-service';


@IonicPage()
@Component({
  selector: 'page-edit-answer',
  templateUrl: 'edit-answer.html',
})
export class EditAnswerPage {
  currentUser: firebase.User;

  answerRef: FirebaseObjectObservable<any>;
  answer: FirebaseObjectObservable<any>;
  previousAnswer: FirebaseObjectObservable<any>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private _log: LogServiceProvider
  ) {

    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);


    const commentId = this.navParams.get('commentId');
    const postId = this.navParams.get('postId');
    const answerId = this.navParams.get('answerId');

    this.answerRef = db.object(`/posts/${postId}/comments/${commentId}/answers/${answerId}`);
    this.answerRef.forEach(element => {
      this.answer = element;
      this.previousAnswer = element.text;
    });

  }

  updateAnswer(newAnswer) {
    var asr = this.previousAnswer;
    var action = "Atualização de comentário";
    newAnswer.startedAt = firebase.database.ServerValue.TIMESTAMP;
    this.answerRef.update(newAnswer);
    this.navCtrl.pop();

    this._log.updatelog(asr,this.currentUser);
    this._log.lastActionLog(action, this.currentUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAnswerPage');
  }

}
