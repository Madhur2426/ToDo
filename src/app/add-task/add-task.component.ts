import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { AddService } from '../add.service';
import { Route, Router } from '@angular/router';
import { tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskNumber: string='';//task description entered by the user
  lastSavedId: number=1;//last saved task ID retrieved from the database
  todos!: Task[];

  constructor(private service: AddService,private router:Router) { }

  ngOnInit(): void {
    // Fetch the last saved task ID from the database on component initialization
    this.fetchLastSavedId();
    this.fetchPedningTask();
  }

   /**
   * Method to fetch pending tasks from the service.
   * @return void 
   */
   fetchPedningTask():void{
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


   /**
   * Method to fetch the last saved task ID from the database
   * @return void 
   */
  fetchLastSavedId(): void{
  // Update the 'lastSavedId' with the retrieved ID + 1 to use for the new task
   this.service.getLastSavedId().subscribe(
      (lastId: any) => {
        this.lastSavedId = lastId+1;
      },
      (error: any) => console.error('Error fetching last saved ID:', error)
    );
  }

   /**Method to add a new task
   * Method to fetch the last saved task ID from the database
   * @return void 
   */
  addTask(): void {
    // Create a new 'Task' object with the entered task description and the 'lastSavedId'
    const task: Task = {
      id: this.lastSavedId,
      task: this.taskNumber,
      completed: false,
    };
    // Send the new task data to the database for saving
    this.service.pushData(task).subscribe(
      (result: any) => {
      },
      (error: any) => {
        console.error(error);
      }
    );
    // Increment the 'lastSavedId' for the next new task and reset the taskNumber input field.
    this.lastSavedId++;
    this.taskNumber = '';
  }
  /**Method to navigate to completed task page
   * @return void 
   */
  showOngoingTask():void{
    this.router.navigate(['ongoing']);
  }
  /**Method to navigate to completed task page
   * @return void 
   */
  showCompletedTask():void{
    this.router.navigate(['completed']);
  }
}
