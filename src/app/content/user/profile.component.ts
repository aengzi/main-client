import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CropImageDialogComponent } from 'src/app/element/dialog/crop-image.component';
import { Model } from 'src/app/model';
import { User } from 'src/app/model/user';
import { Vod } from 'src/app/model/vod';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class UserProfileComponent {
  public isOwner: boolean;
  public isEdit = false;
  public nickCtrl: FormControl;
  public user: User;
  public dialog: MatDialog;
  public router: Router;

  public constructor(route: ActivatedRoute, router: Router, dialog: MatDialog) {
    this.router = router;
    this.user = route.snapshot.data.user;
    this.dialog = dialog;
    this.isOwner =
      AuthService.getUser() &&
      AuthService.getUser().getAttrs().id == this.user.getAttrs().id;
    this.nickCtrl = new FormControl(this.user.getAttrs().nick, {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12),
        (control) => {
          return control.value.indexOf(' ') !== -1 ? { nospace: true } : null;
        },
        (control) => {
          return control.value == this.user.getAttrs().nick
            ? { same: true }
            : null;
        },
      ],
      asyncValidators: [
        (control) => {
          return HttpService.api()
            .get<User[]>('users', {
              params: {
                nick: control.value,
              },
            })
            .pipe(
              map((users: User[]) => {
                return users.length != 0 ? { exist: true } : null;
              })
            );
        },
      ],
    });
  }

  public cropImageDialogOpen() {
    this.dialog.open(CropImageDialogComponent, {
      width: '320px',
    });
  }

  public navigate(item: any) {
    HttpService.api()
      .get<Vod>('vods/' + item.getAttrs().id, {
        params: {
          expands: 'related',
        },
      })
      .subscribe((vod: Vod) => {
        vod.getRelations().related.navigate();
      });
  }

  public changeNick() {
    HttpService.api()
      .patch<User>('users/' + this.user.getAttrs().id, {
        nick: this.nickCtrl.value,
      })
      .subscribe((user: User) => {
        this.user.getAttrs().nick = user.getAttrs().nick;
        this.nickCtrl.markAsUntouched();
        StorageService.get('snack-bar').open(
          '닉네임이 변경되었습니다.',
          'close',
          {
            duration: 5000,
            verticalPosition: 'bottom',
          }
        );
      });
  }

  public deleteItem(item: Model<any, any>) {
    HttpService.api()
      .delete(
        (item.constructor as typeof Model).apiBaseUrl + '/' + item.getAttrs().id
      )
      .subscribe(() => {
        item.isExist = false;
      });
  }
}
