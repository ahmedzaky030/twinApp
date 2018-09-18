import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  modalRef: BsModalRef;
  constructor( private _modalService:BsModalService ) { }

  openModal(template : TemplateRef<any>){
    this.modalRef = this._modalService.show(template);
  }

  ngOnInit() {
  }

}
