import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { GlobalesService } from 'src/app/globales.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { PostService } from 'src/app/service/post.service';
import { CarritoModalPage } from '../carrito-modal/carrito-modal.page';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-menu-clientes',
  templateUrl: './menu-clientes.page.html',
  styleUrls: ['./menu-clientes.page.scss'],
})
export class MenuClientesPage implements OnInit {
  data:any;
  maxdata;

  datosRecibidos:any;

  lastItem;


  modalDataResponse: any;

  ngOnInit() {
    
      console.log("Inicio de app");
      this.lastItem=-1;
      this.loadData();
    
      this.globales.carrito=null;
    
  }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  constructor(
    public postService:PostService,
    public router: Router, 
    private globales:GlobalesService,
    private carrito:CarritoService,
    public modalCtrl: ModalController,
    public toastController:ToastController) { }

/////////////////////MODAL

async initModal() {
  const modal = await this.modalCtrl.create({
    component: CarritoModalPage,
    componentProps: {
      'name': 'The Winter Soldier'
    }
  });

  modal.onDidDismiss().then((modalDataResponse) => {
    if (modalDataResponse !== null) {
      this.modalDataResponse = modalDataResponse.data;
      console.log('Modal Sent Data : '+ modalDataResponse.data);
    }
  });

  return await modal.present();
}

//////////////////////////
 
  loadItems(infiniteScroll?) {
    console.log("carga los datos");

    this.postService.getListItems()
    .then(res => {
      console.log(res);

      
      this.data = (res);
      this.maxdata=this.data.length;
    })
  }
  loadData(event = null) {
    setTimeout(() => {
      console.log("Cargando... ultimo id: ",this.lastItem);
      this.postService.getItems(this.lastItem+1)
      .then(async res => {

        this.datosRecibidos =res;
        console.log(this.datosRecibidos["max_id"]);
        if(this.datosRecibidos['qty']!=0)
        {
          console.log("cantidad: ",this.datosRecibidos['qty']);
          if ((this.data===undefined))
          {    
            console.log("nuevos datos" , this.data);  

            this.data = this.datosRecibidos.data;

            console.log("nuevos datos" , this.data);  
          }
          else{
            this.data = this.data.concat(this.datosRecibidos.data);
            
            console.log("agrega datos" , this.data);
          }
          
          this.lastItem=this.datosRecibidos['max_id']
          

          if (this.datosRecibidos['qty']!==0) {
            this.lastItem=this.datosRecibidos["max_id"];

            console.log("Ultimo dato: 111" , this.lastItem," datos total: ",this.datosRecibidos["last_id"]);
            if(this.lastItem>=this.datosRecibidos["last_id"])
            {
              console.log("Llego al final");
              if (event) event.target.disabled = true;
            }
          } else {
            console.log("aun no Llego al final");
            if (event) event.target.disabled = true;
          }
          if (event) event.target.complete();
        }  
      });
    },500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


  //Agrega un item al carrito
  addToCart(id=null)
  {
    
    if(id!=null)
    {
      this.postService.getOnliOneItems(id).then(item=>{
        this.carrito.agregaProducto(item[0]);
        this.presentToast();
      });
       
    }
  }
  getImageFromBase64(imagen) {
      
    let picUrl = "data:image/jpeg;base64," + imagen
    return picUrl;
  
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se agregó al carrito',
      duration: 1000
    });
    toast.present();
  }
  
}
