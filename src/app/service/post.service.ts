import { Injectable, RendererStyleFlags2 } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalesService } from '../globales.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  servidor="http://lp9dejulio.dyndns.org:15003";
  constructor(public http: HttpClient,public globales:GlobalesService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /////////////////////////////////////////////////////////////////////////
  //                 Recibo todos los items
  /////////////////////////////////////////////////////////////////////////
  async getListItems(){
    let options = {
      headers: {'Content-Type':'application/json',observe: 'response'}
    };
    const response = await this.http.get(this.servidor + "/items/all").toPromise();
    console.log(response);
    return response;
  }


  /////////////////////////////////////////////////////////////////////////
  //                 elimina un item del menu
  /////////////////////////////////////////////////////////////////////////
  async deleteItem(id){
    let options = {
      headers: {'Content-Type':'application/json',observe: 'response'}
    };
    const response = await this.http.get(this.servidor + "/menu/items/delete/"+id).toPromise();
    console.log(response);
    return response;
  }

  /////////////////////////////////////////////////////////////////////////
  //                 Envio POST
  /////////////////////////////////////////////////////////////////////////
  async enviarPost(data,apiUrl) {

    let datos={token:this.globales.token,name:data["name"],description:data["description"],price:data["price"]};
    console.log(datos);
    var cabecera = new HttpHeaders();
    cabecera.append("Accept", 'application/json');
    cabecera.append('Content-Type', 'application/json' );
    console.log(this.servidor+apiUrl);
    const response = await this.http.post(this.servidor+apiUrl, datos,{headers:cabecera}).toPromise();
    return response;
  }

    /////////////////////////////////////////////////////////////////////////
  //                 Envio imagen
  /////////////////////////////////////////////////////////////////////////
 

  /////////////////////////////////////////////////////////////////////////
  //                 Traigo los items a partir de id solicitado
  /////////////////////////////////////////////////////////////////////////
  
  async getItems(lastId){
    let options = {
      headers: {'Content-Type':'application/json',observe: 'response'}
    };
    const response = await this.http.get(this.servidor + "/menu/items/group/"+lastId).toPromise();
    console.log(response);
    return response;
  }
  /////////////////////////////////////////////////////////////////////////
  //                 Traigo solo el item con id solicitado
  /////////////////////////////////////////////////////////////////////////
  
  async getOnliOneItems(id){
    let options = {
      headers: {'Content-Type':'application/json',observe: 'response'}
    };
    const response = await this.http.get(this.servidor + "/menu/items/onlyone/"+id).toPromise();

    console.log("---------------------------------------------");
    return response;
  }
  /////////////////////////////////////////////////////////////////////////
  //                 Envio los datos de login
  /////////////////////////////////////////////////////////////////////////
  
  async login(data) {
    console.log('HAciendo login: ' , data);
    let options = {
      headers: {'Content-Type':'application/json',observe: 'response'}
    };
    const response = await this.http.post(this.servidor + "/login", JSON.stringify(data),options).toPromise();
    console.log(response);
    return response;
  }

  /////////////////////////////////////////////////////////////////////////
  //                 Comprueba validez de token
  /////////////////////////////////////////////////////////////////////////
  
  async token() {
    let options = {
      headers: {'Content-Type':'application/json',observe: 'response'}
    };

    let tokenCode={token:this.globales.token};
    const response=await  this.http.post(this.servidor + "/token", JSON.stringify(tokenCode),options).toPromise();
    
    return response;
  }

  

  
  
}


