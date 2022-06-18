import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { NavController } from '@ionic/angular';
import { PostService } from 'src/app/service/post.service';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit{

  constructor(private navController: NavController,private http: HttpClient,public postService:PostService,public router: Router,public base64:Base64) { }
  ngOnInit(): void {
    this.postService.token().then(respuesta=>
      {

        if(!(respuesta['success']=="ok"))
        {
          this.router.navigate(['/home']);
        }

      });
  }

  private file: File;

  itemData = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required)
  });


  
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  async submitForm(id) {
    let formData = new FormData();
    formData.append("file", this.file, this.file.name);

    this.http.post("http://127.0.0.1:5000//menu/items/foto/"+id, formData).subscribe((response) => {
      console.log(response);
    });
  }
  async itemForm(){
    
    console.log("Se debe guardar lo foto: ",this.itemData.value["photo"]);
    this.postService.enviarPost(this.itemData.value,"/menu/items/new").then(data=>{
      console.log(data);
      if(data["success"]="ok")
      {
        console.log("ide insertado:",data["lastid"])
        this.submitForm(data["lastid"]);
        console.log("Se debe guardar lo foto: ",this.itemData.value["photo"]);
      }
      else      {
        console.log("No se  debe guardar lo foto");
      }
    });

      console.log(this.itemData.value); 

      this.navController.back();
  }

}
