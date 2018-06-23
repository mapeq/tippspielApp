import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderbyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderby',
})
export class OrderbyPipe implements PipeTransform {

   transform(array: Array<string>, args?: any): Array<string> {

     let order:number = 1;

     if(args.order &&  args.order == 'desc'){
       order = -1;
     }

     if(array != undefined){

       return array.sort(function(a, b){
         if(a[args.col] < b[args.col]){
             return -1 * order;
         }
         else if( a[args.col] > b[args.col]){
             return 1 * order;
         }
         else{
             return 0;
         }
       });
     }
    return  array;


/*

*/
}
}
