import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  currPart: any = JSON.parse(localStorage.getItem('CURR_PART'))

  constructor() { }

  ngOnInit(): void {
  }

}
