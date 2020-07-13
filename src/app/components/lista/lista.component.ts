import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
//propiedad de la la clase lista component
  items: any;
  editarItem: any ={
    name:''
  }

  //trayendo el servicio al componente
  constructor(private conexion: ConexionService) {
    //guardando cada uno de los item
    this.conexion.listaItem().subscribe(item => {
    //variable vacia (linea 11) va a ser llenada con los "item"
      this.items = item;
      console.log(this.items);
    })
   }

  ngOnInit(): void {
  }

  eliminar(item){
    this.conexion.eliminarItem(item);//recibiendo del listado html
  }

  editar(item){
    this.editarItem = item;
  }

  agregarItemEditado(){
    this.conexion.editarItem(this.editarItem);
  }



}
