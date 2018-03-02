import { EditAnswerPage } from './../edit-answer/edit-answer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';

import firebase from 'firebase';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { LogServiceProvider } from './../../providers/log-service/log-service';



@IonicPage()
@Component({
  selector: 'page-answers',
  templateUrl: 'answers.html',
})
export class AnswersPage {

  private currentUser: firebase.User;
  private form: FormGroup;
  idParameter: any;
  commentId: any;
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
    private _log: LogServiceProvider,
    private fb: FormBuilder,
    public actionSheetCtrl: ActionSheetController
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
    this.idParameter = postId;
    this.commentId = commentId;

    this.allAnswersRef = db.list(`/posts/${postId}/comments/${commentId}/answers`);
    this.answerRef = db.object(`/posts/${postId}/comments/${commentId}/answers/${answerId}`);
    this.answerRef.forEach(element => {
      this.answer = element;
    });
  }

  createAnswer() {
    var action = 'Publicação de comentário';

    var text = this.form.value["text"];
    this.form.reset();

    this.allAnswersRef.push({
      commentId: this.navParams.get('commentId'),
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
      startedAt: firebase.database.ServerValue.TIMESTAMP,
      text: text,
      userUid: this.currentUser.uid
    });
    this._log.createLog(text, this.currentUser);
    this._log.lastActionLog(action, this.currentUser);
  }

  initForm() {
    this.form = this.fb.group({
      text: null
    });
  }

  ngOnInit() {
    this.initForm();
  }

  openMenuComment(answer: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.navCtrl.push(EditAnswerPage, {
              answerId: answer.$key,
              postId: this.idParameter,
              commentId: this.commentId

            })
          }
        }, {
          text: 'Deletar',
          role: 'destructive',
          handler: () => {
            var action = 'Comentário excluído';
            this.allAnswersRef.remove(answer.$key)
            this._log.deleteLog(answer.text, this.currentUser);
            this._log.lastActionLog(action, this.currentUser);

          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswersPage');
  }

}
