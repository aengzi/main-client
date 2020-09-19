import { Component, ContentChild, TemplateRef, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vod-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class VodGameInfoComponent implements AfterContentInit {

  @ContentChild('gameTimelineTabEl')
  public gameTimelineTabEl: TemplateRef<any>;
  @ContentChild('gameResultTabEl')
  public gameResultTabEl: TemplateRef<any>;
  public tabIndex : number = 0;

  public ngAfterContentInit() {

  }
}
