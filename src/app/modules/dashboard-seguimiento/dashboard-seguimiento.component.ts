import { DashboardSeguimientoService } from './../../services/dashboard-seguimiento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-seguimiento',
  templateUrl: './dashboard-seguimiento.component.html',
  styleUrls: ['./dashboard-seguimiento.component.scss'],
})
export class DashboardSeguimientoComponent implements OnInit {
  parametrosRecibidos: any;

  fechaFiltro = new Date();

  manejarParametros(parametros: any) {
    this.parametrosRecibidos = parametros;
    this.fechaFiltro = this.parametrosRecibidos.fecha;
    this.busquedaRanking()
    this.busquedaSkusCoppel()
    this.busquedaDist()
  }






  optionsDataChartHistorico: any;
  dataChartHistorico: any;
  chartHitoricoOptions: any;
  codigosDetalle:any


  vistaList = [
    { id: 1, name: 'Categoria' },
    { id: 2, name: 'Clase' },
    { id: 3, name: 'Proveedor' },
    { id: 4, name: 'SKU' },
  ];
  vistaListModel: any;

  diferencialChart: any;

  selectedSKU: any = [];
  ranks:any[] = [];
  selectedRanking:any
  paramsRanking:any =[]

  listaSkusCoppel:any[] =[]

  busquedaRanking() {
    if(this.parametrosRecibidos){
      this.paramsRanking = this.parametrosRecibidos
    }else{
      this.paramsRanking = {
        fecha: this.fechaFiltro,
      };
    }
    forkJoin({
      ranking: this.dashboardSeguimientoService.getRankings(this.paramsRanking),
    }).subscribe(
      ({ ranking }) => {
        if (ranking) {
          this.ranks = ranking;
          if(this.fullRanking){
            this.selectedRanking = {id:1, name:'Categoria'}
            this.filtroRanking()
          }
        } else {
          console.warn("El formato del ranking no es el esperado", ranking);
        }
      },
      (error) => {
        console.error('Error al cargar los filtros', error);
      }
    );
  }

  
  busquedaSkusCoppel() {
    if(this.parametrosRecibidos){
      this.paramsRanking = this.parametrosRecibidos
    }else{
      this.paramsRanking = {
        fecha: this.fechaFiltro,
      };
    }
    forkJoin({
      lista: this.dashboardSeguimientoService.getSkusCoppel(this.paramsRanking),
    }).subscribe(
      ({ lista }) => {
        if (lista) {
          this.listaSkusCoppel = lista;
        } else {
          console.warn("El formato del ranking no es el esperado", lista);
        }
      },
      (error) => {
        console.error('Error al cargar los filtros', error);
      }
    );
  }

  




  fullRanking:any = []

  filtroRanking(){
    this.fullRanking = [...this.ranks]
    this.fullRanking= this.fullRanking.filter((item: { type: string; name: string; }) => item.type === this.selectedRanking.name);


  }

  pruebas(){
    console.log(this.fullRanking)
  }

  seguimientoSkuEvaluados: any = [
    {
      dia: this.addDaysToDate(new Date(), -2),
      data: [
        {
          label: 'Diferencial',
          valor: 41,
          chart: false,
        },
        {
          label: 'Total Evaluados',
          valor: 225,
          chart: false,
        },
        {
          label: 'Fuera de Competitividad',
          valor: 60,
          chart: true,
          color: '--gray-500',
        },
        {
          label: 'Dentro de Competitividad',
          valor: 195,
          chart: false,
        },
        {
          label: 'Total Atendidos',
          valor: 23,
          chart: false,
        },
        {
          label: 'Atendidos Dentro Competitiviad',
          valor: 10,
          chart: false,
        },
        {
          label: 'Atendidos Fuera Competitiviad',
          valor: 13,
          chart: true,
          color: '--blue-200',
        },
        {
          label: 'Reportados por Wiser Corregidos',
          valor: 30,
          chart: true,
          color: '--blue-700',
        },
        {
          label: 'Reportados por Wiser Sin Corregir',
          valor: 35,
          chart: false,
        },
        {
          label: '1 día fuera de Competitividad',
          valor: 45,
          chart: false,
        },
        {
          label: '2 día fuera de Competitividad',
          valor: 35,
          chart: false,
        },
      ],
    },
    {
      dia: this.addDaysToDate(new Date(), -1),
      data: [
        {
          label: 'Diferencial',
          valor: 42,
        },
        {
          label: 'Total Evaluados',
          valor: 223,
        },
        {
          label: 'Fuera de Competitividad',
          valor: 60,
        },
        {
          label: 'Dentro de Competitividad',
          valor: 163,
        },
        {
          label: 'Total Atendidos',
          valor: 73,
        },
        {
          label: 'Atendidos Dentro Competitiviad',
          valor: 65,
        },
        {
          label: 'Atendidos Fuera Competitiviad',
          valor: 8,
        },
        {
          label: 'Reportados por Wiser Corregidos',
          valor: 50,
        },
        {
          label: 'Reportados por Wiser Sin Corregir',
          valor: 10,
        },
        {
          label: "SKU's con 1 día fuera de Competitividad",
          valor: 20,
        },
        {
          label: "SKU's con 2 día fuera de Competitividad",
          valor: undefined,
        },
      ],
    },
    {
      dia: this.addDaysToDate(new Date(), 0),
      data: [
        {
          label: 'Diferencial',
          valor: 45,
        },
        {
          label: 'Total Evaluados',
          valor: 225,
        },
        {
          label: 'Fuera de Competitividad',
          valor: 100,
        },
        {
          label: 'Dentro de Competitividad',
          valor: 125,
        },
        {
          label: 'Total Atendidos',
          valor: 65,
        },
        {
          label: 'Atendidos Dentro Competitiviad',
          valor: 60,
        },
        {
          label: 'Atendidos Fuera Competitiviad',
          valor: 5,
        },
        {
          label: 'Reportados por Wiser Corregidos',
          valor: undefined,
        },
        {
          label: 'Reportados por Wiser Sin Corregir',
          valor: undefined,
        },
        {
          label: "SKU's con 1 día fuera de Competitividad",
          valor: undefined,
        },
        {
          label: "SKU's con 2 día fuera de Competitividad",
          valor: undefined,
        },
      ],
    },
  ];
  /*CHART VARS*/
  evaluadosChart: any;
  atendidosChart: any;
  optionsReview: any;
  fueraCompChart: any;
  tipoCambioChart: any;
  optionsDiferencial: any;
  canalChart: any;
  documentStyle: any;
  textColor: any;
  textColorSecondary: any;
  surfaceBorder: any;
  atendidosGlobalData: any;
  atendidosGlobalOptionChart: any;
  dataSeguimiento: any;
  optionsSeguimiento: any;



  ngOnInit() {
    this.documentStyle = getComputedStyle(document.documentElement);
    this.textColor = this.documentStyle.getPropertyValue('--text-color');
    this.textColorSecondary = this.documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    this.surfaceBorder =
    this.documentStyle.getPropertyValue('--surface-border');
    this.initEvaluadosChart();
    this.initChartAtendidos();
    this.initChartTipoCambio();
    this.initChartCompetitividad();
    
    this.initChartAtendidosGlobal();
    this.intDataHistorico();
    this.initChartSeguimiento();
    this.busquedaRanking();
    this.busquedaSkusCoppel();
    this.busquedaDist();
    this.busquedaEvaluaciones();
    this.fullRanking = [...this.ranks]
  }

  constructor(private router: Router, private dashboardSeguimientoService:DashboardSeguimientoService) {}

  addDaysToDate(date: Date, days: number) {
    let newDate = date;
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
  intDataHistorico() {
    this.dataChartHistorico = {
      labels: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
      ],
      datasets: [
        {
          label: 'Fuera de Competitvidad',
          data: [41, 43, 42, 39, 42, 39, 40],
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--gray-500'),

          tension: 0.1,
        },
        {
          label: 'Corregidos',
          data: [11, 9, 15, 10, 12, , ,],
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-700'),
          tension: 0.1,
        },
        {
          label: 'Fuera de Competitividad - Corregidos',
          data: [30, 34, 38, 29, 30, , ,],
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-300'),
          tension: 0.1,
        },
      ],
    };
    this.optionsDataChartHistorico = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: this.textColor,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: false,
            text: 'Día',
          },
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          title: {
            display: true,
            text: "SKU's",
          },
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  initChartAtendidos() {
    this.atendidosChart = {
      labels: ['Evaluados', 'Fuera del Ejercicio'],
      datasets: [
        {
          data: [300, 3500],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-700'),
            this.documentStyle.getPropertyValue('--gray-500'),
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--blue-600'),
            this.documentStyle.getPropertyValue('--gray-400'),
          ],
        },
      ],
    };
    this.optionsReview = {
      cutout: '70%',
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            color: this.textColor,
          },
        },
      },
    };
  }
  initEvaluadosChart() {
    this.evaluadosChart = {
      labels: ['Evaluados', 'No Evaluados'],
      datasets: [
        {
          data: [this.evaluaciones.skus_atendidos, this.evaluaciones.skus_total],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-700'),
            this.documentStyle.getPropertyValue('--gray-500'),
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--blue-600'),
            this.documentStyle.getPropertyValue('--gray-400'),
          ],
        },
      ],
    };
  }
  initChartTipoCambio() {
    this.tipoCambioChart = {
      labels: ['Precio Regular', 'Promoción'],
      datasets: [
        {
          data: [1, 4],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-700'),
            this.documentStyle.getPropertyValue('--gray-500'),
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--blue-600'),
            this.documentStyle.getPropertyValue('--gray-400'),
          ],
        },
      ],
    };
  }
  initChartCompetitividad() {
    this.fueraCompChart = {
      labels: ['Dentro de Competitividad', 'Fuera de Competitividad'],
      datasets: [
        {
          data: [2, 3],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-700'),
            this.documentStyle.getPropertyValue('--gray-500'),
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--blue-600'),
            this.documentStyle.getPropertyValue('--gray-400'),
          ],
        },
      ],
    };
  }
  initChartAtendidosGlobal() {
    this.atendidosGlobalData = {
      labels: ['1 día', '2 días', '+ 2 días'],
      datasets: [
        {
          label: 'Atendidos',
          data: [50, 175, 75],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-700'),
            this.documentStyle.getPropertyValue('--blue-300'),
            this.documentStyle.getPropertyValue('--gray-500'),
          ],
          borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
          borderWidth: 1,
        },
      ],
    };
    this.atendidosGlobalOptionChart = {
      plugins: {
        legend: {
          display: false,
          labels: {
            usePointStyle: true,
            color: this.textColor,
          },
        },
      },
    };
  }

  distribuciones:any

  busquedaDist() {
    if(this.parametrosRecibidos){
      this.paramsRanking = this.parametrosRecibidos
    }else{
      this.paramsRanking = {
        fecha: this.fechaFiltro,
      };
    }
    forkJoin({
      dist: this.dashboardSeguimientoService.getDist(this.paramsRanking),
    }).subscribe(
      ({ dist }) => {
        if (dist) {
          this.distribuciones = dist;
          this.initDiferencialChart();
        } else {
          console.warn("El formato del ranking no es el esperado", dist);
        }
      },
      (error) => {
        console.error('Error al cargar los filtros', error);
      }
    );
  }

  evaluaciones:any = []

  busquedaEvaluaciones() {
    if(this.parametrosRecibidos){
      this.paramsRanking = this.parametrosRecibidos
    }else{
      this.paramsRanking = {
        fecha: this.fechaFiltro,
      };
    }
    forkJoin({
      evaluaciones: this.dashboardSeguimientoService.getEvaluaciones(this.paramsRanking),
    }).subscribe(
      ({ evaluaciones }) => {
        if (evaluaciones) {
          this.evaluaciones = evaluaciones;
          this.initEvaluadosChart();
          console.log(this.evaluaciones)
        } else {
          console.warn("El formato del ranking no es el esperado", evaluaciones);
        }
      },
      (error) => {
        console.error('Error al cargar los filtros', error);
      }
    );
  }


  initDiferencialChart() {
    this.diferencialChart = {
      labels: this.distribuciones.labels,
      datasets: [
        {
          type: 'bar',
          label: 'Atendidos hace más de 2 días',
          data: this.distribuciones.values_1,
          backgroundColor: [this.documentStyle.getPropertyValue('--gray-500')],
          borderColor: ['#FFFFFF'],
          borderWidth: 1,
        },

        {
          type: 'bar',
          label: 'Atendidos hace 2 día',
          data: this.distribuciones.values_2,
          backgroundColor: [this.documentStyle.getPropertyValue('--blue-300')],
          borderColor: ['#FFFFFF'],
          borderWidth: 1,
        },
        {
          type: 'bar',
          label: 'Atendidos hace 1 día',
          data: this.distribuciones.values_m2,
          backgroundColor: [this.documentStyle.getPropertyValue('--blue-700')],
          borderColor: ['#FFFFFF'],
          borderWidth: 1,
        },
      ],
    };
    this.optionsDiferencial = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          display: false,
          position: 'right',
          labels: {
            color: this.textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  getLabelFecha(date: Date, dias: number) {
    let r = date;
    r.setDate(r.getDate() + dias);
    let day = r.getDate();
    let dayS: string, monthS: string;
    let month = r.getMonth();
    let year = r.getFullYear();
    if (day < 10) {
      dayS = '0' + day;
    } else {
      dayS = '' + day;
    }
    if (month < 10) {
      monthS = `0${month}`;
    } else {
      monthS = `${month}`;
    }
    let format1 = `${dayS}/${monthS}/${year}`;
    return format1;
  }
  initChartSeguimiento() {
    let dataset: any = [];
    let index = 0;
    this.seguimientoSkuEvaluados[0].data.forEach((kpi: any) => {
      if (kpi.chart) {
        dataset.push({
          label: this.seguimientoSkuEvaluados[0].data[index].label,
          data: [
            this.seguimientoSkuEvaluados[0].data[index].valor,
            this.seguimientoSkuEvaluados[1].data[index].valor,
            this.seguimientoSkuEvaluados[2].data[index].valor,
          ],
          fill: false,
          backgroundColor: this.documentStyle.getPropertyValue(
            this.seguimientoSkuEvaluados[0].data[index].color
          ),
          borderColor: this.documentStyle.getPropertyValue(
            this.seguimientoSkuEvaluados[0].data[index].color
          ),
          tension: 0.2,
        });
      }

      index++;
    });

    this.dataSeguimiento = {
      labels: [
        this.getLabelFecha(this.seguimientoSkuEvaluados[0].dia, 0),
        this.getLabelFecha(this.seguimientoSkuEvaluados[1].dia, 0),
        this.getLabelFecha(this.seguimientoSkuEvaluados[2].dia, 0),
      ],
      datasets: dataset,
    };
    this.optionsSeguimiento = {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            color: this.textColor,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: false,
            text: 'Día',
          },
        },
        y: {
          stacked: false,

          title: {
            display: true,
            text: "No SKU's",
          },
        },
      },
    };
  }
}
