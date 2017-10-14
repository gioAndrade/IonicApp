import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { NoticesPage } from './../pages/notices/notices';
import { PostsPage } from './../pages/posts/posts';
import { ContatoPage } from './../pages/contato/contato';
import { SobrePage } from './../pages/sobre/sobre';
import { PostViewPage } from './../pages/post-view/post-view';
import { EditCommentPage } from './../pages/edit-comment/edit-comment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MomentModule } from 'angular2-moment';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAMkNsDMcGKczJrS9w758ewRQsEf0NGREQ",
  authDomain: "blog-di.firebaseapp.com",
  databaseURL: "https://blog-di.firebaseio.com",
  projectId: "blog-di",
  storageBucket: "blog-di.appspot.com",
  messagingSenderId: "332658053860"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NoticesPage,
    PostsPage,
    SobrePage,
    ContatoPage,
    PostViewPage,
    EditCommentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    Ng2OrderModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NoticesPage,
    PostsPage,
    SobrePage,
    ContatoPage,
    PostViewPage,
    EditCommentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    AngularFireAuth,
    AuthServiceProvider,
    GooglePlus
  ]
})
export class AppModule { }
