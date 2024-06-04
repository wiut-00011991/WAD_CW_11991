import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProjectItem } from '../interfaces/ProjectItem';

@Injectable({
  providedIn: 'root'
})
export class ProjectItemService {
  httpClient = inject(HttpClient);
  constructor() { }

  getAllProjects(){
    return this.httpClient.get<ProjectItem[]>("http://localhost:5187/api/ProjectItems")
  };

  getProjectByID(id:number){
    return this.httpClient.get<ProjectItem>("http://localhost:5187/api/ProjectItems/"+id);
  };
  edit(item:ProjectItem){
    return this.httpClient.put("http://localhost:5187/api/ProjectItems/", item);  
  };
  delete(id:number){
    return this.httpClient.delete("http://localhost:5187/api/ProjectItems/"+id);
  };
  create(item:ProjectItem){
    return this.httpClient.post<ProjectItem>("http://localhost:5187/api/ProjectItems", item);
  };
  
}