import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AddGoalPageComponent } from './add-goal-page/add-goal-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CallbackComponent } from './shared/callback/callback.component';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthGuard } from './shared/auth/auth.guard';


const routes: Routes = [
  {path: '', component: AuthComponent, pathMatch: 'full'},
  {path: 'callback', component: CallbackComponent},
  {path: 'goals', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'add-goal', component: AddGoalPageComponent, canActivate: [AuthGuard]},
  {path: 'goal/:id', component: DetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
