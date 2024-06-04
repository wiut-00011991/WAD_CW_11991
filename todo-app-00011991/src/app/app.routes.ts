import { Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { CreateTaskComponent } from './components/tasks-crud/create/create.component';
import { EditComponent } from './components/tasks-crud/edit/edit.component';
import { DeleteTaskComponent } from './components/tasks-crud/delete/delete.component';
import { TaskDetailsComponent } from './components/tasks-crud/details/details.component';
import { ShowProjectsComponent } from './components/show-projects/show-projects.component';
import { CreateProjectComponent } from './components/projects-crud/create-project/create-project.component';
import { EditProjectComponent } from './components/projects-crud/edit-project/edit-project.component';
import { DeleteProjectComponent } from './components/projects-crud/delete-project/delete-project.component';
import { DetailsProjectComponent } from './components/projects-crud/details-project/details-project.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"projects",
        component:ShowProjectsComponent
    },
    {
        path:"createTask",
        component:CreateTaskComponent
    },
    {
        path:"editTask/:id",
        component:EditComponent
    },
    {
        path:"deleteTask/:id",
        component:DeleteTaskComponent
    },
    {
        path:"taskDetails/:id",
        component:TaskDetailsComponent
    },
    {
        path:"createProject",
        component:CreateProjectComponent
    },
    {
        path:"editProject/:id",
        component:EditProjectComponent
    },
    {
        path:"deleteProject/:id",
        component:DeleteProjectComponent
    },
    {
        path:"projectDetails/:id",
        component:DetailsProjectComponent
    }
];
