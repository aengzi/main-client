import { Component } from '@angular/core';
import { UserDataShowComponent } from 'src/app/element/user-data/show.component';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailShowUserDataComponent extends UserDataShowComponent {

  public authService: typeof AuthService;

  public constructor() {
    super();
    this.authService = AuthService;
  }
}
