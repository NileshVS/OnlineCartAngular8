import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'subcat',
        component: SubcategoryComponent
    }
];