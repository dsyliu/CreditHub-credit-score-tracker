import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { scoreHistoryData } from '../../config/score-ingredient.config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, RouterModule, HighchartsChartModule, FormsModule],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent {
  Highcharts: typeof Highcharts = Highcharts;
  scoreHistoryData = [...scoreHistoryData].sort((a, b) => a.date.getTime() - b.date.getTime());
  showWarningModal = false;
  
  // Date range for filtering
  startDate: string = this.scoreHistoryData[0].date.toISOString().split('T')[0];
  endDate: string = this.scoreHistoryData[this.scoreHistoryData.length - 1].date.toISOString().split('T')[0];
  
  // Get filtered data based on date range
  get filteredData() {
    return this.scoreHistoryData.filter(data => {
      const date = data.date.toISOString().split('T')[0];
      return date >= this.startDate && date <= this.endDate;
    });
  }

  // Update chart when date range changes
  updateChart() {
    this.negativeStackChartOptions = {
      ...this.negativeStackChartOptions,
      xAxis: {
        categories: this.filteredData.map(data => 
          data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        ),
        labels: {
          rotation: -45
        }
      },
      series: [{
        type: 'bar',
        name: 'Late Payments',
        data: this.filteredData.map(data => 
          -parseInt(data.paymentHistoryScoreIngredient.breakdown[0].value)
        ),
        color: '#ff6b6b'
      }, {
        type: 'bar',
        name: 'Collections',
        data: this.filteredData.map(data => 
          -parseInt(data.paymentHistoryScoreIngredient.breakdown[3].value)
        ),
        color: '#ff8787'
      }, {
        type: 'bar',
        name: 'Accounts Paid as Agreed',
        data: this.filteredData.map(data => 
          parseInt(data.paymentHistoryScoreIngredient.breakdown[5].value)
        ),
        color: '#51cf66'
      }]
    };
  }

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      height: 500
    },
    title: {
      text: 'Payment History Breakdown'
    },
    xAxis: {
      categories: this.scoreHistoryData.map(data => 
        data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
      labels: {
        rotation: -45
      }
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false
        },
        enableMouseTracking: true
      }
    },
    series: this.scoreHistoryData[0].paymentHistoryScoreIngredient.breakdown.map((item, index) => ({
      type: 'line',
      name: item.title,
      data: this.scoreHistoryData.map(data => {
        const value = data.paymentHistoryScoreIngredient.breakdown[index].value;
        // Convert percentage strings to numbers
        if (value.includes('%')) {
          return parseFloat(value.replace('%', ''));
        }
        // Convert dollar amounts to numbers
        if (value.includes('$')) {
          return parseFloat(value.replace('$', '').replace(',', ''));
        }
        // Convert other numeric strings
        return parseFloat(value);
      }),
      marker: {
        radius: 4
      }
    })),
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 1,
      itemStyle: {
        fontSize: '12px',
        cursor: 'pointer'
      },
      itemHoverStyle: {
        color: '#000'
      }
    }
  };

  negativeStackChartOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
      height: 500
    },
    title: {
      text: 'Payment History Comparison'
    },
    xAxis: {
      title: {
        text: 'Payment History Categories'
      },
      categories: this.filteredData[this.filteredData.length - 1].paymentHistoryScoreIngredient.breakdown.map(item => item.title),
      labels: {
        rotation: -45
      }
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    plotOptions: {
      bar: {
        borderRadius: '50%'
      }
    },
    tooltip: {
      formatter: function(this: any) {
        return `<b>${this.series.name}</b><br/>` +
          `Value: ${Math.abs(this.y as number)}`;
      }
    },
    series: [{
      type: 'bar',
      name: 'Current Values',
      data: [
        { y: -3, color: '#ff6b6b' },  // Late Payments
        { y: -2, color: '#ff8787' },  // Collections
        { y: -1, color: '#ffa8a8' },  // Bankruptcies
        { y: -1, color: '#ffc9c9' },  // Foreclosures
        { y: 5, color: '#51cf66' },   // Accounts always paid as agreed
        { y: 4, color: '#82c91e' }    // Credit card utilization
      ]
    }]
  };
}
