import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  selectedColor:string = '';
  items: { name: string }[] = [
    { name: 'Tarique' },
    {name: 'Aziz'},
    {name: 'Rakesh'}
  ];

  myStyles = {
    color: 'white',
    backgroundColor: 'black',
    fontSize: '20px',
    padding: '10px'
  };

  isHighlighted: boolean = false;

  getStyle(){

    return {
      color: this.isHighlighted ? 'yellow' : 'black',
      backgroundColor: this.isHighlighted ? 'blue' : 'white',
      fontWeight: this.isHighlighted ? 'bold' : 'normal'
    };
  }



}
