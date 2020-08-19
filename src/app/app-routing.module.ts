import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageParticipantComponent } from './pages/manage-participant/manage-participant.component';
import { ManageQuestionComponent } from './pages/manage-question/manage-question.component';
import { ManageScheduleComponent } from './pages/manage-schedule/manage-schedule.component';
import { TestActivityComponent } from './pages/test-activity/test-activity.component'
import { TestResultComponent } from './pages/test-result/test-result.component'
import { TestStatusComponent } from './pages/test-status/test-status.component'
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'manage-participant', component: ManageParticipantComponent },
  { path: 'manage-question', component: ManageQuestionComponent },
  { path: 'manage-schedule', component: ManageScheduleComponent },
  { path: 'test-activity', component: TestActivityComponent },
  { path: 'test-result', component: TestResultComponent },
  { path: 'test-status', component: TestStatusComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
