import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../shared/interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Input()
  set isCollapsed(value: boolean) {
    this.checkBoxVisible = !value;

    this._isCollapsed = value;
  }

  @ViewChild('checkboxSelection')
  public checkboxSelection!: ElementRef;

  get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  get isSelected(): boolean {
    return this.checkboxSelection.nativeElement.checked;
  }

  public DaysLeft!: number;
  public checkBoxVisible: boolean = false;
  private _isCollapsed!: boolean;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.calculateRemainingDays();
    } catch (error) {}
  }

  /** Calculate the remaining days of the Task by subtracting the due Date of the Task
   * compared to the current Date
   */
  calculateRemainingDays() {
    try {
      let currentDate = new Date();

      let difference = this.task.dueDate.getTime() - currentDate.getTime();

      this.DaysLeft = Math.ceil(difference / (1000 * 3600 * 24));
    } catch (error) {}
  }

  /** Navigate to the detail of a particular task
   */
  OpenDetails() {
    try {
      this.router.navigate(['../', this.task.id], { relativeTo: this.route });
    } catch (error) {}
  }

  /** Navigate to the editing Page of a particular task
   *
   */
  OpenEditMode() {
    try {
      this.router.navigate(['../', this.task.id, 'edit'], {
        relativeTo: this.route,
      });
    } catch (error) {}
  }

  /** Mark a task as completed, by updating the service
   */
  MarkCompleted() {
    try {
      this.tasksService.changeTaskStatus(this.task.id);
    } catch (error) {}
  }

  /** Delete a task by updating the service
   */
  DeleteTask() {
    try {
      this.tasksService.deleteTask(this.task.id);
    } catch (error) {}
  }
}
