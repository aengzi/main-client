import {
  AfterContentInit,
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'vod-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class VodGameInfoComponent implements AfterContentInit {
  @ContentChild('gameTimelineTabEl')
  public gameTimelineTabEl: TemplateRef<any>;
  @ContentChild('gameResultTabEl')
  public gameResultTabEl: TemplateRef<any>;
  public tabIndex = 0;

  public ngAfterContentInit() {}
}
