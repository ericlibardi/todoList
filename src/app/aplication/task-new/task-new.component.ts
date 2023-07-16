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

  public errorMessages = {
    title: '',
    description: '',
    dueDate: '',
    priority: '',
  };

  constructor(private route: ActivatedRoute) {}

  /** Navigate to the previous page according to the browser history
   */
  returnPreviousPage() {
    try {
      history.back();
    } catch (error) {}
  }

  /** Handle the loss of focus from the input
   * @param controlName - control from the form that lost focus
   */
  InputLostFocus(controlName: string) {
    try {
      // Get the details of the control interacted
      const controlDetails = (this.newForm.controls as any)[controlName];

      // If the status is Valid, cancel this method
      if (controlDetails.status == 'VALID') return;

      // set the error message according to the error identified
      switch (Object.keys(controlDetails.errors)[0]) {
        case 'minlength':
          (this.errorMessages as any)[controlName] =
            'Required at least ' +
            controlDetails.errors.minlength.requiredLength +
            ' characters.';
          break;
        case 'required':
          (this.errorMessages as any)[controlName] = 'This field is mandatory.';
          break;

        case 'ngbDate':
          if (Object.keys(controlDetails.errors.ngbDate.invalid)[0])
            (this.errorMessages as any)[controlName] = 'Invalid format.';
          break;

        default:
          break;
      }
    } catch (error) {}
  }

  /** Handle the gain of Focus on the Inputbox
   * @param controlName - name of the control interacted
   */
  InputGainedFocus(controlName: string) {
    try {
      // Clears the current error message
      (this.errorMessages as any)[controlName] = '';
    } catch (error) {}
  }
}
