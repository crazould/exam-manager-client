import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  currPart: any = JSON.parse(localStorage.getItem('CURR_PART'))

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.currPart)
  }

  logout(){
    this.currPart = null; 
    localStorage.setItem('CURR_PART', null)
    this.router.navigate(['/']);
    window.location.reload()
  }

}
