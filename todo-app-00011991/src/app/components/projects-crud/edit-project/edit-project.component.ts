import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskItemService } from '../../../services/taskitem.service';
import { ProjectItemService } from '../../../services/projectItem.service';
import { ProjectItem } from '../../../interfaces/ProjectItem';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {
  taskItemService = inject(TaskItemService);
  projectService = inject(ProjectItemService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  projectItem: ProjectItem = {
    id: 0,
    name: "",
    description:  null,
    startDate: new Date(),
    endDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: []
  }
  selected: any;
  pID: number = 0;
  ngOnInit() {
    const projectId = parseInt(this.activatedRoute.snapshot.params["id"], 10);
    this.projectService.getProjectByID(projectId)
      .subscribe((resultedItem) => {
        this.projectItem = resultedItem;
        this.taskItemService.getAllTaskItems().subscribe((tasks) => {
          this.projectItem.tasks = tasks.filter(task => task.projectId === projectId);
        });
      });
  }

  goHome() {
    this.router.navigateByUrl("home")
  }

  edit() {
    this.projectService.edit(this.projectItem).subscribe({
      next: (res)=>{
      alert("Changes has been updated")
      console.log(this.projectItem.name)
      console.log(this.projectItem.description)
      this.router.navigateByUrl("home");
    },
    error: (error) => {
      alert(`Error editing item: ${error.message}`); // notify user about errors
    }
  })
  }
}