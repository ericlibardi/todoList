import { Component, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from '../shared/interface';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskNewComponent {
  public Priorities = ['Low', 'Medium', 'High'];

  // Definition of Form
  public newForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    dueDate: new FormControl('', [Validators.required]),
    status: new FormControl(false, [Validators.required]),
    priority: new FormControl(this.Priorities[0], [Validators.required]),
    address: new FormControl(''),
    phone: new FormControl(''),
    extra: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) {}

  /** Navigate to the previous page according to the browser history
   */
  returnPreviousPage() {
    try {
      history.back();
    } catch (error) {}
  }
}
