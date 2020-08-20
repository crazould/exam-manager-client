import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.sass']
})
export class ManageScheduleComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
    this.setTitle("Manage Schedule")
  }

  ngOnInit(): void {

  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle)
  }


}
