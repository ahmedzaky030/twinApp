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
  isDeleting: boolean;
  searchText: string;
  isNew:boolean;
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
    if(!clinicObj) { 
      this.isNew = true;
      this.selectedClinic = Clinic.createNew(); }
     else { 
      this.isNew = false; 
      this.selectedClinic = clinicObj; }
    
    this.clinicForm.patchValue(this.selectedClinic);
  }

  getResult(){
    this.clinicApi.getClinicList(this.searchText).subscribe(data => {
      this.clinics = data;
    })
  }

  openDeleteModal(template : TemplateRef<any>, clinicObj: any){
    this.modalRef = this._modalService.show(template);
    this.modalBody = "Are you sure to remove " + clinicObj.clinicName ; 
    this.selectedClinic = clinicObj;
  }

  confirm(){
    this.isDeleting = true;
    this.clinicApi.deleteClinic(this.selectedClinic._id).subscribe(data => {
      this.modalBody = this.selectedClinic.clinicName + ' has been deleted successfully';
      this.getClinicsList();
     setTimeout(() => {
        this.modalRef.hide();
        this.isDeleting = false;        
      }, 2000)
    })
  }

  cancel(){
    this.selectedClinic = null;
    this.modalRef.hide();
  }

  save(){
    if(!this.isNew){
    this.clinicApi.modifyClinic(this.selectedClinic._id,this.clinicForm.value).subscribe(data => {
      this.modalRef.hide();
      this.getClinicsList();
    })
    } else {
    this.clinicApi.createClinic(this.clinicForm.value).subscribe(data => {
      this.modalRef.hide();
      this.getClinicsList();
      })
    }
  }

  getClinicsList(){
    this.clinicApi.getClinicList().subscribe(data => {
      this.clinics = data;
    })

  }

}

 class Clinic {
 
 constructor(
  private  clinicName:string,
  private  clinicPhoneNum:string,
  private  address:string,
 ){}

 public static createNew(){
   return new Clinic("","", "");
 }
}
