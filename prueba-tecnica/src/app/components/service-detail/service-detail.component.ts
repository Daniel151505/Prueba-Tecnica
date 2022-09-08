import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TotalService } from 'src/app/services/totalServices.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
    public data: any;

    public serviceType: any[] = ['Autos' , 'Salud' , 'Hogar'];
    public form!: FormGroup;

  constructor(
    protected fb: FormBuilder,
    private totalServices: TotalService,
    public dialogRef: MatDialogRef<ServiceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
  ) {
    this.data = dataModal;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, this.validateFormat])],
      type: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(43), this.validateFormat])],
    });

    if (this.data) {
      this.form.patchValue(this.data.service);
    }
  }

  private validateFormat(control: AbstractControl): ValidationErrors | null {
    const name = control.value;
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(name)) {
      return { validateFormat: true };
    }
    return null;
  }

  async submitForm() {
    const payload = {
      name: this.form.get('name')?.value.trim(),
      type: this.form.get('type')?.value,
      description: this.form.get('description')?.value.trim()
    };
    try {

      if (this.data.index > -1) {
        await this.totalServices.putService(this.data.index, payload);
      } else {
        await this.totalServices.addService(payload);
      }

      this.dialogRef.close();

    } catch (e) {
      console.error(e)
    }
  }


  closeDialog() {
    this.dialogRef.close(null);
  }





}
