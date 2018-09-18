import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ) { }

  openModal(template : TemplateRef<any>){
    this.modalRef = this._modalService.show(template);
  }

  ngOnInit() {
  }

}
