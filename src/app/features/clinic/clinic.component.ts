import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ClinicApi } from '../../api/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'q';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {
  addFlag: boolean;
  editFlag: boolean;
  modalBody:string;
  selectedClinic:any;
  clinics = [];
  clinicForm: FormGroup;
  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ,
     private clinicApi: ClinicApi,
     private _fb: FormBuilder ) { }

  ngOnInit() {
    this.clinicForm = this._fb.group({
      clinicName:['', Validators.required],
      clinicPhoneNum:['', Validators.required],
      address:''
    })
    this.getClinicsList();
  }

  openModal(template : TemplateRef<any>, clinicObj: any){
    this.modalRef = this._modalService.show(template);
    if(clinicObj) this.selectedClinic = clinicObj;
    this.clinicForm.patchValue(this.selectedClinic);
  }

  openDeleteModal(template : TemplateRef<any>, clinicObj: any){
    this.modalRef = this._modalService.show(template);
    this.modalBody = "Are you sure to remove " + clinicObj.clinicName ; 
    console.log(this.modalBody);
    this.selectedClinic = clinicObj;
  }

  confirm(){
    this.clinicApi.deleteClinic(this.selectedClinic._id).subscribe(data => {
      this.modalBody = this.selectedClinic.clinicName + ' has been deleted successfully';
      this.getClinicsList();
      console.error('document deleted', data);
      setTimeout(() => {
        this.modalRef.hide();
      }, 2000)
    })
  }

  cancel(){
    this.selectedClinic = null;
    this.modalRef.hide();
  }

  save(){
    if(this.selectedClinic){
    this.clinicApi.modifyClinic(this.selectedClinic._id,this.clinicForm.value).subscribe(data => {
      console.log('Modified data is ',data);
      this.modalRef.hide();
  this.getClinicsList();
    })
  } else {
    this.clinicApi.createClinic(this.clinicForm.value).subscribe(data => {
      console.log('New Created data is ',data);
      this.modalRef.hide();
  this.getClinicsList();
    })
  }
  
  }

  getClinicsList(){
    this.clinicApi.getClinicList().subscribe(data => {
      console.log('data from server', data);
      this.clinics = data;
    })

  }

}

 class Clinic {
 public  clinicName:string;
 public  clinicPhoneNum:string;
 public  address:string;
}
