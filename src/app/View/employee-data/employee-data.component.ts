import { Component, OnInit } from '@angular/core';
import {
  employeeData,
  EmployeeServiceService,
} from 'src/app/Services/employee-service.service';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css'],
})
export class EmployeeDataComponent implements OnInit {
  constructor(private _employeeService: EmployeeServiceService) {}
  dataSource: employeeData;

  CurrentPage = 1;
  PageSize = 10;
  total: 0;

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe((res) => {
      (this.dataSource = res), console.log((this.dataSource = res));
    });
  }

  getAllPaginated() {
    this._employeeService
      .getAllPaginated(this.CurrentPage, this.PageSize)
      .subscribe((res) => {
        (this.dataSource = res), console.log((this.dataSource = res));
      });
  }

  goToPrevious(): void {
    console.log('go to previous');
    this.CurrentPage--;
    this.getAllPaginated();
  }
  goToNext(): void {
    console.log('go to next');
    this.CurrentPage++;
    this.getAllPaginated();
  }
}