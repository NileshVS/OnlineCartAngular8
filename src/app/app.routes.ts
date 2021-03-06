import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from '../app/authGuard/guard';
import {RepeatLoginAuthGuard} from '../app/authGuard/repeatLoginGuard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CartComponent } from './cart/cart.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'product',
        component: ProductComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'subcat',
        component: SubcategoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [RepeatLoginAuthGuard]
    },
    {
        path: 'reset/:id',
        component: ForgotPasswordComponent
    },
    {
        path: "cart",
        component: CartComponent,
        canActivate: [AuthGuard]
    }
];