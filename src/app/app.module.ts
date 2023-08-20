import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { OngoingTaskComponent } from './ongoing-task/ongoing-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    OngoingTaskComponent,
    CompletedTaskComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
