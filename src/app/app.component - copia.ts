import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaonline';
  data:any;
  dataPersona:any;
  dtOptions: any = {};

  constructor(private http: HttpClient){
    //get request
    //this.http.get('http://localhost/save.php').subscribe(data => {
    this.http.get('https://randomapi.com/api/b9360d59ee9f86b877ad30b5ccddc0c4').subscribe(data => {
      this.data = data;
      var Persona = this.data.results
      this.dataPersona = Persona
      alert(JSON.stringify(Persona))
      alert(JSON.stringify(this.data.results))
      console.log(this.dataPersona.Personas);
          }, error => console.error(error));
  }
  ngOnInit() {
    
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
      lengthMenu : [5, 10, 25],
        processing: true
      };
     
  }  
}
