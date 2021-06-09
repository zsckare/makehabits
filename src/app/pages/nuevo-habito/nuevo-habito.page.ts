import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }
  date: string = new Date().toISOString();
}
