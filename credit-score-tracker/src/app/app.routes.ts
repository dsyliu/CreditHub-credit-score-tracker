import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { DebtAmountComponent } from './components/debt-amount/debt-amount.component';
import { CreditHistoryComponent } from './components/credit-history/credit-history.component';
import { NewCreditComponent } from './components/new-credit/new-credit.component';
import { CreditMixComponent } from './components/credit-mix/credit-mix.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: 'debt-amount', component: DebtAmountComponent },
  { path: 'credit-history', component: CreditHistoryComponent },
  { path: 'new-credit', component: NewCreditComponent },
  { path: 'credit-mix', component: CreditMixComponent }
];
