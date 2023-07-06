import { Component, OnInit } from '@angular/core';
import { UserData } from './interfaces/userData';
import usersDataMock from '../../../mock/user.mock'
import { RegisterNewUserFormComponent } from 'src/app/components/register-new-user-form/register-new-user-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userData: UserData[] = [
    {
      id: 0,
      email: "",
      username: "",
    },
  ]

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.userData = usersDataMock;
  }

  openAddUserModal() {
    const modalRef = this.modalService.open(RegisterNewUserFormComponent);
    modalRef.componentInstance.name = 'Add User Form';
  }
}
