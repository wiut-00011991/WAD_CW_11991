import { Component, inject } from '@angular/core';
import { TaskItem } from '../../../interfaces/TaskItem';
import { TaskItemService } from '../../../services/taskitem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips'
import {MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [MatChipsModule,MatCardModule, MatButton], // importing required components (angular material)
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class TaskDetailsComponent {
  router = inject(Router); // router to navigate within our app (see app.routes.ts)
  detailsTask:TaskItem={
    id: 0,
    name: "",
    description: "",
    dueDate: new Date(),
    contributionComment: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    projectId: 0,
    project: {
      id: 0,
      name: "",
      description: null,
      startDate: new Date(),
      endDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      tasks: []
    }
  }; // empty task object that is filled when service finds it
  
  serviceTask = inject(TaskItemService) // make requests through the service

  activatedRoute = inject(ActivatedRoute) // get access to currently activated route
  ngOnInit(){
    this.serviceTask.getByID(this.activatedRoute.snapshot.params["id"])
      .subscribe((resultedItem)=>{ this.detailsTask=resultedItem }); // get the id from url parameters and find the task
  }
  goHome(){
    this.router.navigateByUrl("home")
  }
}
