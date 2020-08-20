import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.sass']
})
export class TestResultComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
    this.setTitle("Test Result")
  }

  ngOnInit(): void {

  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle)
  }

}
