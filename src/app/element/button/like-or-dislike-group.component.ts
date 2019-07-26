import { AfterViewInit, ContentChild, Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Model } from 'src/app/model';
import { Dislike } from 'src/app/model/dislike';
import { Like } from 'src/app/model/like';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'like-or-dislike-button-group',
  templateUrl: './like-or-dislike-group.component.html',
  styleUrls: ['./like-or-dislike-group.component.scss']
})
export class LikeOrDislikeButtonGroupComponent implements AfterViewInit {

  @Input('related')
  public related      : Model<any,any>;
  public vc           : ViewContainerRef;
  public likeBtnEl    : HTMLElement
  public dislikeBtnEl : HTMLElement
  public authService  : AuthService;

  public constructor(vc: ViewContainerRef, authService: AuthService) {
    this.vc          = vc;
    this.authService = authService;
  }

  public setLikeBtnClass() {

    if ( this.related.getRelations().like ) {
      this.likeBtnEl.classList.add('mat-accent');
    } else {
      this.likeBtnEl.classList.remove('mat-accent');
    }
  }

  public setDislikeBtnClass() {

    if ( this.related.getRelations().dislike ) {
      this.dislikeBtnEl.classList.add('mat-accent');
    } else {
      this.dislikeBtnEl.classList.remove('mat-accent');
    }
  }

  public setLikeBtnDisabled() {

    if ( this.related.getRelations().dislike ) {
      this.likeBtnEl.setAttribute('disabled', '');
    } else {
      this.likeBtnEl.removeAttribute('disabled');
    }
  }

  public setDislikeBtnDisabled() {

    if ( this.related.getRelations().like ) {
      this.dislikeBtnEl.setAttribute('disabled', '');
    } else {
      this.dislikeBtnEl.removeAttribute('disabled');
    }
  }

  public ngAfterViewInit() {
    const el = this.vc.element.nativeElement;
    this.likeBtnEl = el.querySelector('[like-button]') ? el.querySelector('[like-button]') : document.createElement('button');
    this.dislikeBtnEl = el.querySelector('[dislike-button]') ? el.querySelector('[dislike-button]') : document.createElement('button');
    this.likeBtnEl.addEventListener('click', () => {
      if ( this.related.getRelations().like ) {
        this.authService.requireSignIn() || this.removeLike();
      } else {
        this.authService.requireSignIn() || this.addLike();
      }
    });
    this.dislikeBtnEl.addEventListener('click', () => {
      if ( this.related.getRelations().dislike ) {
        this.authService.requireSignIn() || this.removeDislike();
      } else {
        this.authService.requireSignIn() || this.addDislike();
      }
    });
    this.resetAttributes();
  }

  public resetAttributes() {
    this.setDislikeBtnClass();
    this.setDislikeBtnDisabled();
    this.setLikeBtnClass();
    this.setLikeBtnDisabled()
  }

  public addDislike() {
    this.likeBtnEl.setAttribute('disabled', '');
    this.dislikeBtnEl.setAttribute('disabled', '');
    HttpService.api().post<Dislike>('dislikes', {
      related_id: this.related.getAttrs().id,
      related_type: this.related.getModelType()
    }).subscribe((dislike: Dislike) => {
      this.related.getRelations().dislike = dislike;
      this.related.getAttrs().dislike_count += 1;
      this.resetAttributes();
    });
  }

  public addLike() {
    this.likeBtnEl.setAttribute('disabled', '');
    this.dislikeBtnEl.setAttribute('disabled', '');
    HttpService.api().post<Like>('likes', {
      related_id: this.related.getAttrs().id,
      related_type: this.related.getModelType()
    }).subscribe((like: Like) => {
      this.related.getRelations().like = like;
      this.related.getAttrs().like_count += 1;
      this.resetAttributes();
    });
  }

  public removeDislike() {
    this.dislikeBtnEl.setAttribute('disabled', '');
    HttpService.api().delete('dislikes/'+this.related.getRelations().dislike.getAttrs().id, {
    }).subscribe(() => {
      delete this.related.getRelations().dislike;
      this.related.getAttrs().dislike_count -= 1;
      this.resetAttributes();
    });
  }

  public removeLike() {
    this.likeBtnEl.setAttribute('disabled', '');
    HttpService.api().delete('likes/'+this.related.getRelations().like.getAttrs().id, {
    }).subscribe(() => {
      delete this.related.getRelations().like;
      this.related.getAttrs().like_count -= 1;
      this.resetAttributes();
    });
  }
}
