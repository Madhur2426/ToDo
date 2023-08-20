import { Component, OnInit } from '@angular/core';
import { AddService } from '../add.service';
import { Task } from '../task';
import { tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-ongoing-task',
  templateUrl: './ongoing-task.component.html',
  styleUrls: ['./ongoing-task.component.css']
})
export class OngoingTaskComponent implements OnInit {
  todos!: Task[];
  completedToDos!: Task[];
  ngOnInit(): void {
    // Fetch ongoing tasks when the component initializes.    
    this.fetchTodos();
    //this.saveCopletedTask();
  }
  constructor(private service: AddService) { }

  /**
   * Method to fetch ongoing tasks from the service.
   * @return void 
   */
  fetchTodos(): void {
    this.service.getTodos().pipe(
      tap((response: HttpResponse<Task[]>) => {
        // Check the response status
        if (response.status === 200) {
          // Extract the tasks data from the response body
          const tasks: Task[] = response.body || [];
          this.todos = tasks.filter((task: Task) => this.checkIsNotCompleted(task.completed));
          this.service.completedTask = tasks.filter((task: Task) => this.checkIsCompleted(task.completed));          
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

  /**
   * Method to check if a task is not completed
   * @param isCompleted
   * @return boolean 
   */
  checkIsNotCompleted(isCompleted: boolean): boolean {
    if (isCompleted == true)
      return false;
    return true;
  }

  /**
   * Method to check if a task is completed.
   * @param isCompleted
   * @return boolean 
   */
  checkIsCompleted(isCompleted: boolean): boolean {
    if (isCompleted == false)
      return false;
    return true;
  }

  /*
   * Method to update the completion status of a task.
   * @param id
   * @return void 
   */
  updateTask(id: number): void {
    this.service.updateTodo(id).subscribe(
      (completedTodos: any) => {
        // Update the list of completed tasks and fetch ongoing tasks again.
        if(completedTodos.status===200){
        this.service.completedTask = completedTodos.body;
        this.pushDataComplete(this.service.completedTask);
        }
      },
      (error: any) => {
        console.error('Error updating task:', error);
      }
    );
   
  }

  pushDataComplete(todo : any):void {
    console.log("pushing data from pushDataComplete)",this.service.completedTask)
    this.service.pushCompletedData(todo).subscribe(data => {
      console.log("data pushed by service"); console.log(this.service.completedTask);
    });
    this.fetchTodos();
  }
}







