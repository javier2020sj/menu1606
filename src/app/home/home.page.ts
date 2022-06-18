import { Component, ViewChild } from '@angular/core';
import { Router } from  "@angular/router";
import { PostService } from '../service/post.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { GlobalesService } from '../globales.service';
import { NavController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('myNav') nav: NavController
  public rootPage: any = HomePage;

  usuario:any;
  
  constructor(public postService:PostService,
    public router: Router,
    public globales:GlobalesService,
    public navCtrl: NavController,
    public toastController:ToastController) {}

  loginData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

   async loginForm(){
      await this.postService.login(this.loginData.value)
      .then(data=>{
        this.usuario=data
      });
      this.globales.token="";
      if (this.usuario['token']!="")
      {
        this.globales.token=this.usuario['token'];
        console.log(this.usuario['token'])
        this.router.navigate(['/principal'])
      }
      else{
        this.presentToast();
      }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrecto',
      duration: 1000
    });
    toast.present();
  }
}
