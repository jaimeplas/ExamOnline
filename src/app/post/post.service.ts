import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Post } from './post';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "https://randomapi.com/api/b9360d59ee9f86b877ad30b5ccddc0c4";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(post: any) {
    var data = []
    var guardado = localStorage.getItem('datos') + "";
    var Personas = JSON.parse(guardado)
      for (var i = 0; i < Personas.length; i++){
        var obj = Personas[i];
          data.push({
            id: obj.id,
            name: obj.name,
            phone: obj.phone,
            address: obj.address
        })
      }
      data.push({
        id: Personas.length += 1,
        name: post.name,
        phone: post.phone,
        address: post.address
      });

    return data
  }
  
  datos: any;
  find(id: number) {
    var data = []
    var guardado = localStorage.getItem('datos') + "";
    var Personas = JSON.parse(guardado)
      for (var i = 0; i < Personas.length; i++){
        var obj = Personas[i];
        if (parseInt(obj.id)==id){
          data.push({
            id: parseInt(obj.id),
            name: obj.name,
            phone: obj.phone,
            address: obj.address
          });
        }
      }
      return data
  }

  update(id: number, post: any) {
    var data = []
    var guardado = localStorage.getItem('datos') + "";
    var Personas = JSON.parse(guardado)
      for (var i = 0; i < Personas.length; i++){
        var obj = Personas[i];
        if (parseInt(obj.id)==id){
          data.push({
            id: id,
            name: post.name,
            phone: post.phone,
            address: post.address
          });
        } else {
          data.push({
            id: obj.id,
            name: obj.name,
            phone: obj.phone,
            address: obj.address
        })
      }
    }
    return data
  }
    
  delete(id: number){
    var data = []
    var guardado = localStorage.getItem('datos') + "";
    var Personas = JSON.parse(guardado)
      for (var i = 0; i < Personas.length; i++){
        var obj = Personas[i];
        if (parseInt(obj.id)!=id){
          data.push({
            id: obj.id,
            name: obj.name,
            phone: obj.phone,
            address: obj.address
        })
      }
    }
    return data
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
