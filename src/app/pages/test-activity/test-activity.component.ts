import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-test-activity',
  templateUrl: './test-activity.component.html',
  styleUrls: ['./test-activity.component.sass']
})
export class TestActivityComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { 
    this.setTitle("Test Activity")
  }

  ngOnInit(): void {

  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle)
  }


}
