import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { environment } from './environment';
@Injectable({
  providedIn: 'root'
})
export class AddService {
  completedTask: Task[] = [];// Array to store completed tasks.
  constructor(private http: HttpClient) { }

  // Method to send a new task to the database for saving.
  pushData(task: Task) {
    const saveUrl = environment.saveTaskUrl;
    return this.http.post(saveUrl, task, { observe: 'response', responseType: 'text' });
  }
  pushCompletedData(task: any) {
    const saveUrl = environment.saveCompletedTaskUrl;
    // console.log("Pushing completed task",task);
    
    return this.http.post(saveUrl, task, { observe: 'response', responseType: 'text' });
  }
  getCompletedTodos(): Observable<HttpResponse<Task[]>>{
    const getUrl = environment.getCompletedTaskUrl;
    return this.http.get<Task[]>(getUrl,{ observe: 'response'});
  }
  // Method to retrieve all tasks from the database.
  getTodos(): Observable<HttpResponse<Task[]>>{
    const getUrl = environment.getTaskUrl;
    return this.http.get<Task[]>(getUrl,{ observe: 'response' });
  }

  // Method to update the completion status of a task on the database.
  updateTodo(id: number) {
    const updateUrl = environment.updateTaskUrl;
    return this.http.put(updateUrl, id,{ observe: 'response'});
  }

  // Method to get the last saved task ID from the database.
  getLastSavedId(): Observable<Number> {
    const getLastUrl = environment.getLastIdUrl;
    return this.http.get<Number>(getLastUrl);
  }
}
