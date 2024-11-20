import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PredictResponse } from '../../core/models/predict.model';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface TopCategoryItem {
  class: number;
  name: string;
  token: string;
  one_month_predict: number;
  graph_data: string;
  graph_layout: string;
  comparison_results: string;
}


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class TopCategoriesComponent implements OnInit {
  categories: { [key: number]: TopCategoryItem[] } = {};
  loading = true;
  error = '';
  expandedCategories: number[] = [];
  categoryNames: { [key: number]: string } = {
    0: 'IA',
    1: 'Gaming',
    2: 'RWA',
    3: 'Meme'
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchTopCategories();
  }

  fetchTopCategories() {
    this.http.get<TopCategoryItem[]>('https://3952-38-25-122-44.ngrok-free.app/top_5_per_class').subscribe(
      (data) => {
        this.categories = data.reduce((acc, item) => {
          if (!acc[item.class]) {
            acc[item.class] = [];
          }
          acc[item.class].push(item);
          return acc;
        }, {} as { [key: number]: TopCategoryItem[] });
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to fetch data';
        this.loading = false;
      }
    );
  }

  toggleCategory(categoryId: number) {
    const index = this.expandedCategories.indexOf(categoryId);
    if (index > -1) {
      this.expandedCategories.splice(index, 1);
    } else {
      this.expandedCategories.push(categoryId);
    }
  }

  isCategoryExpanded(categoryId: number): boolean {
    return this.expandedCategories.includes(categoryId);
  }

  onItemClick(item: TopCategoryItem) {
    this.router.navigate(['/sarimax'], {
      fragment: 'home',
      queryParams: { coinName: item.name, coinSymbol: item.token }
    });
  }
}