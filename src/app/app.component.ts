import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { OnInit } from '@angular/core';
import { Person } from './models/person.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ApiService ]
})
export class AppComponent {
  title = 'app works!';
  apiData = "";
  name = "Batman";
  person = new Person(name);
  
  getAll(){
    this.apiService.getAll().then( result => {
      this.apiData = result;
      console.log(result);
    })
  }
   getOne(name: string){
    this.apiService.getOne(name).then( result => {
      this.apiData = result;
      console.log(result);
    })
  }

  createUser(name: string) {

    console.log(name);
    this.person.name= name;
    this.apiService.createUser(this.person).then( result => {
      this.apiData = result;
      console.log(result);
    })
  }

  constructor(private apiService:ApiService) { }

  ngOnInit(): void { }

}
