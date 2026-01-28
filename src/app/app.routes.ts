import { RouterModule, Routes } from '@angular/router';
import { HoursControlComponent } from './pages/hours-control/hours-control.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component: HoursControlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}