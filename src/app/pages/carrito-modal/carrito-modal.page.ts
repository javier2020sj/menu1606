import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { GlobalesService } from 'src/app/globales.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { PostService } from 'src/app/service/post.service';


@Component({
  selector: 'app-carrito-modal',
  templateUrl: './carrito-modal.page.html',
  styleUrls: ['./carrito-modal.page.scss'],
})
export class CarritoModalPage implements OnInit {


  constructor(
    public postService:PostService,
    public router: Router, 
    public globales:GlobalesService,
    public carrito:CarritoService,
    public modalCtr: ModalController,
    public toastController:ToastController,) { }


  productos:any;
  inicio;
  Total:any;
  
  ngOnInit() {
    this.Total=0;
      this.productos=this.carrito.devuelveListaProductos();
      this.productos.forEach(element => {
      this.Total=(parseFloat(element["price"])*parseFloat(element["cant"]))+parseFloat(this.Total);
      });

  }
  async Cerrar() {
    
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }
  getImageFromBase64(id) {
    this.postService.getOnliOneItems(id).then(res=>{

      console.log(res[0]);
      //let picUrl = "data:image/jpeg;base64," + res[0]["image"]
      //return picUrl;
    });
  
  }

  getWAText()
  {
    let Texto;

    this.productos=this.carrito.devuelveListaProductos();
    Texto="https:\/\/wa.me\/5942644642821\?text=";
    this.productos.forEach(element => {
      
      Texto=Texto+element["name"]+ " Cant: " + element["cant"]+ " $" + element["price"] + "*******";



    });
    let waURL=encodeURI(Texto);
    console.log(waURL);

    return waURL;
  }

}
