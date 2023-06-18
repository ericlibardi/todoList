import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task } from '../shared/interface';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskEditComponent implements OnInit {
  public Task!: Task;

  private DateDue: NgbDateStruct = {
    year: 1900,
    month: 1,
    day: 1,
  };

  public Priorities = ['Low', 'Medium', 'High'];

  // Definition of Form
  public editForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    dueDate: new FormControl(this.DateDue, [Validators.required]),
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

  ngOnInit(): void {
    // Subscribe to params in order to get the Task Id
    this.route.params.subscribe((params: Params) => {
      const TaskId = params['id'];

      // Get task details
      this.Task = this.tasksService.getTask(TaskId) as Task;

      // Format the Due Date as an object (year: yyyy, month: mm, day: dd)
      this.DateDue = {
        year: this.Task.dueDate.getFullYear(),
        month: this.Task.dueDate.getMonth(),
        day: this.Task.dueDate.getDate(),
      };

      const taskPriority = this.Priorities.find(
        (priority: string) => priority.toLowerCase() == this.Task.priority
      ) as string;

      // Set the values on the form according to the task details
      this.editForm.setValue({
        title: this.Task.title as string,
        description: this.Task.description,
        dueDate: this.DateDue,
        status: this.Task.completed,
        priority: taskPriority,
        address: '',
        phone: '',
        extra: '',
      });
    });
  }

  /** Navigate to the previous page according to the browser history
   */
  returnPreviousPage() {
    try {
      history.back();
    } catch (error) {}
  }

  /** Save the updates made into the Task
   */
  saveChangesTask() {
    try {
      // Verify whether the form is valid
      const formIsValid = this.editForm.valid;
      if (!formIsValid) return;

      // Get the updated due Date formated as Date
      const updatedDueDate = new Date(
        this.editForm.value.dueDate!.year,
        this.editForm.value.dueDate!.month,
        this.editForm.value.dueDate!.day
      );

      // Set a Task Object with the updated details
      const taskUpdated: Task = {
        id: this.Task.id,
        title: this.editForm.value.title as string,
        description: this.editForm.value.description as string,
        dueDate: updatedDueDate,
        priority: this.editForm.value.priority?.toLowerCase() as any,
        completed: this.editForm.value.status as boolean,
      };

      // Pass the updated task into the Service
      this.tasksService.updateTask(taskUpdated);

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
      const controlDetails = (this.editForm.controls as any)[controlName];

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
