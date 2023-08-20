import { Component, OnInit } from '@angular/core';
import { AddService } from '../add.service';
import { Task } from '../task';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent implements OnInit {
  completedTasks: Task[] = [];// Array to store completed tasks.
  constructor(private service: AddService) { }
  ngOnInit(): void {
    // On component initialization, retrieve completed tasks from the service.
    this.service.getCompletedTodos().pipe(
      tap((response: HttpResponse<Task[]>) => {
        // Check the response status
        if (response.status === 200) {
          // Extract the tasks data from the response body
          const tasks: Task[] = response.body || [];
          this.completedTasks=tasks;
        } else {
          console.error('Failed to fetch todos. Status:', response.status);
        }
      })
    ).subscribe(
      () => {
        // The subscribe block is empty as we are using `tap` to modify data.
        // No further action is required after fetching tasks.
      },
      (error: any) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
}
