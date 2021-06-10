import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edithabito',
  templateUrl: './edithabito.page.html',
  styleUrls: ['./edithabito.page.scss'],
})
export class EdithabitoPage implements OnInit {
  nombre: ''; 
  descripcion: '';
  color: '';
  hora: '';
  fechainicio: '';
  fechafin: '';
  frasemotivacional: '';
  data: any;
  constructor(private db: DbService,private route: ActivatedRoute, private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = JSON.parse(this.router.getCurrentNavigation().extras.state.special);
        this.nombre = this.data.nombre
        this.descripcion = this.data.descripcion
        this.color = this.data.color
        this.hora = this.data.hora
        this.fechafin = this.data.fechafin
        this.fechainicio = this.data.fechainicio
        this.frasemotivacional = this.data.frasemotivacional
      }
    });
  }

  saveHabito(){
    this.db.updateHabito(this.data.id,this.data).then((res)=>{
      this.db.getHabitos().then((res)=>{
        this.navCtrl.pop()
      })
    })
  }

}
