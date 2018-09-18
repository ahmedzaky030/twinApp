import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ) { }

  openModal(template : TemplateRef<any>){
    this.modalRef = this._modalService.show(template);
  }

  ngOnInit() {
  }

}
