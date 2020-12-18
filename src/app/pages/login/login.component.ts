import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant/participant.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  currPart: any = JSON.parse(localStorage.getItem('CURR_PART'))
  isError: boolean = false;

  constructor(
    private titleService : Title,
    private participantService: ParticipantService,
    private router: Router
    ) {
    this.setTitle("Login")
  }
  
  ngOnInit(): void {
    if(this.currPart != null) {
      this.router.navigate(['/']);
      return
    }
  }

  private setTitle(newTitle : string) {
    this.titleService.setTitle(newTitle)
  }

  login(email, password): void {
    console.log(email + " " + password)
    this.participantService.login(email, password).subscribe((res) => {
      
      console.log(res)

      if(res[0] == undefined || res[0] == null){
        this.isError = true;
      } 
      else {
        this.isError = false;
        localStorage.setItem('CURR_PART', JSON.stringify(res[0]))
        window.location.reload()
      }

    })

  }

}
