import { Component, OnInit } from '@angular/core';
import { UserData } from './interfaces/userData';
import { RegisterNewUserFormComponent } from 'src/app/components/register-new-user-form/register-new-user-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { getUsers, saveUsers, usersMock } from 'src/app/utils/user-controller';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userDataMock: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const users = getUsers()

    users ? this.userDataMock = JSON.parse(users) : this.userDataMock = usersMock;
  }

  openAddUserModal() {
    const modalRef = this.modalService.open(RegisterNewUserFormComponent);
    modalRef.componentInstance.currencyUsers = this.userDataMock;

    modalRef.componentInstance.newUserValidated.subscribe((newUser: UserData) => {
      this.userDataMock.push(newUser);

      saveUsers(this.userDataMock)
    });
  }
}
