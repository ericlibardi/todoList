import { Injectable } from '@angular/core';

import { Task } from '../shared/interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public TasksChanged = new Subject<Task[]>();

  private TaskList: Task[] = [
    {
      id: 'sa120fd',
      title: 'Bake a Cake',
      description: 'Bake a delicious cake for Katy´s birthday',
      dueDate: new Date(2023, 6, 4),
      priority: 'medium',
      completed: false,
    },
    {
      id: 'gjf39gf0',
      title: 'Meeting with John',
      description: 'Meeting to discuss about the new application',
      dueDate: new Date(2023, 9, 10),
      priority: 'low',
      completed: false,
    },
    {
      id: 'fk3jr40',
      title: 'Schedule Dentist Appointment',
      description: 'Schedule an appointment with Dr. Karl to check a pain.',
      dueDate: new Date(2023, 8, 20),
      priority: 'high',
      completed: false,
    },
    {
      id: 'fj390f',
      title: 'Take the dog to the Vet',
      description: 'Take the dog for a complete check-up',
      dueDate: new Date(2023, 11, 2),
      priority: 'low',
      completed: false,
    },
    {
      id: 'vjfd92',
      title: 'Fix the car',
      description: 'Take my car to the mechanic to check the break light',
      dueDate: new Date(2023, 8, 1),
      priority: 'medium',
      completed: false,
    },
    {
      id: 'gh28shd',
      title: 'Create presentation',
      description: 'Create a ppt presentation for work',
      dueDate: new Date(2023, 6, 15),
      priority: 'low',
      completed: false,
    },
    {
      id: 'fj010f',
      title: 'Fix the computer',
      description: 'Bring the computer to the technician',
      dueDate: new Date(2023, 10, 18),
      priority: 'low',
      completed: false,
    },
  ];

  constructor() {}

  /** Provide the current List for all available Tasks
   * @returns - return the list of Tasks
   */
  getTasks(): Task[] {
    return this.TaskList.slice();
  }

  /** Provide the desired task
   * @param id - id of the Task searched
   * @returns - Task found
   */
  getTask(id: string): Task | undefined {
    return this.TaskList.find((task: Task) => task.id == id);
  }

  /** Change the current status of a specific task
   * @param id - Id of the task in order to change
   */
  changeTaskStatus(id: string) {
    try {
      // Task found on the list that corresponds the ID informed
      const TaskFound = this.TaskList.find((task: Task) => task.id == id);
      if (!TaskFound) return;

      // Change status of the task
      TaskFound!.completed = !TaskFound!.completed;

      // Pass information that tasks have been changed
      this.TasksChanged.next(this.TaskList.slice());
    } catch (error) {}
  }

  /** Change the current status of a list of tasks
   * @param ids - List of Ids of tasks in order to change
   */
  changeTasksStatus(ids: string[]) {
    try {
      ids.forEach((id: string) => {
        // Task found on the list that corresponds the ID informed
        const TaskFound = this.TaskList.find((task: Task) => task.id == id);
        if (!TaskFound) return;

        // Change status of the task
        TaskFound!.completed = !TaskFound!.completed;
      });

      // Pass information that tasks have been changed
      this.TasksChanged.next(this.TaskList.slice());
    } catch (error) {}
  }

  /** Update the details of a specific task
   * @param taskEdit - task with the details updated
   */
  updateTask(taskEdit: Task) {
    try {
      // Task found based on the Id of the task passed as a paramether
      let TaskFound = this.TaskList.find(
        (task: Task) => task.id == taskEdit.id
      );
      if (!TaskFound) return;

      // Loop over the found task details and update them
      for (const detail in TaskFound) {
        if (detail == 'id') continue;

        (TaskFound as any)[detail] = (taskEdit as any)[detail];
      }

      // Inform that the tasks have been updated
      this.TasksChanged.next(this.TaskList.slice());
    } catch (error) {}
  }

  /** Delete the Task passed
   * @param id - id of the Task that must be deleted
   */
  deleteTask(id: string) {
    // Task found based on the Id of the task passed as a paramether
    const TaskFound = this.TaskList.indexOf(
      this.TaskList.find((task: Task) => task.id == id) as Task
    );

    if (TaskFound < 0) return;

    // Remove the Task from the list and inform that the List has been updated
    this.TaskList.splice(TaskFound, 1);
    this.TasksChanged.next(this.TaskList.slice());
  }

  deleteTasks(ids: string[]) {
    try {
      ids.forEach((id: string) => {
        // Task found based on the Id of the task passed as a paramether
        const TaskFound = this.TaskList.indexOf(
          this.TaskList.find((task: Task) => task.id == id) as Task
        );

        if (TaskFound < 0) return;

        // Remove the Task from the list and inform that the List has been updated
        this.TaskList.splice(TaskFound, 1);
      });

      this.TasksChanged.next(this.TaskList.slice());
    } catch (error) {}
  }
}
