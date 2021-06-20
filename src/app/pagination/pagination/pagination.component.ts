import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  constructor() {}
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  ngOnInit(): void {}

  onPrev(): void {
    this.goPrev.emit(true);
  }
  onNext(): void {
    this.goNext.emit(true);
  }
}
