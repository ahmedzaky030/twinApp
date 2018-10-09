import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderApi, OperationApi } from '../../api/services';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  isDeleting: boolean;
  searchText: string;
  isNew: boolean;
  modalBody:string;
  selectedOrder:any;
  orders = [];
  orderForm: FormGroup;
  modalRef: BsModalRef;
  operations: [];
  statuses = ['In Progress', 'Not Started' , 'Finished' ];
  constructor( private _modalService:BsModalService ,
     private orderApi: OrderApi,
     private operationApi: OperationApi,
     private _fb: FormBuilder ) { }

  ngOnInit() {
    this.getOpertionList();
    this.orderForm = this._fb.group({
      orderCode:['', Validators.required],
      teethOrder:['', Validators.required],
      orderType:['', Validators.required],
      status:'',
      cost:[0, Validators.required],
      deliveryDate:new Date(),
      technicianName:''
    })
    this.getOrdersList();
  }

  getResult(){
    this.orderApi.getOrderList(this.searchText).subscribe(data => {
      this.orders = data;
    })
  }

  getOpertionList(){
    this.operationApi.getOperationList().subscribe(data => {
      this.operations = data;
      console.log(this.operations);
       
    })
  }

  openModal(template : TemplateRef<any>, orderObj: any){
    this.modalRef = this._modalService.show(template);
    console.log(orderObj);
    if(!orderObj) {
      this.isNew = true;
      this.selectedOrder = Order.createNew(); }
     else { 
      this.isNew = false; 
      this.selectedOrder = orderObj; }
    
    console.log(this.selectedOrder);
    this.orderForm.patchValue(this.selectedOrder);
  }

  openDeleteModal(template : TemplateRef<any>, orderObj: any){
    this.modalRef = this._modalService.show(template);
    this.modalBody = "Are you sure to remove order number :  " + orderObj.orderCode ; 
    console.log(this.modalBody);
    this.selectedOrder = orderObj;
  }

  confirm(){
    this.isDeleting = true;
    this.orderApi.deleteOrder(this.selectedOrder._id).subscribe(data => {
      this.modalBody = this.selectedOrder.orderCode + ' has been deleted successfully';
      this.getOrdersList();
      console.error('document deleted', data);
      setTimeout(() => {
        this.modalRef.hide();
        this.isDeleting = false;        
      }, 2000)
    })
    
  }

  cancel(){
    this.selectedOrder = null;
    this.modalRef.hide();
  }

  save(){
    if(!this.isNew){
    this.orderApi.modifyOrder(this.selectedOrder._id,this.orderForm.value).subscribe(data => {
      console.log('Modified data is ',data);
      this.modalRef.hide();
  this.getOrdersList();
    })
  } else {
    this.orderApi.createOrder(this.orderForm.value).subscribe(data => {
      console.log('New Created data is ',data);
      this.modalRef.hide();
  this.getOrdersList();
    })
  }
   
  }

  getOrdersList(){
    this.orderApi.getOrderList().subscribe(data => {
      console.log('data from server', data);
      this.orders = data;
    })

  }

}

class Order {
  constructor(
    private orderCode:string,
    private teethOrder: string,
    private orderType: string, 
    private status: string,
    private cost: Number,
    private deliveryDate: Date,
    private technicianName: string
  ){}

  public static createNew(){
    return  new Order("","","","",0,new Date(),"")
  }
}
