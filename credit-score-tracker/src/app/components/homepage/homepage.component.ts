import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { PreferencesPopupComponent } from '../preferences-popup/preferences-popup.component';
import { creditFocusConfig, CreditFocus, PreferenceMapping } from '../../config/credit-focus.config';

interface ScoreIngredientBreakdown {
  title: string;
  value: string[];
}

interface ScoreIngredient {
  category: string;
  title: string;
  description: string;
  status: 'Exceptional' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  breakdown: ScoreIngredientBreakdown[];
}

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
  currentScore: number = 750;
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          fontSize: '14px'
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
      data: [650, 680, 700, 720, 750, 780],
      color: '#2c5282',
      lineWidth: 3,
      marker: {
        radius: 6
      }
    }],
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      formatter: function(this: Highcharts.Point) {
        if (!this.series || !this.series.chart) return '';
        
        const points = this.series.chart.hoverPoints;
        if (!points || points.length === 0) return '';
        
        let tooltip = `<b>${this.category}</b><br/>`;
        
        // Add all series values
        this.series.chart.series.forEach(series => {
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
    {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Exceptional',
      breakdown: []
    },
    {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Good',
      breakdown: [
        {
          title: 'Accounts with balances',
          value: ['7', '7', '8', '7', '7', '7']
        },
        {
          title: 'Total balance on revolving accounts',
          value: ['3000', '4000', '3000', '5100', '2500', '3300']
        },
        {
          title: 'Revolving utilization',
          value: ['3%', '4%', '3%', '5%', '2%', '3%']
        }
      ]
    },
    {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Fair',
      breakdown: []
    },
    {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Good',
      breakdown: []
    },
    {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Exceptional',
      breakdown: []
    }
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

  constructor(
    private router: Router,
    private route: ActivatedRoute
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
          data: [650, 680, 700, 720, 750, 780],
          color: '#2c5282',
          lineWidth: 3,
          marker: {
            radius: 6
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
}
