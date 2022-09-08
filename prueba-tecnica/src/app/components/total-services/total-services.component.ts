import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Service } from 'src/app/models/service';
import { TotalService } from 'src/app/services/totalServices.service';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';

@Component({
  selector: 'app-total-services',
  templateUrl: './total-services.component.html',
  styleUrls: ['./total-services.component.scss']
})
export class TotalServicesComponent implements OnInit {

  public serviceType: any[] = ['Todos', 'Autos', 'Salud', 'Hogar']
  public services: Service[] = [];
  public type = 'Todos';
  public searchName = '';
  public filterValue: any = '';

  lowValue: number = 0;
  highValue: number = 5;
  pageSize:number = 12;
  pageNumber:number = 1;
  pageSizeOptions: number[] = [12,20,50,100]

  public showSpinner = true;
  public new = false;

  public closeCancel: String = '';

  constructor(
    private totalServices: TotalService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.filter();
  }

  async loadPage(type?: any) {

    if (this.closeCancel === 'Cancel') {
      this.showSpinner === false;
    } else {
      this.showSpinner === true;
    }

    await setTimeout(() => {
      try {
        this.services = this.totalServices.getServices();

        if(type !== 'Todos') {
          this.services= this.services.filter(value => value.type === this.type)
        }

        this.showSpinner = false;
        console.log(this.services.length, 'tomate')

        if (this.services.length === 0) {
          this.new = true;
          console.log(this.new)
        } else {
          this.new = false;
          console.log(this.new)
        }

      } catch (error) {
        console.log(error)
      }
    }, 1000);
  }

  public getPaginatorData(event: PageEvent) {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
  }

  openDialogDetail(index?: any, service?: any) {
    console.log(index)
    const data = { service: service,
                    index: index }
    const dialogRef = this.dialog.open(ServiceDetailComponent, {
      width: '50%',
      data
    });
    dialogRef.afterClosed().subscribe( res => {

      if(res === null) {
        this.showSpinner = false;
        this.closeCancel = 'Cancel';
      } else {
        this.showSpinner = true;
      }

      this.loadPage(this.type);
    });
  }

  deleteService(service: any) {
    this.totalServices.deleteService(service);
    this.loadPage(this.type);
    this.showSpinner = true;
  }

  filter () {
    this.loadPage(this.type);
    this.showSpinner = true;
  }

  handleSearch(value: String) {
    this.filterValue = value;
  }

  handlePage(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

}
