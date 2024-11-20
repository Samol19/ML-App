export interface PredictRequest {
    name: string;
    symbol: string;
  }
  
  export interface ComparisonResults {
    [key: string]: any; // Define las claves dinámicamente si necesitas acceder a los resultados como un objeto.
  }
  
  export interface PlotlyTrace {
    type: string; // Tipo de gráfico (e.g., 'scatter', 'bar', etc.)
    x: any[]; // Datos en el eje X
    y: any[]; // Datos en el eje Y
    [key: string]: any; // Permite incluir propiedades adicionales como 'mode', 'name', etc.
  }
  
  export interface PlotlyLayout {
    title: string; // Título del gráfico
    xaxis: any; // Configuración del eje X
    yaxis: any; // Configuración del eje Y
    [key: string]: any; // Propiedades adicionales del layout
  }
  
  export interface PredictResponse {
    graph_data: PlotlyTrace[]; // Array de trazas para el gráfico
    graph_layout: PlotlyLayout; // Configuración del layout del gráfico
    comparison_results: ComparisonResults; // Resultados de la comparación
  }
  