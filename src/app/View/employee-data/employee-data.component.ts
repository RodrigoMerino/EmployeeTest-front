import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  employeeData,
  EmployeeServiceService,
} from 'src/app/Services/employee-service.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/Interfaces/Employee';
import {
  areaData,
  AreaServiceService,
} from 'src/app/Services/area-service.service';
import { SubareaServiceService } from 'src/app/Services/subarea-service.service';
import { Subarea } from 'src/app/Interfaces/Subarea';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css'],
})
export class EmployeeDataComponent implements OnInit, OnDestroy {
  dataSource: employeeData;
  filter: employeeData;
  name: any;
  suscription: Subscription;
  form: FormGroup;
  data: Employee;
  areas: areaData;
  subareas: Subarea[];
  idEmployee = 0;
  CurrentPage = 1;
  PageSize = 10;
  total: any;

  constructor(
    private _employeeService: EmployeeServiceService,
    private formBuilder: FormBuilder,
    private _areaService: AreaServiceService,
    private _subareaService: SubareaServiceService,
    private toaster: ToastrService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      type_document: ['', [Validators.required]],
      document: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      idArea: ['', [Validators.required]],
      idSubarea: ['', [Validators.required]],
    });
  }

  private updateEmployee = new BehaviorSubject<employeeData>({} as any);

  ngOnInit(): void {
    this.getAreas();
    console.log(this.dataSource);
    // this.getSubareas();
    console.log(this.subareas);
    console.log(this.onSelect);
    this.getAllPaginated();
    // this.getEmployees();
    // this.getAllPaginatedEmployees();
    this.suscription = this._employeeService.getEmployee().subscribe((res) => {
      console.log(res);
      this.data = res;
      this.form.patchValue({
        type_document: this.data.typeDocument,
        document: this.data.document,
        name: this.data.name,
        lastName: this.data.lastName,
        idArea: this.data.idArea,
        idSubarea: this.data.idSubarea,
      });
      this.idEmployee = this.data.id;
    });
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  onSubmit() {
    if (this.idEmployee === 0) {
      this.createEmployee();
    } else {
      this.updatedEmployee();
    }
  }

  deleteEmployee(id: number) {
    this._employeeService.deleteEmployee(id).subscribe((res) => {
      this.toaster.success('yuo did', 'da');
      this.getAllPaginated();
    });
  }
  update(employee) {
    this._employeeService.update(employee);
  }

  updatedEmployee() {
    this.data = {
      id: this.data.id,
      typeDocument: this.form.get('type_document').value,
      document: this.form.get('document').value,
      name: this.form.get('name').value,
      lastName: this.form.get('lastName').value,
      idArea: this.form.get('idArea').value,
      idSubarea: this.form.get('idSubarea').value,
    };

    this._employeeService
      .updatedEmployee(this.idEmployee, this.data)
      .subscribe((res) => {
        this.getAllPaginated();
        this.form.reset();
        this.idEmployee = 0;
      });
    console.log(this.form);
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe((res) => {
      (this.total = this.statusCounter((this.data = res))),
        console.log(this.total);
    });
  }

  getAllPaginatedEmployees() {
    this._employeeService
      .getAllEmployeesPaginated(this.CurrentPage, this.PageSize)
      .subscribe((res) => {
        (this.data = res), console.log((this.data = res));
      });
  }

  getAllPaginated() {
    this._employeeService
      .getAllPaginated(this.CurrentPage, this.PageSize)
      .subscribe((res) => {
        (this.dataSource = res),
          (this.total = res['meta'].totalCount),
          console.log((this.dataSource = res));
      });
  }

  getAreas() {
    this._areaService.getAreasPython().subscribe((res) => {
      this.areas = res;
    });
  }

  onSelect(id: number): void {
    this._subareaService.getSubareasPython(id).subscribe((res) => {
      this.subareas = res;
    });
  }

  createEmployee() {
    this.data = {
      typeDocument: this.form.get('type_document').value,
      document: this.form.get('document').value,
      name: this.form.get('name').value,
      lastName: this.form.get('lastName').value,
      idArea: this.form.get('idArea').value,
      idSubarea: this.form.get('idSubarea').value,
    };

    this._employeeService.createEmployee(this.data).subscribe((res) => {
      this.getAllPaginated();
      this.form.reset();
    });
    console.log(this.form);
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

  goToPage(n: number) {
    this.CurrentPage = n;
    this.getAllPaginated();
  }

  Search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.dataSource['data'] = this.dataSource['data'].filter((res) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    }
  }

  statusCounter(inputs) {
    let counter = 0;
    for (var input of inputs) {
      if (input) counter += 1;
    }
    return counter;
  }
}
