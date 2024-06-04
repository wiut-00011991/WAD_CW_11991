import { Component, inject } from '@angular/core';
import { ProjectItem } from '../../../interfaces/ProjectItem';
import { ProjectItemService } from '../../../services/projectItem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TaskItemService } from '../../../services/taskitem.service';

@Component({
  selector: 'app-delete-project',
  standalone: true,
  imports: [MatChipsModule, MatCardModule, MatButtonModule],
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.css'
})
export class DeleteProjectComponent {
  deleteProject:ProjectItem={
    id: 0,
    name: "",
    description:  null,
    startDate: new Date(),
    endDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: []
  };

  taskService = inject(TaskItemService)
  projectService = inject(ProjectItemService)
  activateRoute= inject(ActivatedRoute)
  router = inject(Router)

  ngOnInit(){
    this.projectService.getProjectByID(this.activateRoute.snapshot.params["id"]).subscribe((result)=>{
      this.deleteProject = result
      this.taskService.getAllTaskItems().subscribe(tasks => {
        this.deleteProject.tasks = tasks.filter(task => task.projectId === this.deleteProject.id);
      });
    });
  }
  
  onHomeButtonClick(){
    this.router.navigateByUrl("home")
  }
  
  onDeleteButtonClick(id: number) {
    console.log(this.deleteProject.id);
    this.projectService.delete(this.deleteProject.id).subscribe({
      next: () => {
        alert("Deleted item with ID: " + id);
        this.router.navigateByUrl("home");
      },
      error: (error) => {
        alert(`Error deleting item: ${error.message}`); // notify user about errors
      }
    });
  }
}
