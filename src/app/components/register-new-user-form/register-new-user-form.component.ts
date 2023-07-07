import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserData } from 'src/app/pages/home/interfaces/userData';

@Component({
  selector: 'app-register-new-user-form',
  templateUrl: './register-new-user-form.component.html',
})
export class RegisterNewUserFormComponent {
  public newUser: UserData = {
    id: 0,
    email: '',
    username: '',
    cpf: 0
  };

  @Input() currencyUsers: UserData[] = [this.newUser];
  @Input() userDataPreview: UserData = this.newUser;

  @Input() onlyPreview: boolean = false;
  @Input() editUser: boolean = false;

  @Output() newUserValidated: EventEmitter<UserData> = new EventEmitter<UserData>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.validateFormAction()
  }

  validateFormAction() {
    if (this.onlyPreview) {
      this.newUser = this.userDataPreview;
    }
    if (this.editUser) {
      this.newUser = this.userDataPreview;
    }
  }

  submitForm() {
    const maxId = Math.max(...this.currencyUsers.map(user => user.id));

    this.newUser.createdAt = new Date();
    this.newUser.id = maxId + 1;

    this.newUserValidated.emit(this.newUser);

    this.activeModal.close();
  }

  closeModal() {
    this.activeModal.dismiss('Closed');
  }
}
