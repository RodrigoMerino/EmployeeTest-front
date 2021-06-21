import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDataComponent } from './view/employee-data/employee-data.component';
import { EmployeeFormComponent } from './view/employee-form/employee-form.component';

const routes: Routes = [
  { path: '', component: EmployeeDataComponent },
  { path: 'employees', component: EmployeeDataComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [EmployeeDataComponent, EmployeeFormComponent];
