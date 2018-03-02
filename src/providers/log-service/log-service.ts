import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';

import firebase from 'firebase';

@Injectable()
export class LogServiceProvider {

  createLogs: FirebaseListObservable<any>;
  lastActions: FirebaseListObservable<any>;
  deleteLogs: FirebaseListObservable<any>;
  updateLogs: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.updateLogs = db.list(`eventLogs/updateLogs`);
    this.lastActions = db.list(`eventLogs/lastActions`);
    this.createLogs = db.list(`eventLogs/createLogs`);
    this.deleteLogs = db.list(`eventLogs/deleteLogs`);
  }

  createLog(data, user): void {
    this.createLogs.push({
      action:"Publicação de comentário",
      autor: user.displayName,
      date: firebase.database.ServerValue.TIMESTAMP,
      funcao:"Usuário Google",
      title: data
    });
  }

  deleteLog(data, user): void {
    this.deleteLogs.push({
      action:"Comentário excluído",
      autor: user.displayName,
      date: firebase.database.ServerValue.TIMESTAMP,
      funcao:"Usuário Google",
      title: data
    });
  }

  updatelog(data, user): void {
    this.updateLogs.push({
      action:"Atualização de comentário",
      autor: user.displayName,
      date: firebase.database.ServerValue.TIMESTAMP,
      funcao:"Usuário Google",
      title: data
    });
  }

  lastActionLog(action, user): void {
    this.lastActions.push({
      action:action,
      autor: user.displayName,
      date: firebase.database.ServerValue.TIMESTAMP,
      funcao:"Usuário Google",
    });
  }

}
