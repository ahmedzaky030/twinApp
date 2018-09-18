import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-ext-order',
  templateUrl: './ext-order.component.html',
  styleUrls: ['./ext-order.component.css']
})
export class ExtOrderComponent implements OnInit {

  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ) { }

  openModal(template : TemplateRef<any>){
    this.modalRef = this._modalService.show(template);
  }
  ngOnInit() {
  }

  

}
