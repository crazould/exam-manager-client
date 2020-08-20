import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-test-status',
  templateUrl: './test-status.component.html',
  styleUrls: ['./test-status.component.sass']
})
export class TestStatusComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
    this.setTitle("Test Status")
  }

  ngOnInit(): void {
  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle)
  }

}
