import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts: Post[] = [];
  data:any;
  constructor(public postService: PostService) { }

  ngOnInit(): void {
    var guardado = localStorage.getItem('datos') + "";
    var data = []
    if (guardado == ""){
    this.postService.getAll().subscribe((data: Post[])=>{
      this.data = data
      var Data = []
      var Personas = this.data.results
      for (var i = 0; i < Personas.length; i++){
        var obj = Personas[i].Personas;
        Data.push({
          id: parseInt(obj.id),
          name: obj.name,
          phone: obj.phone,
          address: obj.address
        });
      } 
      /*
      Data.push({
        id: 1,
        name: 'DEMO',
        phone: '112233445566',
        address: {}
      });
      Data.push({
        id: 2,
        name: 'PRUEBA',
        phone: '112233445566',
        address: {}
      });
      */
        localStorage.setItem('datos', JSON.stringify(Data));
        this.posts = Data;
      })
    }else{
      var Personas = JSON.parse(guardado)
      for (var i = 0; i < Personas.length; i++){
        var obj = Personas[i];
        data.push({
          id: parseInt(obj.id),
          name: obj.name,
          phone: obj.phone,
          address: obj.address
        });
      }
      this.posts = data;   
    }
  }
  deletePost(id: number){
    if (window.confirm("Realmente quieres eliminar este registro?")) {
      var Data = this.postService.delete(id)
      localStorage.setItem('datos', JSON.stringify(Data));
      this.posts = Data;
    }
  }

}
