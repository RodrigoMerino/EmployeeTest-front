import { Component, OnInit } from '@angular/core';
import {
  employeeData,
  EmployeeServiceService,
} from 'src/app/Services/employee-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/Interfaces/Employee';
import { Area } from 'src/app/Interfaces/Area';
import { Subarea } from 'src/app/Interfaces/Subarea';
import {
  areaData,
  AreaServiceService,
} from 'src/app/Services/area-service.service';
import {
  SubareaServiceService,
  SubareaData,
} from 'src/app/Services/subarea-service.service';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  data: Employee;
  areas: areaData;
  subareas: Subarea[];

  constructor(
    private _employeeService: EmployeeServiceService,
    private formBuilder: FormBuilder,
    private _areaService: AreaServiceService,
    private _subareaService: SubareaServiceService
  ) {
    this.form = this.formBuilder.group({
      type_document: ['', [Validators.required]],
      document: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      idArea: ['', [Validators.required]],
      idSubarea: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAreas();
    // this.getSubareas();
    console.log(this.subareas);
    console.log(this.onSelect);
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
  onSubmit() {
    this.data = {
      typeDocument: this.form.get('type_document').value,
      document: this.form.get('document').value,
      name: this.form.get('name').value,
      lastName: this.form.get('lastName').value,
      idArea: this.form.get('idArea').value,
      idSubarea: this.form.get('idSubarea').value,
    };

    this._employeeService.createEmployee(this.data).subscribe((res) => {
      this.form.reset();
    });
    console.log(this.form);
  }
}
