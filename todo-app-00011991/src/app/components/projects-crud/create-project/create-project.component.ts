import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ProjectItemService } from '../../../services/projectItem.service';
import { Router } from '@angular/router';
import { ProjectItem } from '../../../interfaces/ProjectItem';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatChipsModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  projectService = inject(ProjectItemService);
  router = inject(Router);
  createProject: ProjectItem = {
    id: 0,
    name: "",
    description:  null,
    startDate: new Date(),
    endDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: []
  }
  create() {
    this.projectService.create(this.createProject).subscribe({
      next: (result) =>{
      alert("Project Saved")
      this.router.navigateByUrl("home")
    },
    error: (error) => {
      alert(`Error creating item: ${error.message}`); // notify user about errors
    }
  });
  };
  cancel(){
    this.router.navigateByUrl("home");
  }
}
