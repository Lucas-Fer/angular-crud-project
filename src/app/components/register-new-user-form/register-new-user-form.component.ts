import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-new-user-form',
  templateUrl: './register-new-user-form.component.html',
})
export class RegisterNewUserFormComponent implements OnInit {


  constructor(public modal: NgbActiveModal) { }


  ngOnInit() {
  }

}
