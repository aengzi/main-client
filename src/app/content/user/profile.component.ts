import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AftvReview } from 'src/app/model/aftv-review';
import { Clip } from 'src/app/model/clip';
import { LolGame } from 'src/app/model/lol-game';
import { PubgGame } from 'src/app/model/pubg-game';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { StorageService } from 'src/app/service/storage.service';
import { CropImageDialogComponent } from 'src/app/element/dialog/crop-image.component';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class UserProfileComponent {

  public isOwner  : boolean;
  public isEdit   : boolean = false;
  public nickCtrl : FormControl;
  public user     : User;
  public dialog   : MatDialog;
  public router   : Router;

  public constructor(route: ActivatedRoute, router: Router, dialog: MatDialog) {
    console.log(route.snapshot.data);
    this.router   = router;
    this.user     = route.snapshot.data.user;
    this.dialog   = dialog;
    this.isOwner  = AuthService.getUser() && AuthService.getUser().getAttrs().id == this.user.getAttrs().id;
    this.nickCtrl = new FormControl(this.user.getAttrs().nick, {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12),
        (control: FormControl) => {
          return control.value.indexOf(' ') !== -1 ? {nospace: true} : null;
        },
        (control: FormControl) => {
          return control.value == this.user.getAttrs().nick ? {same: true} : null;
        }
      ],
      asyncValidators: [
        (control: FormControl) => {
          return HttpService.api().get('users', {
            params: {
              nick: control.value
            }
          }).pipe(
            map((users: User[]) => {
              return users.length != 0 ? {exist: true} : null;
            })
          );
        }
      ]
    });
  }

  public cropImageDialogOpen() {
    this.dialog.open(CropImageDialogComponent, {
      width: '320px'
    });
  }

  public navigate(item) {

    const progressBarClsListEl = document.querySelector('#progress-bar').classList;

    progressBarClsListEl.add('visible');

    if ( item.getAttrs().type == 'lol' ) {
      HttpService.api().get('/lol-games', {
        params: {
          vod_id: item.getAttrs().id
        }
      }).subscribe((lolGames: LolGame[]) => {
        this.router.navigate(['/lol-games/'+lolGames[0].getAttrs().id]);
        progressBarClsListEl.remove('visible');
      });

    } else if ( item.getAttrs().type == 'pubg' ) {

      HttpService.api().get('/pubg-games', {
        params: {
          vod_id: item.getAttrs().id
        }
      }).subscribe((pubgGames: PubgGame[]) => {
        this.router.navigate(['/pubg-games/'+pubgGames[0].getAttrs().id]);
        progressBarClsListEl.remove('visible');
      });

    } else if ( item.getAttrs().type == 'clip' ) {

      HttpService.api().get('/clips', {
        params: {
          vod_id: item.getAttrs().id
        }
      }).subscribe((clips: Clip[]) => {
        this.router.navigate(['/user/clips/'+clips[0].getAttrs().id]);
        progressBarClsListEl.remove('visible');
      });

    } else if ( item.getAttrs().type == 'review' ) {

      HttpService.api().get('/aftv-reviews/', {
        params: {
          vod_id: item.getAttrs().id
        }
      }).subscribe((aftvReviews: AftvReview[]) => {
        this.router.navigate(['/aftv-reviews/'+aftvReviews[0].getAttrs().id]);
        progressBarClsListEl.remove('visible');
      });
    }
  }

  public changeNick() {
    HttpService.api().patch<User>('users/'+this.user.getAttrs().id, {
      nick: this.nickCtrl.value
    }).subscribe((user: User) => {
      this.user.getAttrs().nick = user.getAttrs().nick;
      StorageService.get('snack-bar').open(
        '닉네임이 변경되었습니다.',
        'close', {
        duration: 5000,
        verticalPosition: 'bottom'
      });
    });
  }
}
