import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task } from '../shared/interface';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskDescriptionComponent implements OnInit {
  public Task!: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const TaskId = params['id'];

      this.Task = this.tasksService.getTask(TaskId) as Task;
    });
  }

  returnPreviousPage() {
    try {
      history.back();
    } catch (error) {}
  }

  ChangeStatus() {
    try {
      this.tasksService.changeTaskStatus(this.Task.id);
    } catch (error) {}
  }

  DeleteTask() {
    try {
      this.tasksService.deleteTask(this.Task.id);

      this.router.navigate(['home/list']);
    } catch (error) {}
  }

}
