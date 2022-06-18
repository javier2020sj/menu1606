import { Injectable } from '@angular/core';
export interface Plato {
  id: number;
  name: string;
  price: number;
  photo: string;
  cant:number;
}
@Injectable({
  providedIn: 'root'
})
export class GlobalesService {


  public token: string;
  public idIntercambio:number;
  public static datos:any;
  public carrito=[];

  

  agregarItem(plato)
  {
    let yaEsta = false;
    for (let p of this.carrito) {
      if (p.id === plato.id) {
        p.cant += 1;
        yaEsta = true;
        break;
      }
    }
    if (!yaEsta) {
      plato.amount = 1;
      this.carrito.push(plato);
    }
  }
  constructor() { }
}
