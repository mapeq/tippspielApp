import { NgModule } from '@angular/core';
import { SortPipe } from './sort/sort';
import{OrderbyPipe}  from "./orderby/orderby";

@NgModule({
	declarations: [SortPipe, OrderbyPipe],
	imports: [],
	exports: [SortPipe, OrderbyPipe]
})
export class PipesModule {}
