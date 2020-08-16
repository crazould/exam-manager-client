import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageParticipantComponent } from './pages/manage-participant/manage-participant.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'manage-participant', component: ManageParticipantComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
