import * as _ from 'lodash';
import { Component, ContentChild, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Params } from '@angular/router';
import { Model } from 'src/app/model';
import { HttpService } from 'src/app/service/http.service';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  @ContentChild('itemListEl')
  public itemListEl: TemplateRef<any>;
  public currentPage: number;
  public items: Model<any,any>[];
  public lastPage: number;
  @Input('apiParams')
  public apiParams: Params = {};
  @Input('apiUrl')
  public apiUrl: string;
  public pageSize = 7;
  public prevPages = [];
  public nextPages = [];
  public totalCount: number;
  public isLoading: boolean = false;
  public subscribed: Subscription;

  public ngOnInit() {
    this.getListWith();
  }

  ngOnChanges(changes: SimpleChanges) {

    let changed = false;

    Object.keys(changes).forEach((key) => {
      if (changes[key].previousValue && !_.isEqual(changes[key].previousValue, changes[key].currentValue)) {
        changed = true;
      }
    });

    if ( changed ) {
      this.getListWith();
    }
  }

  public getListWith(baseParams = {}) {
    this.isLoading = true;

    if ( this.subscribed ) {
      this.subscribed.unsubscribe();
    }

    this.subscribed = HttpService.api().get(this.apiUrl, {
      params: _.merge({}, baseParams, this.apiParams)
    }).subscribe((res: any) => {
      this.isLoading   = false;
      this.items       = res.data;
      this.currentPage = res.current_page;
      this.lastPage    = res.last_page;
      this.totalCount  = res.total;

      if ( this.pageSize % 2 == 0 ) {
        this.pageSize = this.pageSize + 1;
      }

      let limit = (this.pageSize - 1) / 2;
      let i = 1;
      let j = 1;
      let k = 0;
      let l = 0;

      this.prevPages = [];
      this.nextPages = [];

      for (; this.currentPage - i >= 1 && i <= limit; i++ ) {
        this.prevPages.unshift(this.currentPage - i);
      }

      for (; this.currentPage + j <= this.lastPage && j <= limit; j++ ) {
        this.nextPages.push(this.currentPage + j);
      }

      for (; this.currentPage-i-k >= 1 && k < limit - this.nextPages.length; k++ ) {
        this.prevPages.unshift(this.currentPage-i-k);
      }

      for (; this.currentPage+j+l <= this.lastPage && l < limit - this.prevPages.length; l++ ) {
        this.nextPages.push(this.currentPage+j+l);
      }
    });
  }

}
