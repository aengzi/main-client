import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialogComponent } from 'src/app/element/dialog/sign-in.component';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service'

@Component({
  selector: 'basic-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class BasicPageHeaderComponent {

  public dialog      : MatDialog;
  public authService : AuthService;

  public constructor(route: ActivatedRoute, dialog: MatDialog, authService: AuthService) {

    this.dialog      = dialog;
    this.authService = authService;
  }

  public signInDialogOpen() {
    this.dialog.open(SignInDialogComponent, {
      width: '320px'
    });
  }

  public signOut() {
    localStorage.removeItem('aengzi-auth-token');
    window.location.reload();
  }

}
