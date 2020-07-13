import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-lista-add',
  templateUrl: './lista-add.component.html',
  styleUrls: ['./lista-add.component.css']
})
export class ListaAddComponent implements OnInit {
// por medio del input se traera "name"
  item: any = {
    name:''
  }

  constructor( private servicio: ConexionService) { }

  ngOnInit(): void {
  }

  agregar(){
    //ocupando la funcion del servicio que es "agregar item" (de la clase conexion.item)y le estamos pasando item
    //pasa un parametro
    this.servicio.agregarItem(this.item);
    this.item.name='';
  }

}
