import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TaskItem } from '../interfaces/TaskItem';
import { ProjectItem } from '../interfaces/ProjectItem';

@Injectable({
  providedIn: 'root'
})
export class TaskItemService {
  httpClient = inject(HttpClient);
  constructor() { }

  getAllTaskItems(){
    return this.httpClient.get<TaskItem[]>("http://localhost:5187/api/TaskItems")
  };

  getByID(id:number){
    return this.httpClient.get<TaskItem>("http://localhost:5187/api/TaskItems/"+id);
  };
  edit(item:TaskItem){
    return this.httpClient.put("http://localhost:5187/api/TaskItems/", item);  
  };
  delete(id:number){
    return this.httpClient.delete("http://localhost:5187/api/TaskItems/"+id);
  };
  create(item:TaskItem){
    return this.httpClient.post<TaskItem>("http://localhost:5187/api/TaskItems", item);
  };
  getAllProjects(){
    return this.httpClient.get<ProjectItem[]>("http://localhost:5187/api/ProjectItems")
  };
}
