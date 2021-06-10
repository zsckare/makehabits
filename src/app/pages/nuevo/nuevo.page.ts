import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {

  habitos:any;
  Data: any[] = [];
  info: any;
    
  constructor(private db: DbService,public actionSheetController: ActionSheetController) { }

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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          console.log('Share clicked');
        }
      }, , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
