import { Component, inject } from '@angular/core';
import { ProjectItem } from '../../../interfaces/ProjectItem';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectItemService } from '../../../services/projectItem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskItem } from '../../../interfaces/TaskItem';
import { TaskItemService } from '../../../services/taskitem.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-details-project',
  standalone: true,
  imports: [MatChipsModule,MatCardModule, MatButton, CommonModule],
  templateUrl: './details-project.component.html',
  styleUrl: './details-project.component.css'
})
export class DetailsProjectComponent {
  router = inject(Router);
  projectDetails:ProjectItem={
    id: 0,
    name: "",
    description:  null,
    startDate: new Date(),
    endDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: []
  };
  tasks: TaskItem[]=[]
  
  projectService = inject(ProjectItemService)
  taskService = inject(TaskItemService)

  activatedRoute = inject(ActivatedRoute)
  ngOnInit(){
    const projectId = parseInt(this.activatedRoute.snapshot.params["id"], 10);
    this.projectService.getProjectByID(projectId)
      .subscribe((resultedItem) => {
        this.projectDetails = resultedItem;

        // Filter tasks by project ID
        this.taskService.getAllTaskItems().subscribe(tasks => {
          this.tasks = tasks.filter(task => task.projectId === projectId);
        });
      });
  }
  goHome(){
    this.router.navigateByUrl("home")
  }
}
