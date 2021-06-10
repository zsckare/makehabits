import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {Habito} from './habito';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  habitosList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'habitmaker.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchHabitos(): Observable<Habito[]> {
    return this.habitosList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/basededatos.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getHabitos();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
 
  getHabitos(){
    return this.storage.executeSql('SELECT * FROM habitos', []).then(res => {
      let items: Habito[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,  
            descripcion: res.rows.item(i).descripcion,
            color: res.rows.item(i).color,
            hora: res.rows.item(i).hora,
            fechainicio: res.rows.item(i).fechainicio,
            fechafin: res.rows.item(i).fechafin,
            frasemotivacional: res.rows.item(i).frasemotivacional,
           });
        }
      }
      this.habitosList.next(items);
    });
  }

  // Add
  addHabito(nombre,descripcion,color,hora,fechainicio,fechafin,frasemotivacional) {
    let data = [nombre,descripcion,color,hora,fechainicio,fechafin,frasemotivacional];
    return this.storage.executeSql('INSERT INTO habitos (nombre,descripcion,color,hora,fechainicio,fechafin,frasemotivacional) VALUES (?, ?,?,?,?,?,?)', data)
    .then(res => {
      this.getHabitos();
    });
  }
 
  

  // Update
  updateHabito(id, habito: Habito) {
    let data = [habito.nombre, habito.descripcion];
    return this.storage.executeSql(`UPDATE songtable SET nombre = ?,descripcion = ?,color=?,hora=?,fechainicio=?,fechafin=?,frasemotivacional=? WHERE id = ${id}`, data)
    .then(data => {
      this.getHabitos();
    })
  }

  // Delete
  deleteHabito(id) {
    return this.storage.executeSql('DELETE FROM habitos WHERE id = ?', [id])
    .then(_ => {
      this.getHabitos();
    });
  }
}