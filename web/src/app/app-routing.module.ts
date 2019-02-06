import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AddGoalPageComponent } from './add-goal-page/add-goal-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'add-goal', component: AddGoalPageComponent},
  {path: 'goal/:id', component: DetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
