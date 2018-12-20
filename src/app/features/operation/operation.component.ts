import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { OperationApi } from '../../api/services/operationApi';
import { ItemApi } from 'src/app/api/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {
  isDeleting: boolean;
  searchText: string;
  ingredients: FormArray;
  isNew:boolean;
  modalBody:string;
  selectedOperation:any;
  operations = [];
  items = [];
  getItemsSub: Subscription;
  operationForm: FormGroup;
  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ,
     private operationApi: OperationApi,
     private _fb: FormBuilder, 
     private itemsApi: ItemApi ) { }

  ngOnInit() {
    this.operationForm = this._fb.group({
      operationName:['', Validators.required],
      ingredients: this._fb.array([this.buildNewIngredient()])
    })
    console.log(this.operationForm);
    this.getOperationsList();
    this.getItemsList();
  }

  getItemsList(){
      this.getItemsSub = this.itemsApi.getItemList().subscribe(data => {
        console.log('get ditem in op',data);
        this.items = data;
      })
  }

  addItem(){
    this.ingredients = this.operationForm.controls.items as FormArray;
    this.ingredients.push(this.buildNewIngredient());
  }
  buildNewIngredient(){
    return this._fb.group({
      item:{},
      quantity:'',
      unit:''
    })
  }

  deleteFromArray(index){
    this.ingredients = this.operationForm.controls.items as FormArray;
    this.ingredients.removeAt(index);
  }
  openModal(template : TemplateRef<any>, operationObj: any){
    this.modalRef = this._modalService.show(template);
    if(!operationObj) { 
      this.isNew = true;
      this.selectedOperation = Operation.createNew(); }
     else { 
      this.isNew = false; 
      this.selectedOperation = operationObj;
    console.log(this.selectedOperation); }   
    this.operationForm.patchValue(this.selectedOperation);
    console.log(this.operationForm.value);
  }

  getResult(){
    this.operationApi.getOperationList(this.searchText).subscribe(data => {
      this.operations = data;
    })
  }

  openDeleteModal(template : TemplateRef<any>, operationObj: any){
    this.modalRef = this._modalService.show(template);
    this.modalBody = "Are you sure to remove " + operationObj.operationName ; 
    console.log(this.modalBody);
    this.selectedOperation = operationObj;
  }

  confirm(){
    this.isDeleting = true;
    this.operationApi.deleteOperation(this.selectedOperation._id).subscribe(data => {
      this.modalBody = this.selectedOperation.operationName + ' has been deleted successfully';
      this.getOperationsList();
      console.error('document deleted', data);
      setTimeout(() => {
        this.modalRef.hide();
        this.isDeleting = false;        
      }, 2000)
    })
    
  }

  cancel(){
    this.selectedOperation = null;
    this.modalRef.hide();
  }

  save(){
    console.log(this.operationForm.value);

    if(!this.isNew){
    this.operationApi.modifyOperation(this.selectedOperation._id,this.operationForm.value).subscribe(data => {
      console.log('Modified data is ',data);
      this.modalRef.hide();
  this.getOperationsList();
    })
   } else {
    this.operationApi.createOperation(this.operationForm.value).subscribe(data => {
      console.log('New Created data is ',data);
      this.modalRef.hide();
  this.getOperationsList();
    })
  }
   
  }

  getOperationsList(){
    this.operationApi.getOperationList().subscribe(data => {
      console.log('data from server', data);
      this.operations = data;
    })

  }

}

 class Operation {
 
 constructor(
  private  operationName:string,
  private  ingredients: Ingredient[],
  
 ){}

 public static createNew(){
   return new Operation("",[]);
 }
 }

 class Ingredient {
   constructor(
     private item: string,
     private quantity: Number,
     private unit: string
   ){}

   

 }