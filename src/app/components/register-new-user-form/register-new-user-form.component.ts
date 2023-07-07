import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserData } from 'src/app/pages/home/interfaces/userData';
import { formatCpf } from 'src/app/utils/formatter';

@Component({
  selector: 'app-register-new-user-form',
  templateUrl: './register-new-user-form.component.html',
})
export class RegisterNewUserFormComponent {
  public newUser: UserData = {
    id: 0,
    email: '',
    username: '',
    cpf: "",
  };

  public isEmailDuplicated: boolean = false;
  public disabledSubmit: boolean = true;
  public emailIsValid: boolean = true;

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
    this.validateForm();

    const maxId = Math.max(...this.currencyUsers.map(user => user.id));

    this.newUser.createdAt = new Date();
    this.newUser.id = maxId + 1;

    if (!this.disabledSubmit) {
      this.newUserValidated.emit(this.newUser);

      this.activeModal.close();
    }
  }

  validateForm() {
    const isDuplicate = this.currencyUsers.find(user => user.email === this.newUser.email);
    if (isDuplicate) {
      this.isEmailDuplicated = true;
    } else {
      this.isEmailDuplicated = false;
    }

    this.emailIsValid = this.newUser.email.includes("@") && this.newUser.email.includes(".com");

    if (!this.isEmailDuplicated && this.newUser.email.length && this.newUser.username.length && this.emailIsValid) {
      this.disabledSubmit = false;
    } else {
      this.disabledSubmit = true;
    }
  }

  closeModal() {
    this.activeModal.dismiss('Closed');
  }

  formatter(cpf: string | number | undefined): string {
    if (typeof cpf === 'string') {
      return formatCpf(cpf);
    }
    return '';
  }
}
