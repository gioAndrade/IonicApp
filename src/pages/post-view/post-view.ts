import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';


import { MomentModule } from 'angular2-moment';
import firebase from 'firebase';

// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { EditCommentPage } from '../../pages/edit-comment/edit-comment';
import { AnswersPage } from '../../pages/answers/answers';
import { LogServiceProvider } from './../../providers/log-service/log-service';




import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-post-view',
  templateUrl: 'post-view.html',
})
export class PostViewPage {

  private form: FormGroup;
  private currentUser: firebase.User;
  posts: FirebaseObjectObservable<any>;
  post: FirebaseObjectObservable<any>;
  comments: FirebaseListObservable<any>;
  arraySize: FirebaseListObservable<any>;
  idParameter: any;
  likeKey: any;
  createLogs: FirebaseListObservable<any>;
  lastActions: FirebaseListObservable<any>;
  deleteLogs: FirebaseListObservable<any>;
  userLike: FirebaseListObservable<any>;
  userProfile: any = null;
  likeData: FirebaseListObservable<any>;
  showComment: boolean = false;
  like: boolean;
  logoURL: string;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private googlePlus: GooglePlus,
    public afAuth: AngularFireAuth,
    private _auth: AuthServiceProvider,
    private _log: LogServiceProvider,
    private fb: FormBuilder,
    public actionSheetCtrl: ActionSheetController) {
              this.logoURL = 'https://firebasestorage.googleapis.com/v0/b/blog-di.appspot.com/o/Blog-DI-1-2.png?alt=media&token=a319ddf3-e179-4fb4-b8d5-f0f3b5e7c9f7';


    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });

    let postId = navParams.get('postId');
    this.idParameter = postId;
    this.posts = db.object(`/posts/${postId}`);
    this.posts.forEach(element => {
      this.post = element;
    });
    this.comments = db.list(`/posts/${postId}/comments`);
    this.comments.forEach(element => {
      this.arraySize = element;
    });
    this.likeData = db.list(`/posts/${postId}/likeData`);
    this.likeData.subscribe(element => {
      if (element == null) {
        this.like = true
      } else {
        if (this.userProfile) {
          if (this.userProfile.uid == element.userIdLike) {
            this.like = false
          }
        }
      }
      console.log(this.like);

    })
    this.likeData.forEach(element => {
      if (this.userProfile) {
        if (element.userIdLike == this.userProfile.uid) {
          this.likeKey = element.$key;
        }
      }
    });

  }

  btnLike(postInfo) {
    this.like = false;
    this.likeData.push({
      userIdLike: this.userProfile.uid
    });
    this.posts.update({
      numLikes: postInfo.numLikes + 1
    })

  }

  unlike(postInfo) {
    this.like = true;
    this.posts.update({
      numLikes: postInfo.numLikes - 1
    });
    this.likeData.remove(this.likeKey);
    console.log(this.like);
  }



  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Olá!',
      subTitle: 'Você precisa estar logado para comentar!',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');

          }
        },
        {
          text: 'Entrar!',
          handler: data => {
            this._auth.signIn();
          }
        }
      ]
    });
    alert.present();
  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ", this._auth.displayName());
  }

  addComment() {
    var action = 'Publicação de comentário';
    var text = this.form.value["text"];
    this.comments.push({
      commentId: this.navParams.get('commentId'),
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
      startedAt: firebase.database.ServerValue.TIMESTAMP,
      text: text,
      userUid: this.currentUser.uid
    });
    this.form.reset();
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

  respostas(comment) {
    this.navCtrl.push(AnswersPage, {
      commentId: comment.$key,
      postId: this.idParameter
    });
  };

  openMenuComment(comment: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.navCtrl.push(EditCommentPage, {
              commentId: comment.$key,
              postId: this.idParameter
            })
          }
        }, {
          text: 'Deletar',
          role: 'destructive',
          handler: () => {
            var action = 'Comentário excluído';

            this.comments.remove(comment.$key)
            this._log.deleteLog(comment.text, this.currentUser);
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
    console.log('ionViewDidLoad PostViewPage');
    this.posts
  }

}
