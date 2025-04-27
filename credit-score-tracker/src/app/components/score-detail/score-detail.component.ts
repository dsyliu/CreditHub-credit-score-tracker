import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface DetailInfo {
  title: string;
  description: string;
  status: string;
  score: number;
  tips: string[];
  history: { date: string; value: number; }[];
}

@Component({
  selector: 'app-score-detail',
  templateUrl: './score-detail.component.html',
  styleUrls: ['./score-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ScoreDetailComponent implements OnInit {
  category: string = '';
  detailInfo: DetailInfo | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.loadDetailInfo();
    });
  }

  loadDetailInfo() {
    // Simulated data - in a real app, this would come from a service
    const detailsMap: { [key: string]: DetailInfo } = {
      'payment-history': {
        title: 'Payment History',
        description: 'Your track record of paying bills on time',
        status: 'excellent',
        score: 95,
        tips: [
          'Continue to pay all bills on time',
          'Set up automatic payments for recurring bills',
          'Keep track of payment due dates'
        ],
        history: [
          { date: '2024-01', value: 95 },
          { date: '2023-12', value: 94 },
          { date: '2023-11', value: 93 },
          { date: '2023-10', value: 95 },
          { date: '2023-09', value: 92 },
          { date: '2023-08', value: 90 }
        ]
      },
      'credit-utilization': {
        title: 'Credit Utilization',
        description: 'Amount of credit you\'re using compared to your credit limits',
        status: 'good',
        score: 85,
        tips: [
          'Keep credit card balances below 30% of their limits',
          'Consider requesting credit limit increases',
          'Pay credit card balances in full when possible'
        ],
        history: [
          { date: '2024-01', value: 85 },
          { date: '2023-12', value: 82 },
          { date: '2023-11', value: 80 },
          { date: '2023-10', value: 78 },
          { date: '2023-09', value: 75 },
          { date: '2023-08', value: 73 }
        ]
      },
      'credit-age': {
        title: 'Length of Credit History',
        description: 'How long you\'ve had credit accounts open',
        status: 'fair',
        score: 75,
        tips: [
          'Keep your oldest credit accounts open',
          'Avoid opening too many new accounts at once',
          'Be patient - this factor improves with time'
        ],
        history: [
          { date: '2024-01', value: 75 },
          { date: '2023-12', value: 74 },
          { date: '2023-11', value: 73 },
          { date: '2023-10', value: 72 },
          { date: '2023-09', value: 71 },
          { date: '2023-08', value: 70 }
        ]
      },
      'credit-mix': {
        title: 'Credit Mix',
        description: 'The variety of credit accounts you have',
        status: 'good',
        score: 80,
        tips: [
          'Maintain a mix of credit types (credit cards, loans, etc.)',
          'Only open new accounts when needed',
          'Consider diversifying your credit portfolio over time'
        ],
        history: [
          { date: '2024-01', value: 80 },
          { date: '2023-12', value: 80 },
          { date: '2023-11', value: 79 },
          { date: '2023-10', value: 78 },
          { date: '2023-09', value: 77 },
          { date: '2023-08', value: 75 }
        ]
      }
    };

    this.detailInfo = detailsMap[this.category] || null;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
