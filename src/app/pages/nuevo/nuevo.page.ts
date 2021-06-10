import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {

  habitos:any;
  Data: any[] = [];
  info: any;
    
  constructor(private db: DbService,) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchHabitos().subscribe(item => {
          this.Data = item          
          this.info = JSON.parse(JSON.stringify(this.Data))          
        })
      }
    }); 
  }

}
