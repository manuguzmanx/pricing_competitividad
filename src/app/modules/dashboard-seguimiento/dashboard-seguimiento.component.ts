import { DashboardSeguimientoService } from './../../services/dashboard-seguimiento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    console.log('padre', this.parametrosRecibidos);
    this.fechaFiltro = this.parametrosRecibidos.fecha;
  }






  optionsDataChartHistorico: any;
  dataChartHistorico: any;
  chartHitoricoOptions: any;

  codigosDetalle: any = [
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
    {
      sku: 123223,
      precioPublicado: 1000,
      precioCompetitividad: 770,
      margenPublicado: 36,
      margenCompetitividad: 25,
      mejorCompetidor: 'Aurrera',
      precioCompetidor: 700,
      diferencial: 30,
      ultimaFecha: '18/06/2024',
    },
  ];
  vistaList = [
    { id: 1, name: 'Categoría' },
    { id: 2, name: 'Clase' },
    { id: 3, name: 'Proveedor' },
    { id: 4, name: 'SKU' },
  ];
  vistaListModel: any;

  diferencialChart: any;

  selectedSKU: any = [];
  ranking: any = [
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
    {
      name: 'Joyería y Relojería',
      fueraCom: 37,
      prcFueraCom: 15,
      diferencial: 24,
    },
  ];
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
    this.initDiferencialChart();
    this.initChartAtendidosGlobal();
    this.intDataHistorico();
    this.initChartSeguimiento();
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
      labels: ['Filtrados', 'No Filtrados'],
      datasets: [
        {
          data: [325, 3175],
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
  initDiferencialChart() {
    this.diferencialChart = {
      labels: [
        '-10% - -5%',
        '-4% - 0%',
        '1% - 5%',
        '6% - 10%',
        '11% - 15%',
        '16% - 20%',
        '21% - 25%',
        '26% - 30%',
        '31% - 35%',
        '36% - 40%',
        '41% - 45%',
        '46% - 50%',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Atendidos hace más de 2 días',
          data: [10, 6, 20, 15, 50, 45, 35, 48, 18, 12, 10, 6],
          backgroundColor: [this.documentStyle.getPropertyValue('--gray-500')],
          borderColor: ['#FFFFFF'],
          borderWidth: 1,
        },

        {
          type: 'bar',
          label: 'Atendidos hace 2 día',
          data: [10, 6, 20, 15, 50, 45, 35, 48, 18, 12, 10, 6],
          backgroundColor: [this.documentStyle.getPropertyValue('--blue-300')],
          borderColor: ['#FFFFFF'],
          borderWidth: 1,
        },
        {
          type: 'bar',
          label: 'Atendidos hace 1 día',
          data: [10, 6, 20, 15, 50, 45, 35, 48, 18, 12, 10, 6],
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

    console.log(dataset);
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
