import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

interface DebtAccount {
  name: string;
  balance: number;
  limit: number;
  utilization: number;
  type: 'credit-card' | 'loan' | 'mortgage';
}

@Component({
  selector: 'app-debt-amount',
  standalone: true,
  imports: [CommonModule, RouterModule, HighchartsChartModule],
  templateUrl: './debt-amount.component.html',
  styleUrls: ['./debt-amount.component.scss']
})
export class DebtAmountComponent {
  Highcharts: typeof Highcharts = Highcharts;
  debtAccounts: DebtAccount[] = [
    { name: 'Chase Sapphire', balance: 2500, limit: 10000, utilization: 25, type: 'credit-card' },
    { name: 'Bank of America', balance: 1500, limit: 5000, utilization: 30, type: 'credit-card' },
    { name: 'Auto Loan', balance: 15000, limit: 20000, utilization: 75, type: 'loan' },
    { name: 'Mortgage', balance: 250000, limit: 300000, utilization: 83, type: 'mortgage' }
  ];

  totalUtilization = this.calculateTotalUtilization();

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      height: 300
    },
    title: {
      text: 'Credit Utilization by Account'
    },
    xAxis: {
      categories: this.debtAccounts.map(account => account.name),
      labels: {
        rotation: -45
      }
    },
    yAxis: {
      title: {
        text: 'Utilization (%)'
      },
      max: 100
    },
    series: [{
      type: 'column',
      name: 'Utilization',
      data: this.debtAccounts.map(account => ({
        y: account.utilization,
        color: this.getUtilizationColor(account.utilization)
      }))
    }],
    credits: {
      enabled: false
    }
  };

  private calculateTotalUtilization(): number {
    const totalBalance = this.debtAccounts.reduce((sum, account) => sum + account.balance, 0);
    const totalLimit = this.debtAccounts.reduce((sum, account) => sum + account.limit, 0);
    return Math.round((totalBalance / totalLimit) * 100);
  }

  private getUtilizationColor(utilization: number): string {
    if (utilization <= 30) return '#4CAF50';
    if (utilization <= 70) return '#FFC107';
    return '#F44336';
  }

  getUtilizationClass(utilization: number): string {
    if (utilization <= 30) return 'excellent';
    if (utilization <= 70) return 'good';
    return 'poor';
  }

  getUtilizationText(utilization: number): string {
    if (utilization <= 30) return 'Excellent';
    if (utilization <= 70) return 'Good';
    return 'Poor';
  }
}
