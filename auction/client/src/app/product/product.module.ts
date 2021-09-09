import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail';
import { ProductSuggestionComponent } from './product-suggestion';
import {StarsComponent} from './stars';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {path: '', component: ProductComponent}
    ]),
    MatButtonModule,
    MatGridListModule,
    FormsModule
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductSuggestionComponent,
    StarsComponent
  ]
})
export class ProductModule {}
