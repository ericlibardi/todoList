import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AplicationRoutingModule } from './aplicationRoutingModule';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskComponent } from './task/task.component';
import { TaskDescriptionComponent } from './task-description/task-description.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { ToastsContainer } from './toastContainer/toasts-container.component';
import { TaskNewComponent } from './task-new/task-new.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListTasksComponent,
    NavbarComponent,
    TaskComponent,
    TaskDescriptionComponent,
    TaskEditComponent,
    TaskNewComponent,
  ],
  imports: [
    AplicationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTooltipModule,
    NgbDropdownModule,
    ToastsContainer,
  ],
  providers: [],
})
export class AplicationModule {}
