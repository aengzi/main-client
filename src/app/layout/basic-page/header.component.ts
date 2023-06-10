import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignInDialogComponent } from 'src/app/element/dialog/sign-in.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'basic-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class BasicPageHeaderComponent {
  public dialog: MatDialog;
  public authService: typeof AuthService;
  public router: Router;

  public constructor(router: Router, dialog: MatDialog) {
    this.authService = AuthService;
    this.dialog = dialog;
    this.router = router;
  }

  public signInDialogOpen() {
    this.dialog.open(SignInDialogComponent, {
      width: '320px',
    });
  }

  public signOut() {
    localStorage.removeItem('aengzi-auth-token');
    window.location.reload();
  }
}
