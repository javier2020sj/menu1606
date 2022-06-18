import { Injectable } from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx';
export interface Producto
{
  id: number;
  name: string;
  price: number;
  cant: number;
  description:string;
} 
@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  listaProductos=[];
  devuelveListaProductos()
  {
    return this.listaProductos;
  }

  eliminaProducto(producto) {
    for (let [index, p] of this.listaProductos.entries()) {
      if (p.id === producto.id) {
        this.listaProductos.splice(index, 1);
      }
    }
  }
  agregaProducto(prod)
  {

    console.log(this.listaProductos)
    
      let added = false;
      for (let p of this.listaProductos) {
        if (p.id === prod.id) {
          p.cant += 1;
          added = true;
          break;
        }
      }
      if (!added) {
        prod.cant = 1;
        this.listaProductos.push(prod);
      }
    
  }
  constructor() { }
}
