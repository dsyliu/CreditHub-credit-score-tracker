import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { PreferencesPopupComponent } from '../preferences-popup/preferences-popup.component';
import { creditFocusConfig, CreditFocus, PreferenceMapping } from '../../config/credit-focus.config';
import { ScoreIngredient, ScoreIngredientBreakdown } from '../../config/score-ingredient.config';
import { scoreHistoryData } from '../../config/score-ingredient.config';

interface SavedPreference {
  id: string;
  label: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HighchartsChartModule,
    PreferencesPopupComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  currentScore: number = scoreHistoryData[scoreHistoryData.length - 1].score;
  Highcharts: typeof Highcharts = Highcharts;
  creditScoreChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      height: 400,
      backgroundColor: '#ffffff'
    },
    title: {
      text: 'Credit Score'
    },
    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '14px'
        },
        formatter: function() {
          return Highcharts.dateFormat('%b %d, %Y', Number(this.value));
        }
      }
    },
    yAxis: {
      title: {
        text: 'Credit Score',
        style: {
          color: '#2c5282'
        }
      },
      min: 600,
      max: 800,
      labels: {
        style: {
          color: '#2c5282',
          fontSize: '14px'
        }
      }
    },
    series: [{
      type: 'line',
      name: 'Credit Score',
      data: scoreHistoryData.map(data => ({
        x: data.date.getTime(),
        y: data.score
      })),
      color: '#2c5282',
      lineWidth: 3,
      marker: {
        radius: 6
      }
    }, {
      type: 'line',
      name: 'Predicted Score',
      data: [
        { x: new Date('2025-04-01').getTime(), y: scoreHistoryData[scoreHistoryData.length - 1].score },
        { x: new Date('2025-10-01').getTime(), y: 800 }
      ],
      color: '#2c5282',
      lineWidth: 3,
      dashStyle: 'ShortDash',
      marker: {
        radius: 6
      },
      dataLabels: {
        enabled: true,
        format: '{y}',
        style: {
          fontSize: '12px'
        }
      }
    }],
    plotOptions: {
      series: {
        dashStyle: 'Solid',
        states: {
          hover: {
            lineWidthPlus: 0
          }
        },
        point: {
          events: {
            click: (event: any) => {
              this.selectedDate = Highcharts.dateFormat('%b %d, %Y', event.point.x);
              this.cdr.detectChanges();
            }
          }
        }
      }
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      formatter: function(this: any) {
        if (!this.series || !this.series.chart) return '';
        
        const points = this.series.chart.hoverPoints;
        if (!points || points.length === 0) return '';
        
        let tooltip = `<b>${Highcharts.dateFormat('%b %d, %Y', this.x)}</b><br/>`;
        
        // Add all series values
        this.series.chart.series.forEach((series: Highcharts.Series) => {
          const point = series.points[this.index];
          if (point && point.y !== undefined) {
            tooltip += `<span style="color:${series.color}">●</span> ${series.name}: <b>${point.y}</b><br/>`;
          }
        });
        
        return tooltip;
      }
    }
  };
  scoreIngredients: ScoreIngredient[] = [
    scoreHistoryData[scoreHistoryData.length - 1].paymentHistoryScoreIngredient,
    scoreHistoryData[scoreHistoryData.length - 1].amountOfDebtScoreIngredient,
    scoreHistoryData[scoreHistoryData.length - 1].creditHistoryScoreIngredient,
    scoreHistoryData[scoreHistoryData.length - 1].newCreditAmountScoreIngredient,
    scoreHistoryData[scoreHistoryData.length - 1].creditMixScoreIngredient
  ];
  showPreferencesPopup = false;
  savedPreferences: SavedPreference[] = [];
  preferenceLabels: { [key: string]: string } = {
    'new-to-credit': "I'm new to credit",
    'big-purchase': "I have a big purchase coming up",
    'retirement': "I want to set up retirement plan",
    'pay-debts': "I want to pay off debts",
    'learn-finance': "I want to learn more about my financial situation"
  };
  creditFocuses: CreditFocus[] = [];
  showWarningModal = false;
  warningMessage = 'Your payment history shows some late payments that are affecting your credit score. Consider making payments on time to improve your score.';
  selectedDate: string = 'Today';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Force chart redraw when component initializes
    setTimeout(() => {
      if (this.Highcharts.charts[0]) {
        this.Highcharts.charts[0].reflow();
      }
    }, 0);

    // Check for show_preferences parameter
    this.route.queryParams.subscribe((params: { [key: string]: string }) => {
      this.showPreferencesPopup = params['show_preferences'] === 'true';
    });

    // Load saved preferences and credit focuses
    this.loadSavedPreferences();

    this.creditScoreChartOptions = {
      ...this.creditScoreChartOptions,
      chart: {
        ...this.creditScoreChartOptions.chart,
        events: {
          click: (event: any) => {
            if (event.point) {
              this.selectedDate = Highcharts.dateFormat('%b %d, %Y', event.point.x);
              this.cdr.detectChanges();
            }
          }
        }
      }
    };
  }

  loadSavedPreferences() {
    const savedPreferences = sessionStorage.getItem('creditPreferences');
    console.log('Saved preferences from session storage:', savedPreferences);
    
    if (savedPreferences) {
      const preferenceIds = JSON.parse(savedPreferences);
      console.log('Parsed preference IDs:', preferenceIds);
      
      this.savedPreferences = preferenceIds.map((id: string) => ({
        id,
        label: this.preferenceLabels[id] || id
      }));
      console.log('Mapped saved preferences:', this.savedPreferences);

      // Load credit focuses for saved preferences
      const allFocuses: CreditFocus[] = [];
      preferenceIds.forEach((id: string) => {
        const mapping = creditFocusConfig.preferenceMappings.find(m => m.id === id);
        if (mapping) {
          allFocuses.push(...mapping.creditFocuses);
        }
      });

      this.creditFocuses = allFocuses;

      // Create new chart options with credit score series
      const newChartOptions: Highcharts.Options = {
        ...this.creditScoreChartOptions,
        series: [{
          type: 'line',
          name: 'Credit Score',
          data: scoreHistoryData.map(data => ({
            x: data.date.getTime(),
            y: data.score
          })),
          color: '#2c5282',
          lineWidth: 3,
          marker: {
            radius: 6
          }
        }, {
          type: 'line',
          name: 'Predicted Score',
          data: [
            { x: new Date('2025-04-01').getTime(), y: scoreHistoryData[scoreHistoryData.length - 1].score },
            { x: new Date('2025-10-01').getTime(), y: 800 }
          ],
          color: '#2c5282',
          lineWidth: 3,
          dashStyle: 'ShortDash',
          marker: {
            radius: 6
          },
          dataLabels: {
            enabled: true,
            format: '{y}',
            style: {
              fontSize: '12px'
            }
          }
        }]
      };

      // Add focus bars with random colors and specific base data
      allFocuses.forEach(focus => {
        // Generate a random color
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        // Create a new column series for each focus
        const series: Highcharts.SeriesColumnOptions = {
          type: 'column',
          name: focus.label,
          data: focus.baseData,
          color: randomColor,
          visible: false // Hide the columns by default
        };

        (newChartOptions.series as Highcharts.SeriesOptionsType[]).push(series);
      });

      // Update chart options
      this.creditScoreChartOptions = newChartOptions;

      // Force chart redraw
      setTimeout(() => {
        if (this.Highcharts.charts[0]) {
          this.Highcharts.charts[0].update(newChartOptions, true);
        }
      }, 0);
    } else {
      console.log('No saved preferences found in session storage');
    }
  }

  onPreferencesClose() {
    this.showPreferencesPopup = false;
    this.loadSavedPreferences(); // Reload preferences after popup closes
    // Remove the show_preferences parameter from URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { show_preferences: null },
      queryParamsHandling: 'merge'
    });
  }

  navigateToDetail(category: string) {
    this.router.navigate([category]);
  }

  closeWarningModal() {
    this.showWarningModal = false;
  }
}
