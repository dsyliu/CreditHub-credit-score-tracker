import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

interface PaymentRecord {
  date: string;
  account: string;
  amount: number;
  status: 'on-time' | 'late' | 'missed';
}

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, RouterModule, HighchartsChartModule],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent {
  Highcharts: typeof Highcharts = Highcharts;
  paymentRecords: PaymentRecord[] = [
    { date: '2024-03-01', account: 'Credit Card', amount: 500, status: 'on-time' },
    { date: '2024-02-01', account: 'Credit Card', amount: 450, status: 'on-time' },
    { date: '2024-01-01', account: 'Credit Card', amount: 600, status: 'late' },
    { date: '2023-12-01', account: 'Credit Card', amount: 550, status: 'on-time' },
    { date: '2023-11-01', account: 'Credit Card', amount: 400, status: 'on-time' }
  ];

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      height: 300
    },
    title: {
      text: 'Payment History Trend'
    },
    xAxis: {
      categories: this.paymentRecords.map(record => record.date),
      labels: {
        rotation: -45
      }
    },
    yAxis: {
      title: {
        text: 'Payment Amount ($)'
      }
    },
    series: [{
      type: 'column',
      name: 'Payment Amount',
      data: this.paymentRecords.map(record => ({
        y: record.amount,
        color: record.status === 'on-time' ? '#4CAF50' : 
               record.status === 'late' ? '#FFC107' : '#F44336'
      }))
    }]
  };

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getStatusText(status: string): string {
    return status === 'on-time' ? 'On Time' :
           status === 'late' ? 'Late' : 'Missed';
  }
}
