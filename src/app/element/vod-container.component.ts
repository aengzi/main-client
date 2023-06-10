import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VodClipDialogComponent } from 'src/app/element/dialog/vod-clip.component';
import { Vod } from 'src/app/model/vod';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'vod-container',
  templateUrl: './vod-container.component.html',
  styleUrls: ['./vod-container.component.scss'],
})
export class VodContainerComponent {
  public authService: typeof AuthService;
  @Input()
  public vod: Vod;
  @ContentChild('vodPlayerEl')
  public vodPlayerEl: TemplateRef<any>;
  @ContentChild('vodInfoTabEl')
  public vodInfoTabEl: TemplateRef<any>;
  public dialog: MatDialog;
  // public changeDetectRef : ChangeDetectorRef;

  public constructor(dialog: MatDialog, changeDetectRef: ChangeDetectorRef) {
    this.dialog = dialog;
    this.authService = AuthService;
    // this.changeDetectRef = changeDetectRef;
  }

  public init(vod: Vod) {
    this.vod = vod;
  }

  public openClipDialog() {
    this.dialog.open(VodClipDialogComponent, {
      data: {
        model: this.vod,
      },
      width: '320px',
    });
  }
}
