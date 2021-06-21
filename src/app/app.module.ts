import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './includes/side-bar/side-bar.component';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { EmployeeDataComponent } from './view/employee-data/employee-data.component';
import { EmployeeFormComponent } from './view/employee-form/employee-form.component';
import { PaginationComponent } from './pagination/pagination/pagination.component';
import { ModalComponent } from './modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavbarComponent,
    EmployeeDataComponent,
    EmployeeFormComponent,
    PaginationComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
