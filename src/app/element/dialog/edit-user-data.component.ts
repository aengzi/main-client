import * as _ from 'lodash';
import { Compiler, Component, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, concat, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDataEditComponent } from 'src/app/element/user-data/edit.component';

@Component({
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.scss']
})
export class EditUserDataDialogComponent {

  private compiler: Compiler;
  @ViewChild('editContent', { read: ViewContainerRef })
  private editContent: ViewContainerRef;
  public editComponent: UserDataEditComponent;
  public shared: any;
  public label: string;
  public ref: MatDialogRef<EditUserDataDialogComponent>;

  public constructor(compiler: Compiler, @Inject(MAT_DIALOG_DATA) data: any, dialogRef: MatDialogRef<EditUserDataDialogComponent>) {

    this.compiler = compiler;
    this.shared = data;
    this.ref = dialogRef;
  }

  public ngAfterViewInit() {
    const studlyLabel = _.upperFirst(_.camelCase(this.label));
    const editMdlName = studlyLabel + 'EditUserDataModule';
    const editCmpName = studlyLabel + 'EditUserDataComponent';

    import(
      'src/app/element/user-data/edit/' + this.label + '.module'
    ).then((editModule) => {

      return this.compiler.compileModuleAndAllComponentsAsync(editModule[editMdlName]);
    }).then((editModule) => {

      this.editContent.clear();
      const editCmpFactory = _.find((<any>editModule).componentFactories, ['componentType.name', editCmpName]);
      const editCmp = <any>this.editContent.createComponent(editCmpFactory).instance;
      editCmp.shared = this.shared;

      this.editComponent = editCmp;
    })
  }
}
