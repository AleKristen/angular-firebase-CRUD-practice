import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// item es el item de los items
export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
// items es la colección creada en firebase
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  private itemDoc: AngularFirestoreDocument<Item>;

// afs: angular firestore
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
// snapshotChanges() el estado actual de su colección. Devuelve un Observable de datos como una matriz sincronizada de DocumentChangeAction
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listaItem(){
    return this.items;
  }
//función "agregar nuevo item", agregar item de tipo "Item" que esta en interface (es de tipo nombre)
  agregarItem(item: Item) {
    this.itemsCollection.add(item);
  }

  eliminarItem(item){
   this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);//esta guardando el doc de Item (interface) en this.itemDoc
   this.itemDoc.delete();
  }

  editarItem(item){
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);//esta guardando el doc de Item (interface) en this.itemDoc
    this.itemDoc.update(item);
   }


}
