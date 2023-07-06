import { Component, OnInit } from '@angular/core';
import { UserData } from './interfaces/userData';
import usersDataMock from '../../../mock/user.mock'
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

  constructor() { }

  ngOnInit() {
    this.userData = usersDataMock;
  }
}
