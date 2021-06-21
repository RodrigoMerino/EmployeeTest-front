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

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css'],
})
export class EmployeeDataComponent implements OnInit, OnDestroy {
  dataSource: employeeData;
  suscription: Subscription;
  form: FormGroup;
  data: Employee;
  areas: areaData;
  subareas: Subarea[];
  idEmployee = 0;
  CurrentPage = 1;
  PageSize = 5;
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
    // this.getSubareas();
    console.log(this.subareas);
    console.log(this.onSelect);
    this.getAllPaginated();
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
      (this.dataSource = res), console.log((this.dataSource = res));
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
    this._areaService.getAreas().subscribe((res) => {
      this.areas = res;
    });
  }

  onSelect(id: number): void {
    this.subareas['data'] = this._subareaService
      .getSubareas(id)
      .subscribe((res) => {
        this.subareas = res['data'];
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
}
