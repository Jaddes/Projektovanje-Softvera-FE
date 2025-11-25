import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BlogListComponent,
    BlogDetailsComponent
  ]
})
export class BlogModule { }
