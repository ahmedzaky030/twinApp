import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemApi } from '../../api/services';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  isDeleting: boolean;
  isNew: boolean;
  searchText: string;
  modalBody:string;
  selectedItem:any;
  items = [];
  itemForm: FormGroup;
  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ,
     private itemApi: ItemApi,
     private _fb: FormBuilder ) { }

  ngOnInit() {
    this.itemForm = this._fb.group({
      itemName:['', Validators.required],
      type:['', Validators.required],
      price:[0.0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      validateDate:new Date() 
    })
    this.getItemsList();
  }

  getResult(){
    this.itemApi.getItemList(this.searchText).subscribe(data => {
      this.items = data;
    })
  }

  openModal(template : TemplateRef<any>, itemObj: any){
    this.modalRef = this._modalService.show(template);
    if(itemObj) {
      this.isNew = false;
      this.selectedItem = itemObj;}
    else { 
      this.isNew = true;
      this.selectedItem = Item.createNew()}
    this.itemForm.patchValue(this.selectedItem);
  }

  openDeleteModal(template : TemplateRef<any>, itemObj: any){
    this.modalRef = this._modalService.show(template);
    this.modalBody = "Are you sure to remove " + itemObj.itemName ; 
    console.log(this.modalBody);
    this.selectedItem = itemObj;
  }

  confirm(){
    this.isDeleting = true;
    this.itemApi.deleteItem(this.selectedItem._id).subscribe(data => {
      this.modalBody = this.selectedItem.itemName + ' has been deleted successfully';
      this.getItemsList();
      console.error('document deleted', data);
      setTimeout(() => {
        this.modalRef.hide();
        this.isDeleting = false;
      }, 2000)
    })
    
  }

  cancel(){
    this.selectedItem = null;
    this.modalRef.hide();
  }

  save(){
    if(!this.isNew){
    this.itemApi.modifyItem(this.selectedItem._id,this.itemForm.value).subscribe(data => {
      console.log('Modified data is ',data);
      this.modalRef.hide();
  this.getItemsList();
    })
  } else {
    this.itemApi.createItem(this.itemForm.value).subscribe(data => {
      console.log('New Created data is ',data);
      this.modalRef.hide();
  this.getItemsList();
    })
  }
  
  }

  getItemsList(){
    this.itemApi.getItemList().subscribe(data => {
      console.log('data from server', data);
      this.items = data;
    })

  }
}

class Item{
  constructor(
    private itemName: string,
    private price: Number,
    private type: string,
    private quantity: Number,
    private validateDate: Date
  ){}

  public static createNew(){
    return new Item("", 0 , "", 0 , new Date())
  }
}