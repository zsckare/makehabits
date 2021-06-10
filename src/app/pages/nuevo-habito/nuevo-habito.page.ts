import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-nuevo-habito',
  templateUrl: './nuevo-habito.page.html',
  styleUrls: ['./nuevo-habito.page.scss'],
})
export class NuevoHabitoPage implements OnInit {
  
  nombre: ''; 
  descripcion: '';
  color: '';
  hora: '';
  fechainicio: '';
  fechafin: '';
  frasemotivacional: '';
  constructor(private db: DbService,private navCtrl: NavController) { }

  ngOnInit() {
  }
  date: string = new Date().toISOString();

  saveHabito(){
    this.db.addHabito(this.nombre,this.descripcion,this.color,this.hora,this.fechainicio,this.fechafin,this.frasemotivacional).then((res)=>{
      this.db.getHabitos().then((res)=>{
        this.navCtrl.pop()
      })
    })
  }
}
