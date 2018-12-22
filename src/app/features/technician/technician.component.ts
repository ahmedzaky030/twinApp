import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TechnicianApi } from '../../api/services';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {
  isDeleting: boolean;
  searchText: string;
  isNew:boolean;
  modalBody:string;
  selectedTechnician:any;
  technicians = [];
  technicianForm: FormGroup;
  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ,
     private technicianApi: TechnicianApi,
     private _fb: FormBuilder ) { }

  ngOnInit() {
    this.technicianForm = this._fb.group({
      technicianName:['', Validators.required],
      partRate:'',
      monthlyRate:''
    })
    this.getTechniciansList();
  }

  getResult(){
    this.technicianApi.getTechnicianList(this.searchText).subscribe(data => {
      this.technicians = data;
    })
  }

  openModal(template : TemplateRef<any>, technicianObj: any){
    this.modalRef = this._modalService.show(template);
    if(!technicianObj) { 
      this.isNew = true;
      this.selectedTechnician = Technician.createNew(); }
     else { 
      this.isNew = false; 
      this.selectedTechnician = technicianObj; }
    this.technicianForm.patchValue(this.selectedTechnician);
  }

  openDeleteModal(template : TemplateRef<any>, technicianObj: any){
    this.modalRef = this._modalService.show(template);
    this.modalBody = "Are you sure to remove " + technicianObj.technicianName ; 
    this.selectedTechnician = technicianObj;
  }

  confirm(){
    this.isDeleting = true;
    this.technicianApi.deleteTechnician(this.selectedTechnician._id).subscribe(data => {
      this.modalBody = this.selectedTechnician.technicianName + ' has been deleted successfully';
      this.getTechniciansList();
      setTimeout(() => {
        this.modalRef.hide();
        this.isDeleting = false;        
      }, 2000)
    })
  }

  cancel(){
    this.selectedTechnician = null;
    this.modalRef.hide();
  }

  save(){
    if(!this.isNew){
    this.technicianApi.modifyTechnician(this.selectedTechnician._id,this.technicianForm.value).subscribe(data => {
      this.modalRef.hide(); 
      this.getTechniciansList();
    })
  } else {
    this.technicianApi.createTechnician(this.technicianForm.value).subscribe(data => {
      this.modalRef.hide(); 
      this.getTechniciansList();
    })
  }
  }

  getTechniciansList(){
    this.technicianApi.getTechnicianList().subscribe(data => {
      this.technicians = data;
    })
  }
}

class Technician {
 
  constructor(
   private  technicianName:string,
   private  partRate:string,
   private  monthlyRate:string,
  ){}
 
  public static createNew(){
    return new Technician("","", "");
  }
 }
