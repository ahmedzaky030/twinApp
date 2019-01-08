import { Component, OnInit, TemplateRef, AfterViewInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderApi, OperationApi } from '../../api/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit , AfterViewInit {
  isDeleting: boolean;
  searchText: string;
  isNew: boolean;
  modalBody:string;
  selectedOrder:any;
  orders = [];
  orderForm: FormGroup;
  modalRef: BsModalRef;
  operations = [] ;
  routedId:string;
  routedType: string;
  statuses = ['In Progress', 'Not Started' , 'Finished' ];
  @ViewChild('template') newTemplate : TemplateRef<any>;
  constructor( private _modalService:BsModalService ,
     private orderApi: OrderApi,
     private operationApi: OperationApi,
     private _fb: FormBuilder,
     private route : ActivatedRoute ) { }

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
    this.route.params.subscribe(params => {
      console.log('inside activated route');
      this.routedId = params['id'];
      this.routedType = params['type']; 
      if(this.routedId && this.routedType){
        this.getOrdersList(this.routedId, this.routedType)
      }     
    })
    //this.getOrdersList();
    
  }

  getResult(){
    this.orderApi.getOrderList(this.searchText).subscribe(data => {
      this.orders = data;
    })
  }
  
  ngAfterViewInit(){
    
  }

  getOpertionList(){
    this.operationApi.getOperationList().subscribe(data => {
      this.operations = data;       
    })
  }

  openModal(template : TemplateRef<any>, orderObj: any){
    this.modalRef = this._modalService.show(template);
    if(!orderObj) {
      this.isNew = true;
      this.selectedOrder = Order.createNew(); }
     else { 
      this.isNew = false; 
      this.selectedOrder = orderObj; }
    this.orderForm.patchValue(this.selectedOrder);
  }

  openDeleteModal(template : TemplateRef<any>, orderObj: any){
    this.modalRef = this._modalService.show(template);
    this.modalBody = "Are you sure to remove order number :  " + orderObj.orderCode ; 
    this.selectedOrder = orderObj;
  }

  confirm(){
    this.isDeleting = true;
    this.orderApi.deleteOrder(this.selectedOrder._id).subscribe(data => {
      this.modalBody = this.selectedOrder.orderCode + ' has been deleted successfully';
      this.getOrdersList();
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
      this.modalRef.hide();
      this.getOrdersList();
    })
  } else {
    var newOrder = this.assignClient(this.orderForm.value);
    console.log(newOrder);
    this.orderApi.createOrder(newOrder).subscribe(data => {
      this.modalRef.hide();
      this.getOrdersList();
    })
  }
   
  }

  assignClient(val:any){
    var obj = Object.assign(Order.createNew() , val);
    console.log('copied object', obj);
    if(this.routedType == 'student'){
      obj.client.student = this.routedId;
      //***Tip***/ this for resolving casting error in server side
      delete obj.client.clinic 
    } else if(this.routedType == 'client'){
      obj.client.clinic = this.routedId;
      //Same top
      delete obj.client.student 
    }
    return obj;
  }

  getOrdersList(id?: string , type?:string){
    this.orderApi.getOrderList('',id, type).subscribe(data => {
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
    private technicianName: string,
    private client: Client
  ){}

  public static createNew(){
    return  new Order("","","","",0,new Date(),"", Client.createNew())
  }
}

class Client {
  constructor(
  private clinic: string,
  private student: string
  ){}

  public static createNew(){
    return  new Client("","")
  }

}
