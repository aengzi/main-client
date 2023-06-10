import {
  Compiler,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { EditUserDataDialogComponent } from 'src/app/element/dialog/edit-user-data.component';

@Component({
  selector: 'user-data-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class UserDataContainerComponent {
  @Input('data')
  public shared: Object = {};
  @Input()
  public label: string;
  @ViewChild('showContent', { read: ViewContainerRef })
  private showContent: ViewContainerRef;
  public showComponent: Component;
  private compiler: Compiler;
  private dialog: MatDialog;

  public constructor(compiler: Compiler, dialog: MatDialog) {
    this.compiler = compiler;
    this.dialog = dialog;
  }

  public ngAfterViewInit() {
    const studlyLabel = _.upperFirst(_.camelCase(this.label));
    const showMdlName = studlyLabel + 'ShowUserDataModule';
    const showCmpName = studlyLabel + 'ShowUserDataComponent';

    import('src/app/element/user-data/show/' + this.label + '.module.ts')
      .then((showModule) => {
        return this.compiler.compileModuleAndAllComponentsAsync(
          showModule[showMdlName]
        );
      })
      .then((showModule) => {
        this.showContent.clear();

        const showCmpFactory = _.find((<any>showModule).componentFactories, [
          'componentType.name',
          showCmpName,
        ]);
        const showCmp = <any>(
          this.showContent.createComponent(showCmpFactory).instance
        );

        showCmp.shared = this.shared;

        this.showComponent = showCmp;
      });
  }

  public openEditDialog() {
    const dialogRef = this.dialog.open(EditUserDataDialogComponent, {
      data: this.shared,
    });
    (<any>dialogRef.componentInstance).label = this.label;
  }
}
