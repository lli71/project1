import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  determinateValue = 40;
  bufferValue =70
  constructor() { }

  ngOnInit() {
  }


}
//find the navigation bar