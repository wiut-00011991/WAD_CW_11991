import { Component, inject } from '@angular/core';
import { TaskItem } from '../../../interfaces/TaskItem';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TaskItemService } from '../../../services/taskitem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [MatChipsModule, MatCardModule, MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteTaskComponent {
  deleteTask:TaskItem={
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
  };

  service = inject(TaskItemService) // handle requests using service
  activateRoute= inject(ActivatedRoute) // get access to current route
  router = inject(Router) // navigate using injected router

  ngOnInit(){
    this.service.getByID(this.activateRoute.snapshot.params["id"]).subscribe((result)=>{
      this.deleteTask = result
    }); // get id from the url parameters, get the task from api and assign it to the empty deleteTask object
  }
  
  onHomeButtonClick(){
    this.router.navigateByUrl("home")
  }
  
  onDeleteButtonClick(id: number) {
    console.log(this.deleteTask.id); // for debug
    this.service.delete(this.deleteTask.id).subscribe({
      next: () => {
        alert("Deleted item with ID: " + id);
        this.router.navigateByUrl("home"); // redirect to home route after successful deletion
      },
      error: (error) => {
        alert(`Error deleting item: ${error.message}`); // notify user about errors
      }
    });
  }
}
