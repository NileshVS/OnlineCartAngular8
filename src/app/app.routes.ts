import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CareerComponent } from './career/career.component';
import { ProductComponent } from './product/product.component';

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
        component: ProductComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
        children: [{
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'career/:id',
                component: CareerComponent
            }]
}];