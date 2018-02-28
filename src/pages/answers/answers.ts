import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';

import firebase from 'firebase';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-answers',
  templateUrl: 'answers.html',
})
export class AnswersPage {

  private currentUser: firebase.User;
  allAnswersRef: FirebaseListObservable<any>;
  answerRef: FirebaseObjectObservable<any>;
  answer: FirebaseObjectObservable<any>;
  userProfile: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private _auth: AuthServiceProvider,
  ) {

    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);


    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });

    const commentId = this.navParams.get('commentId');
    const postId = this.navParams.get('postId');
    const answerId = this.navParams.get('postId');

    this.allAnswersRef = db.list(`/posts/${postId}/comments/${commentId}/answers`);
    this.answerRef = db.object(`/posts/${postId}/comments/${commentId}/answers/${answerId}`);
    this.answerRef.forEach(element => {
      this.answer = element;
    });
  }

  createAnswer(newAnswer: any) {
    this.allAnswersRef.push({
      action: "Publicação de comentário",
      commentId: this.navParams.get('commentId'),
      createdBy: "Usuário Google",
      displayName: this.currentUser.displayName,
      photoURL:this.currentUser.photoURL,
      startedAt: firebase.database.ServerValue.TIMESTAMP,
      text: newAnswer,
      userUid:this.currentUser.uid
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswersPage');
  }

}
