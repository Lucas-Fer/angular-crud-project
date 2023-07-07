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
  public selectedLimit: number = 5;
  public searchInputValue: string = '';

  public sortColumn: string = '';
  public sortOrder: string = 'asc';

  public userDataInfo: UserData[] = [{
    id: 0,
    email: "",
    username: "",
  }];
  public filteredUserDataInfo: UserData[] = [{
    id: 0,
    email: "",
    username: "",
  }];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const users = getUsers()

    users ? this.userDataInfo = JSON.parse(users) : this.userDataInfo = usersMock;

    this.filteredUserDataInfo = this.userDataInfo;
  }

  openAddUserModal() {
    const modalRef = this.modalService.open(RegisterNewUserFormComponent);
    modalRef.componentInstance.currencyUsers = this.userDataInfo;

    modalRef.componentInstance.newUserValidated.subscribe((newUser: UserData) => {
      this.userDataInfo.push(newUser);

      saveUsers(this.userDataInfo)
    });
  }

  deleteUser(userId: number) {
    const userDataWithoutCurrency = this.userDataInfo.filter((user: UserData) => user.id !== userId)
    this.userDataInfo = userDataWithoutCurrency;

    saveUsers(userDataWithoutCurrency)
  }

  filterUserData() {
    if (!this.searchInputValue) {
      this.filteredUserDataInfo = this.userDataInfo;
    } else {
      this.filteredUserDataInfo = this.userDataInfo.filter((user: UserData) =>
        user.username.toLowerCase().includes(this.searchInputValue.toLowerCase())
      );
    }
  }

  sortUserData(column: keyof UserData) {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
      this.sortColumn = column;
    }

    this.filteredUserDataInfo.sort((a: UserData, b: UserData) => {
      const valueA = a[column] as string | number | Date;
      const valueB = b[column] as string | number | Date;

      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
