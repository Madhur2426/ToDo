import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { OngoingTaskComponent } from './ongoing-task/ongoing-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';

const routes: Routes = [
  {
    path: '', component: AddTaskComponent
  },
  {
    path: 'ongoing', component: OngoingTaskComponent
  },
  {
    path: 'completed', component: CompletedTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
