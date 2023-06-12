import { Component, Input } from '@angular/core';
import { Model } from 'src/app/model';
import { Like } from 'src/app/model/like';
import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'like-button',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeButtonComponent {
  @Input()
  public related: Model<any, any>;
  public authService: typeof AuthService;

  public constructor() {
    this.authService = AuthService;
  }

  public addLike() {
    HttpService.api()
      .post<Like>('likes', {
        related_id: this.related.getAttrs().id,
        related_type: this.related.getModelType(),
      })
      .subscribe(({ result: like }) => {
        this.related.getRelations().like = like;
      });
  }

  public removeLike() {
    HttpService.api()
      .delete('likes/' + this.related.getRelations().like.getAttrs().id, {})
      .subscribe(() => {
        delete this.related.getRelations().like;
      });
  }
}
