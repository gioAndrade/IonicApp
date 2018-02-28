import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NoticesPage } from './../pages/notices/notices';
import { PostsPage } from './../pages/posts/posts';
import { SobrePage } from './../pages/sobre/sobre';
import { ContatoPage } from './../pages/contato/contato';
import { AnswersPage } from './../pages/answers/answers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PostsPage;

  userProfile: any = null;
  logoURL: string;

  pages: Array<{ title: string, icon?: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _auth: AuthServiceProvider,
    private googlePlus: GooglePlus) {

    this.initializeApp();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });

    this.logoURL = 'https://firebasestorage.googleapis.com/v0/b/blog-di.appspot.com/o/Blog-DI-1-2.png?alt=media&token=a319ddf3-e179-4fb4-b8d5-f0f3b5e7c9f7';


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home',component: HomePage },
      { title: 'Avisos', icon: 'alert', component: NoticesPage },
      { title: 'Notícias', icon: 'chatboxes', component: PostsPage },
      { title: 'Sobre', icon: 'contacts', component: SobrePage },
      { title: 'Contato', icon: 'information', component: ContatoPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    //   var notificationOpenedCallback = function (jsonData) {
    //     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    //   };

    //   window["plugins"].OneSignal
    //     .startInit("109807f2-9861-4195-8346-16b654817822", "332658053860")
    //     .handleNotificationOpened(notificationOpenedCallback)
    //     .endInit();
    });
  }

  loginUser(): void {
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

  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSucess());
  }

  private onSignInSucess(): void {
    console.log("Google display name ", this._auth.displayName());
  }

  signOut(): void {
    this._auth.signOut();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

