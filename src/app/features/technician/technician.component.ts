import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ) { }

  openModal(template : TemplateRef<any>){
    this.modalRef = this._modalService.show(template);
  }

  ngOnInit() {
  }

}
