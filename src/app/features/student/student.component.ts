import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentApi } from '../../api/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  isDeleting: boolean;
  searchText: string;
  isNew:boolean;
  modalBody:string;
  selectedStudent:any;
  students = [];
  studentForm: FormGroup;
  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ,
     private studentApi: StudentApi,
     private _fb: FormBuilder, 
     private router : Router ) { }

  ngOnInit() {
    this.studentForm = this._fb.group({
      studentName:['', Validators.required],
      university:['', Validators.required],
      grade:'',
      code:''
    })
    this.getStudentsList();
  }

  updateReq( student: any){
    this.studentApi.modifyStudent(student._id, student).subscribe(data =>{
      this.studentApi.getStudentList();
    })
  }

  getResult(){
    this.studentApi.getStudentList(this.searchText).subscribe(data => {
      this.students = data;
    })
  }

  openModal(template : TemplateRef<any>, studentObj: any){
    this.modalRef = this._modalService.show(template);
    if(!studentObj) { 
      this.isNew = true;
      this.selectedStudent = Student.createNew(); }
     else { 
      this.isNew = false; 
      this.selectedStudent = studentObj; }
    this.studentForm.patchValue(this.selectedStudent);
  }

  openDeleteModal(template : TemplateRef<any>, studentObj: any){
    this.modalRef = this._modalService.show(template);
    this.modalBody = "Are you sure to remove " + studentObj.studentName ; 
    this.selectedStudent = studentObj;
  }

  confirm(){
    this.isDeleting = true;
    this.studentApi.deleteStudent(this.selectedStudent._id).subscribe(data => {
      this.modalBody = this.selectedStudent.studentName + ' has been deleted successfully';
      this.getStudentsList();
      setTimeout(() => {
        this.modalRef.hide();
        this.isDeleting = false;        
      }, 2000)
    })
  }

  cancel(){
    this.selectedStudent = null;
    this.modalRef.hide();
  }

  save(){
    if(!this.isNew){
    this.studentApi.modifyStudent(this.selectedStudent._id,this.studentForm.value).subscribe(data => {
      this.modalRef.hide();
  this.getStudentsList();
    })
  } else {
    this.studentApi.createStudent(this.studentForm.value).subscribe(data => {
      this.modalRef.hide(); 
      this.getStudentsList();
    })
  }
   
  }

  getStudentsList(){
    this.studentApi.getStudentList().subscribe(data => {
      this.students = data;
    })
  }

  makeOrder(st){
    this.router.navigate(['order',st._id,'student']);
  }
}

class Student {
  constructor(
    private studentName:string,
    private university: string,
    private grade: string,
    private requirement: Requirement,
    private code: string
  ){}

  public static createNew(){
    return new Student("","", "",Requirement.createNew() ,"")
  }
}

class Requirement {
  constructor(
    private frst:boolean,
    private scnd:boolean,
    private thrd:boolean,
    private frth:boolean
  ){}

  public static createNew(){
    return new Requirement(false,false,false,false)
  }
}
