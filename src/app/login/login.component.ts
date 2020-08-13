import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private titleService : Title) {
    this.setTitle('Manage Participant')
  }

  private setTitle(newTitle : string) {
    this.titleService.setTitle(newTitle)
  }
  ngOnInit(): void {

  }

}
