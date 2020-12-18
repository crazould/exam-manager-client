import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageParticipantComponent } from './pages/manage-participant/manage-participant.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ManageQuestionComponent } from './pages/manage-question/manage-question.component';
import { ManageScheduleComponent } from './pages/manage-schedule/manage-schedule.component';
import { TestResultComponent } from './pages/test-result/test-result.component';
import { TestStatusComponent } from './pages/test-status/test-status.component';
import { TestActivityComponent } from './pages/test-activity/test-activity.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { HomeComponent } from './pages/home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    ManageParticipantComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ManageQuestionComponent,
    ManageScheduleComponent,
    TestResultComponent,
    TestStatusComponent,
    TestActivityComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
