import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { employeeData } from '../Services/employee-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() Item: employeeData[];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
