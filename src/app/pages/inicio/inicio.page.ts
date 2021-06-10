import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DbService  } from '../../services/db.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [
    {
      icon: "alert-cicle",
      name: 'nuevo',
      redirectTo: '/nuevo'
    },
  ];
  
  constructor(private menu: MenuController, private db: DbService ) { }
  
  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchHabitos().subscribe(item => {      
        })
      }
    });    
  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}

interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}
