import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  recieveMessage:string = '';
  parentMessage:string = 'Hello from parent';



  recieveData(message: string){
    this.recieveMessage = message;
  }



}
