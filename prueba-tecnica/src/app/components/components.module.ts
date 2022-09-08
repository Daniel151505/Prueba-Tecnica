import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { TotalServicesComponent } from './total-services/total-services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { SearchPipe } from '../pipes/search.pipe';
import { PaginatePipe } from '../pipes/paginate.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    ServiceDetailComponent,
    TotalServicesComponent,
    SearchComponent,
    SearchPipe,
    PaginatePipe
  ],
  exports: [
    NavbarComponent,
    ServiceDetailComponent,
    TotalServicesComponent,
  ],
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
})
export class ComponentsModule { }
