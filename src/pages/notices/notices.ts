
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html'
})
export class NoticesPage {
  
  notices: Observable<any[]>;
  order: string = 'startedAt';

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.notices = db.list('/notices').valueChanges();
    
    console.log(this.notices);
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticesPage');
  }

}
