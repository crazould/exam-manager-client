import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageParticipantComponent } from './manage-participant/manage-participant.component';

const routes: Routes = [
  { path: 'manage-participant', component: ManageParticipantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
