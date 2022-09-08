import { Injectable } from '@angular/core';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class TotalService {
  services: any[] = [];

  constructor() {

  }

  getServices() {
    if(localStorage.getItem('services') === null) {
      this.services = [];
    } else {
      this.services = JSON.parse(localStorage.getItem('services')!);
    }
    return this.services;
  }

  addService(service: Service) {
    this.services.push(service);
    let services = [];
    if(localStorage.getItem('services') === null) {
      services = [];
      services.push(service);
      localStorage.setItem('services', JSON.stringify(services));
    } else {
      services = JSON.parse(localStorage.getItem('services')!);
      services.push(service);
      localStorage.setItem('services', JSON.stringify(services));
    }
  }

  deleteService(index: any) {
    for (let i = 0; i < this.services.length; i++) {
      if (index == this.services[i]) {
        this.services.splice(i, 1);
        localStorage.setItem('services', JSON.stringify(this.services));
      }
    }
  }

  putService(i: any, payload: Service) {
    this.services.forEach((value, index) => {
      if(index === i) {
        this.services[index] = payload;
      }
    })

    localStorage.setItem('services', JSON.stringify(this.services));

  }
}
