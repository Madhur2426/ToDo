// environment.ts
// This file contains environment-specific configuration settings,
// such as API URLs, that can be used throughout the application.
export const environment = {
  // The URL to save a new task in the backend server.
    saveTaskUrl: 'http://localhost:8080/saveTask',  

// The URL to retrieve tasks from the backend server.
    getTaskUrl: 'http://localhost:8080/showTask',  
    
    // The URL template to update a task in the backend server.
    // The string "${id}" will be replaced with the actual task ID when used.
    updateTaskUrl: 'http://localhost:8080/update/${id}',

     // The URL to get the last assigned task ID from the backend server.
    getLastIdUrl: 'http://localhost:8080/lastId' ,
    saveCompletedTaskUrl:'http://localhost:8080/saveCompletedTask',
    getCompletedTaskUrl:'http://localhost:8080/showCompletedTask'

  };
  