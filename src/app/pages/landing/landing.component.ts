import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PredictResponse } from '../../core/models/predict.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('graphContainer', { static: false }) graphContainer!: ElementRef;

  coinName: string = '';
  coinSymbol: string = '';
  graphHtml: string = '';
  comparisonResults: any = null;
  private Plotly: any;
  showResults: boolean = false;
  showAllResults: boolean = false;

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPlotly();
    }
    this.route.queryParams.subscribe(params => {
      if (params['coinName'] && params['coinSymbol']) {
        this.coinName = params['coinName'];
        this.coinSymbol = params['coinSymbol'];
        this.onSubmit();
      }
    });
  }

  ngAfterViewInit() {
    console.log('AfterViewInit - Graph container:', this.graphContainer);
  }

  private async loadPlotly() {
    try {
      const plotly = await import('plotly.js-dist-min');
      this.Plotly = plotly.default;
      console.log('Plotly loaded successfully');
    } catch (error) {
      console.error('Error loading Plotly:', error);
    }
  }

  onSubmit() {
    if (this.coinName && this.coinSymbol) {
      console.log('Formulario enviado con:', this.coinName, this.coinSymbol);
  
      this.http.post<PredictResponse>('https://3952-38-25-122-44.ngrok-free.app/predict', {
        name: this.coinName,
        symbol: this.coinSymbol
      }).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          
          const graphData = response.graph_data;
          const graphLayout = response.graph_layout;
  
          this.comparisonResults = response.comparison_results;
          this.showResults = true;
  
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              this.initPlotly(graphData, graphLayout);
            }, 100);
          }
        },
        error => {
          console.error('Error en la solicitud:', error);
        }
      );
    }
  }
  
  private initPlotly(graphData: any[], graphLayout: any) {
    console.log('Initializing Plotly...');
    console.log('Graph data:', graphData);
    console.log('Graph layout:', graphLayout);

    if (!this.graphContainer || !this.Plotly) {
      console.warn('Graph container or Plotly is not available');
      return;
    }

    this.graphContainer.nativeElement.innerHTML = '';

    const screenWidth = window.innerWidth;
    const graphWidth = Math.floor(screenWidth * 0.8); // 80% of screen width
    const graphHeight = Math.floor(graphWidth * 0.4425); // 16:9 aspect ratio

    const updatedLayout = {
      ...graphLayout,
      autosize: false,
      width: graphWidth,
      height: graphHeight,
      margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 }
    };

    this.Plotly.newPlot(this.graphContainer.nativeElement, graphData, updatedLayout)
      .then(() => {
        console.log('Plotly graph rendered successfully.');
      })
      .catch((error: any) => {
        console.error('Error rendering Plotly graph:', error);
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  formatNumber(num: number | string): string {
    if (num === '-') return '-';
    return typeof num === 'number' ? num.toLocaleString('es-ES', { maximumFractionDigits: 2 }) : num;
  }

  // Add this to your existing formatPercentage method
  formatPercentage(num: number | null): string {
    if (num === null) return '';
    return (num*1).toFixed(2) + '%';
  }

  toggleShowAllResults() {
    this.showAllResults = !this.showAllResults;
  }

  getDisplayedResults() {
    const results = this.showAllResults ? this.comparisonResults : this.comparisonResults.slice(0, 6);
    return results.map((result: any) => ({
      ...result,
      isHighlighted: result.y_actual === '-' || result.y_pred === '-'
    }));
  }
}