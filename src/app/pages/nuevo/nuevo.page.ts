import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {

  habitos:any;
  Data: any[] = [];
  info: any;
    
  constructor(private db: DbService,private activatedRoute: ActivatedRoute,public alertController: AlertController,private router: Router) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchHabitos().subscribe(item => {
          this.Data = item 
          console.log(this.Data)         
          this.habitos = JSON.parse(JSON.stringify(this.Data)) 
                   
        })
      }
    }); 
  }
  editarHabito(item){
    let navigationExtras: NavigationExtras = {
      state: {
        special: JSON.stringify(item)
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['edithabito'], navigationExtras);
  }
 
  async alertDelete(id){
    const alert = await this.alertController.create({
      
      message: '¿Eliminar registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.eliminarHabito(id)
          }
        }
      ]
    });

    await alert.present();
  }
  eliminarHabito(id){
    this.db.deleteHabito(id).then((res)=>{
      this.db.getHabitos().then((res)=>{
        this.db.fetchHabitos().subscribe(item => {      
          console.log(item)
          this.habitos  = item
        })
      })
    })
  }
  

}
