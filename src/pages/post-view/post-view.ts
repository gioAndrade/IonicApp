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
  idParameter: any;
  userProfile: any = null;

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

    let postId = navParams.get('postId');
    this.idParameter = postId;
    this.posts = db.object(`/posts/${postId}`);
    
    this.comments = db.list(`/posts/${postId}/comments`);
    this.posts.forEach(element => {
      this.post = element;
    });

    console.log(this.currentUser);
    

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });
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
      startedAt: Date.now(),
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
            console.log('Archive clicked');
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
