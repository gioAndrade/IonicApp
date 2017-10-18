import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';


import { MomentModule } from 'angular2-moment';
import firebase from 'firebase';

// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { EditCommentPage } from '../../pages/edit-comment/edit-comment';


import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-post-view',
  templateUrl: 'post-view.html',
})
export class PostViewPage {

  private currentUser: firebase.User;
  posts: FirebaseObjectObservable<any>;
  post: FirebaseObjectObservable<any>;
  comments: FirebaseListObservable<any>;
  arraySize: FirebaseListObservable<any>;
  idParameter: any;
  likeKey: any;
  userLike: FirebaseListObservable<any>;
  userProfile: any = null;
  likeData: FirebaseListObservable<any>;
  showComment: boolean = false;
  like: boolean;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private googlePlus: GooglePlus,
    public afAuth: AngularFireAuth,
    private _auth: AuthServiceProvider,
    public actionSheetCtrl: ActionSheetController) {

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
            this.googlePlus.login({
              'webClientId': '332658053860-g2sh29627vn0692d8trtde6f83uo2vq8.apps.googleusercontent.com',
              'offline': true
            }).then(res => {
              firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                .then(success => {
                  console.log("Firebase sucess: " + JSON.stringify(success));
                })
                .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
            }).catch(err => console.error(err));
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

  addComment(newComment: any) {
    this.comments.push({
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
      startedAt: firebase.database.ServerValue.TIMESTAMP,
      text: newComment,
      userUid: this.currentUser.uid
    });
  }

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
            this.comments.remove(comment.$key)
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
