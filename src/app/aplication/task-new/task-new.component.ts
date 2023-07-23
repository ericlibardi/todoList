import { Component, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from '../shared/interface';
import { TasksService } from '../services/tasks.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    dueDate: new FormControl(undefined, [Validators.required]),
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

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  /** Navigate to the previous page according to the browser history
   */
  returnPreviousPage() {
    try {
      history.back();
    } catch (error) {}
  }

  /** Save the updates made into the Task
   */
  saveNewTask() {
    try {
      // Verify whether the form is valid
      const formIsValid = this.newForm.valid;
      if (!formIsValid) {
        const controlList = Object.keys(this.newForm.controls);

        controlList.forEach((controlName: string) => {
          this.InputLostFocus(controlName);
        });

        return;
      }

      // Get the updated due Date formated as Date
      const dueDate = new Date(
        (this.newForm.value.dueDate! as NgbDateStruct).year!,
        (this.newForm.value.dueDate! as NgbDateStruct).month!,
        (this.newForm.value.dueDate! as NgbDateStruct).day!
      );

      const newTaskId = this.tasksService.getLastId() + 1;

      // Set a Task Object with the updated details
      const taskCreated: Task = {
        id: newTaskId,
        title: this.newForm.value.title as string,
        description: this.newForm.value.description as string,
        dueDate: dueDate,
        priority: this.newForm.value.priority?.toLowerCase() as any,
        completed: this.newForm.value.status as boolean,
      };

      // Pass the updated task into the Service
      this.tasksService.createNewTask(taskCreated);

      // Navigate back
      setTimeout(() => {
        history.back();
      }, 100);
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
