import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsPageRoutingModule } from './products-page-routing.module';
import { ProductsPageComponent } from './products-page.component';

import {InfiniteScrollModule} from 'ngx-infinite-scroll'

@NgModule({
  declarations: [ProductsPageComponent],
  imports: [
    CommonModule,
    ProductsPageRoutingModule,
    InfiniteScrollModule
  ]
})
export class ProductsPageModule { }
