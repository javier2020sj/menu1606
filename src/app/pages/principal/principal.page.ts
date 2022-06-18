import { Component, OnInit,ViewChild } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';

import { Router } from '@angular/router';
import { IonInfiniteScroll, ViewWillEnter } from '@ionic/angular';
import { concat } from 'rxjs';
import { GlobalesService } from 'src/app/globales.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  data:any;
  maxdata;

  datosRecibidos:any;

  lastItem;
  ngOnInit() {
    this.postService.token().then(respuesta=>
    {

      if(!(respuesta['success']=="ok"))
      {
        console.log("-----------loged user");
        this.router.navigate(['/home']);
      }
      console.log("Inicio de app");
      this.lastItem=-1;
      this.loadData();
    });
    
  }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;



  page: number = 1;
  
  constructor(public postService:PostService,public router: Router, private globales:GlobalesService) { }

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

  getImageUrl(imagen) {
            
      const imageUrl=("http://127.0.0.1:5000/images/"+imagen);
      return imageUrl;
    
  }


  //Va a la pagina de modificacion o eliminacion
  modifyItem(id=null)
  {
    console.log("id articulo",id);
    if(!null)
    {
      this.postService.getOnliOneItems(id).then(item=>{
        
        console.log("Datos antes de nuevo form: ",item[0]);
        GlobalesService.datos=item[0];
        this.router.navigate(['/modifItem']) 
      })
       
    }
  }

  getImageFromBase64(imagen) {
      
    let picUrl = "data:image/jpeg;base64," + imagen
    return picUrl;
  
  }
  nuevoItem(){

    this.router.navigate(['/nuevoItem'])
  }

}
