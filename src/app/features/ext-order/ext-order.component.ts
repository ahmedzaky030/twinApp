import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExtOrderApi } from '../../api/services';
import { debug } from 'util';

@Component({
  selector: 'app-ext-order',
  templateUrl: './ext-order.component.html',
  styleUrls: ['./ext-order.component.css']
})
export class ExtOrderComponent implements OnInit {
  isDeleting: boolean;
  isNew:boolean;
  totalCost: number;
  totalPaid: number;
  searchText: string;
  modalBody:string;
  selectedExtOrder:any;
  extOrders = [];
  extOrderForm: FormGroup;
  modalRef: BsModalRef;
  result: number;
  constructor( private _modalService:BsModalService ,
     private extOrderApi: ExtOrderApi,
     private _fb: FormBuilder ) { }

  ngOnInit() {
    this.extOrderForm = this._fb.group({
      orderCode:['', Validators.required],
      cost:[0, Validators.required],
      paid:0,
      targetLaboratory:'',
      startDate:new Date(),
      deliveryDate: new Date()
    })
    this.getExtOrdersList();
  }
  getResult(){
    this.totalCost = 0;
    this.totalPaid = 0;
    this.extOrderApi.getExtOrderList(this.searchText).subscribe(data => {
      this.extOrders = data;
       this.extOrders.forEach((v, i) => {
         console.log(v.cost);
        this.totalCost += v.cost;
        this.totalPaid += v.paid;        
        this.result = this.totalCost - this.totalPaid;
      })
    })
  }

  openModal(template : TemplateRef<any>, extOrderObj: any){
    this.modalRef = this._modalService.show(template);
    console.log(extOrderObj);
    if(!extOrderObj) { 
      this.isNew = true;
      this.selectedExtOrder = ExtOrder.createNew(); }
     else { 
      this.isNew = false; 
      this.selectedExtOrder = extOrderObj; }
    
    console.log(this.selectedExtOrder);
    this.extOrderForm.patchValue(this.selectedExtOrder);
  }

  openDeleteModal(template : TemplateRef<any>, extOrderObj: any){
    this.modalRef = this._modalService.show(template);
    console.log(extOrderObj);
    this.modalBody = "Are you sure to remove order number :  " + extOrderObj.orderCode ; 
    console.log(this.modalBody);
    this.selectedExtOrder = extOrderObj;
  }

  confirm(){
    this.isDeleting = true;
    this.extOrderApi.deleteExtOrder(this.selectedExtOrder._id).subscribe(data => {
      this.modalBody = this.selectedExtOrder.orderCode + ' has been deleted successfully';
      this.getExtOrdersList();
      console.error('document deleted', data);
      setTimeout(() => {
        this.modalRef.hide();
        this.isDeleting = false;        
      }, 2000)
    })
    
  }

  cancel(){
    this.selectedExtOrder = null;
    this.modalRef.hide();
  }

  save(){
    if(!this.isNew){
    this.extOrderApi.modifyExtOrder(this.selectedExtOrder._id,this.extOrderForm.value).subscribe(data => {
      console.log('Modified data is ',data);
      this.modalRef.hide();
  this.getExtOrdersList();
    })
  } else {
    this.extOrderApi.createExtOrder(this.extOrderForm.value).subscribe(data => {
      console.log('New Created data is ',data);
      this.modalRef.hide();
  this.getExtOrdersList();
    })
  }
   
  }

  getExtOrdersList(){
    this.extOrderApi.getExtOrderList().subscribe(data => {
      console.log('data from server', data);
      this.extOrders = data;
    })

  }
}

class ExtOrder {
  constructor(
    private orderCode:string,
    private targetLaboratory: string, 
    private cost: number,
    private paid: number,
    private startDate: Date,
    private deliveryDate: Date  
  ){}

  public static createNew(){
    return  new ExtOrder("", "", 0, 0, new Date(), new Date())
  }
}