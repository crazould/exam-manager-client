import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.sass']
})
export class ManageQuestionComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { 
    this.setTitle("Manage Question")
  }

  ngOnInit(): void {

  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle)
  }

}
