import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-demo',
  templateUrl: './pipes-demo.component.html',
  styleUrls: ['./pipes-demo.component.css']
})
export class PipesDemoComponent {


  title: string = "angular pipes example";
  today: Date = new Date();
  price: number = 1999.99;
  percentage: number = 0.75;
  user = { name: "John Doe", age: 30 };

}
