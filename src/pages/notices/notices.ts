
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html'
})
export class NoticesPage {
  
  notices: FirebaseListObservable<any[]>;
  order: string = 'startedAt';

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.notices = db.list('/notices');
    
    console.log(this.notices);
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticesPage');
  }

}
