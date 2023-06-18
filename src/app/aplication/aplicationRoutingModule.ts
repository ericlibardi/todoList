import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { TaskDescriptionComponent } from './task-description/task-description.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskNewComponent } from './task-new/task-new.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListTasksComponent,
      },
      {
        path: 'newtask',
        component: TaskNewComponent,
      },
      {
        path: ':id',
        component: TaskDescriptionComponent,
      },
      {
        path: ':id/edit',
        component: TaskEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AplicationRoutingModule {}
