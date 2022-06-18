import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { NavController } from '@ionic/angular';
import { GlobalesService } from 'src/app/globales.service';
import { PostService } from 'src/app/service/post.service';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modif',
  templateUrl: './modif.page.html',
  styleUrls: ['./modif.page.scss'],
})
  export class ModifPage implements OnInit{

    constructor(private navController: NavController,
      private http: HttpClient,
      public postService:PostService,
      public router: Router,
      public base64:Base64,
      private globales:GlobalesService,
      private alertController:AlertController) { }
    
    ngOnInit(): void {

      this.postService.token().then(respuesta=>
        {
  
          if(!(respuesta['success']=="ok"))
          {
            this.router.navigate(['/home']);
          }
  
        });
      console.log("Datos: ",GlobalesService.datos);
      this.data=GlobalesService.datos;
      console.log(this.data);
    }
  
    private file: File;
  
    data:any

    itemData = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required)
    });

    
    onFileChange(fileChangeEvent) {
      this.file = fileChangeEvent.target.files[0];
    }
  
    async subirFoto(id) {
      let formData = new FormData();
      formData.append("file", this.file, this.file.name);
  
      this.http.post("http://127.0.0.1:5000/menu/items/foto/"+id, formData).subscribe((response) => {
        console.log(response);
      });
    }

    public getImageFromBase64(imagen) {
      
      let picUrl = "data:image/jpeg;base64," + imagen
    
      return picUrl;
    
    }
    //Alert
    async deleteConfirm(id) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Eliminar plato',
        message: 'Esta seguro de eliminar el plato de menú',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Acción cancelada');
            }
          }, {
            text: 'Aceptar',
            id: 'confirm-button',
            handler: () => {
              console.log('Se elimina plato');
              this.postService.deleteItem(id);

              this.navController.back();
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    async itemForm(id){
      //Si los campos estan vacios los completo con los datos del inicio
      if(this.itemData.value["name"]==""){this.itemData.value["name"]=this.data["name"]}
      if(this.itemData.value["description"]==""){this.itemData.value["description"]=this.data["description"]}
      if(this.itemData.value["price"]==""){this.itemData.value["price"]=this.data["price"]}
      
      console.log("datos modif: ",this.itemData.value)
      this.postService.enviarPost(this.itemData.value,"/menu/items/modify/"+id).then(data=>{
        if(data["success"]="ok")
        {
          this.subirFoto(id);

          this.navController.back();
        }
        else      
        {
          console.log("No se  debe guardar lo foto");
        }
      });
  
        console.log(this.itemData.value); 
    }
  
  }
  
