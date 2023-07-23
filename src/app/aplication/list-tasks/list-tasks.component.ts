import {
  Component,
  OnDestroy,
  OnInit,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';

import { TasksService } from './../services/tasks.service';
import { Task } from '../shared/interface';
import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListTasksComponent implements OnInit, OnDestroy {
  @ViewChildren('taskOption')
  public taskOption: any;

  public Tasks!: Task[];
  public CompletedTasks!: Task[];

  public TasksState = {
    toolbarIsCollapsed: true,
    viewCompletedTasks: false,
  };

  private SubscriptionTasks!: Subscription;

  constructor(
    private tasksService: TasksService,
    public toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.SubscriptionTasks = this.tasksService.TasksChanged.subscribe(
        (tasks: Task[]) => {
          this.Tasks = this.FilterTasks(tasks, false) as Task[];
          this.CompletedTasks = this.FilterTasks(tasks, true) as Task[];
        }
      );

      const AllTasks = this.tasksService.getTasks();

      this.Tasks = this.FilterTasks(AllTasks, false) as Task[];
      this.CompletedTasks = this.FilterTasks(AllTasks, true) as Task[];
    } catch (error) {}
  }

  ngOnDestroy(): void {
    try {
      this.SubscriptionTasks.unsubscribe();
    } catch (error) {}
  }

  /**
   * Filter the list of tasks (completed or not completed)
   * @param {Task[]} tasks List of tasks
   * @param {boolean} completed if should return the completed tasks or not completed
   * @returns {any} return the List of Tasks filtered by Completed/ Not Completed
   */
  private FilterTasks(tasks: Task[], completed: boolean): Task[] | undefined {
    try {
      return tasks.filter((task: Task) => task.completed == completed);
    } catch (error) {
      return;
    }
  }

  /** Open the checkBox for selecting Tasks
   */
  public OpenSelectOption() {
    try {
      this.TasksState.toolbarIsCollapsed = !this.TasksState.toolbarIsCollapsed;

      setTimeout(() => {
        this.taskOption._results.forEach((task: any) => {
          task.isCollapsed = this.TasksState.toolbarIsCollapsed;
        });
      }, 500);
    } catch (error) {}
  }

  public CreateNewTask() {
    try {
      /** Navigate to the detail of a particular task
       */
      this.router.navigate(['/home/newtask']);
    } catch (error) {}
  }

  /** Mark all selected tasks as completed
   */
  public MarkSelectedTasksCompleted() {
    try {
      const IdsList: number[] = [];

      this.taskOption._results.forEach((taskComp: any) => {
        // If task has checkbox Selected
        if (taskComp.isSelected) {
          // Push the Task Id into the List
          IdsList.push(taskComp.task.id);
        }
      });

      if (IdsList.length == 0) {
        this.toastService.show('Selecione uma opção primeiro', {
          classname: 'bg-danger text-light',
          delay: 3000,
        });

        return;
      }

      // Pass the List of Selected Tasks in order to delete them
      this.tasksService.changeTasksStatus(IdsList);
    } catch (error) {}
  }

  /** Delete all tasks which have the checkbox selected
   */
  public DeleteSelectedTasks() {
    try {
      const IdsList: number[] = [];

      // Iterate over all Tasks Components
      this.taskOption._results.forEach((taskComp: any) => {
        // If task has checkbox Selected
        if (taskComp.isSelected) {
          // Push the Task Id into the List
          IdsList.push(taskComp.task.id);
        }
      });

      if (IdsList.length == 0) {
        this.toastService.show('Selecione uma opção primeiro', {
          classname: 'bg-danger text-light',
          delay: 3000,
        });

        return;
      }

      // Pass the List of Selected Tasks in order to delete them
      this.tasksService.deleteTasks(IdsList);
    } catch (error) {}
  }
}
