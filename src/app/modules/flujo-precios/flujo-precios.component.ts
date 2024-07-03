import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Competitividad } from 'src/app/model/competitividad';
import { CompetitividadService } from 'src/app/services/competitividad.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-flujo-precios',
  templateUrl: './flujo-precios.component.html',
  styleUrls: ['./flujo-precios.component.scss']
})
export class FlujoPreciosComponent implements OnInit {

  competitividadArray: Competitividad[];

  items: MenuItem[] | undefined;
  codigos:any =  [];
  dataChart:any;
  canalChart:any;
options: any;
nombreCluster:string='Personalizado';
switchMargen:boolean= true;
    activeIndex: number = 0;
    activeAccoredion: number = 0;
    rangeDates:any = [];
    tipo:any = ['Interior','Nacional','Frontera' ];
    selectedTipo:any;
    selectedTiendas:any;
    estados:any = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Nuevo León','...' ];
    tipoCambio:any = [{id:1,name:'Precio Regular'}, {id:2,name:'Promoción'}]
    banderasMargen ={pp:  {real: false, rec: false}, pb:  {real: false, rec: false}, ps:  {real: false, rec: false}, pa: {real: false, rec: false}};
    precioCoppel:any; precioCompetencia: any;
    periodicidad:any = [{id:1,name:'Diario'}, {id:2,name:'Semanal'}, {id: 3, name: 'Mensual'}]
    selectedEstado:any;
    canales: any = ['Físico','Digital'];
    canalSelected: any;
    filtroSelected:any=[];
    messagesFilters: any;
    bodegas:any = ['234324','113','2322 Sur','467','888','...' ];
    selectedBodega:any;
    tiendas:any;
    verPromociones= true;
    verPrecioBase= true;
    codigosFiltered:any;
    contadorOrigen: number = 0;
    origen:any = ['Precio Base', 'Área Comercial','Optimización','Optimizacion','Competitividad'];
    visibleModal:boolean = false;
    folio:any;
    tabModal:any;
    optionsBarCard:any;
    optionsDiferencial:any;
    optionsReview: any;
    atendidosChart:any;
    fueraCompChart:any;
    diferencialChart:any;
    allFisico:boolean= true;
    codigosCompetitivos: any =[];
    codigosNoCompetitivos:any = [];
    dataCompetitividad:any;
    optionsCompetitividad: any;
    allDigital: boolean=true;
    tipoCambioChart:any;
    comparacionCodigo: any =[
      {
        competidor: 'Coppel',
        promo: false,
        d1:{
        mc:false,
          mb:false,
          precio:65},
        d2:{
        mc:false,
          mb:false,
          precio:59},
        d3:{
        mc:true,
          mb:false,
          precio:80},
        d4:{
        mc:true,
          mb:false,
          precio:81},
        d5:{
        mc:false,
          mb:false,
          precio:56},
        d6:{
        mc:true,
          mb:false,
          precio:55},
        d7:{
        mc:false,
          mb:false,
          precio:40
      }
    },
      {
        competidor: 'Amazon',
        promo: false,
        d1:{
        mc:false,
          mb:false,
          precio:28},
        d2:{
        mc:false,
          mb:false,
          precio:48},
        d3:{
        mc:false,
          mb:false,
          precio:40},
        d4:{
        mc:false,
          mb:true,
          precio:19},
        d5:{
        mc:false,
          mb:false,
          precio:86},
        d6:{
        mc:false,
          mb:false,
          precio:27},
        d7:{
        mc:true,
          mb:false,
          precio:90
      }
    },
      {
        competidor: 'Walmart',
        promo: true,
        d1:{
  mc:false,
  mb:false,
  precio:37},
        d2:{
  mc:true,
  mb:false,
  precio:77},
        d3:{
  mc:false,
  mb:true,
  precio:36},
        d4:{
  mc:false,
  mb:false,
  precio:23},
        d5:{
  mc:false,
  mb:true,
  precio:12},
        d6:{
  mc:false,
  mb:true,
  precio:11},
        d7:{
  mc:false,
  mb:true,
  precio:12
      }
    },
      {
        competidor: 'Mercado Libre',
        promo: true,
        d1:{
  mc:true,
  mb:false,
  precio:75},
        d2:{
  mc:false,
  mb:true,
  precio:22},
        d3:{
  mc:false,
  mb:false,
  precio:43},
        d4:{
  mc:false,
  mb:false,
  precio:58},
        d5:{
  mc:false,
  mb:false,
  precio:17},
        d6:{
  mc:false,
  mb:false,
  precio:21},
        d7:{
  mc:false,
  mb:false,
  precio:73
      }
    },
      {
        competidor: 'Bodega Aurrera',
        promo: false,
        d1:{
  mc:false,
  mb:true,
  precio:23},
        d2:{
  mc:false,
  mb:false,
  precio:56},
        d3:{
  mc:false,
  mb:false,
  precio:76},
        d4:{
  mc:false,
  mb:false,
  precio:78},
        d5:{
  mc:false,
  mb:false,
  precio:98},
        d6:{
  mc:true,
  mb:false,
  precio:45},
        d7:{
  mc:false,
  mb:false,
  precio:44
      }
    }
    ];
    preciosSeleccionados:Competitividad[] = [];
    kpi:any={};

    constructor(private competitividadService: CompetitividadService, private router: Router) {
      this.competitividadArray = new Array<Competitividad>;
      let now = new Date();
      this.codigosFiltered=[];
      this.folio = {folio: now.getTime() %10000, date: now}
    }
    nextStep(){
      this.activeIndex ++;
      if(this.activeIndex == 1){
        this.reviewData();
      }
    }

    prevStep(){
      this.activeIndex --;

      if(this.activeIndex == -1){
        this.router.navigate(['index']);
      }
    }
    onActiveIndexChange(event: number) {
        this.activeIndex = event;

    }
    getMessages(){
      this.messagesFilters = [];
      this.filtroSelected.forEach((m:any) => {
        this.messagesFilters.push( { severity: 'info', summary: m },)
      });

    }
    periodicidadSelected: any;
    showPrecioBase=false;
    showPrecioPromocion=false;
    showPrecioOptimizacion=false;
    showInfo=false;

      getFechaAddDays(dias: number){
      let r = new Date();
      r.setDate(r.getDate() + dias);
      return r; 
    }

    getLabelFecha(dias: number){
      let r = new Date();
      r.setDate(r.getDate() + dias);
      let day = r.getDate();
      let dayS:string,monthS:string;
      let month = r.getMonth();
      let year = r.getFullYear();
      if (day < 10) {
          dayS = '0' + day;
      }else{
        dayS = '' + day;
      }
      if (month < 10) {
          monthS = `0${month}`;
      }else{
        monthS = `${month}`;
      }
      let format1 = `${monthS}/${dayS}/${year}`;
      return format1;
    }

     ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.dataChart = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [
          {
              label: 'Coppel',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              tension: 0.4
          },
          {
              label: 'Amazon',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              tension: 0.4
          },
          {
              label: 'Walmart',
              data: [37, 77, 36, 23, 12, 11, 12],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--red-500'),
              tension: 0.4
          },
          {
              label: 'Mercado Libre',
              data: [75, 22, 43, 58, 17, 21, 73],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--gray-500'),
              tension: 0.4
          },
          {
              label: 'Bodega Aurrera',
              data: [23, 56, 76, 78, 98, 45, 44],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--yellow-500'),
              tension: 0.4
          }
      ]
  };
  this.atendidosChart = {
    labels: ['Evaluados', 'Fuera del Ejercicio'],
    datasets: [
        {
            data: [5, 50],
            backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')]
        }
    ]
};
this.fueraCompChart= {
  labels: ['Dentro de Competitividad', 'Fuera de Competitividad'],
  datasets: [
      {
          data: [2, 3],
          backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')]
      }
  ]
};

this.canalChart = {
  labels: ['Físico', 'Digital'],
  datasets: [
      {
          data: [1, 4],
          backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')]
      }
  ]
}
this.tipoCambioChart = {
  labels: ['Precio Regular', 'Promoción'],
  datasets: [
      {
          data: [1, 4],
          backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')]
      }
  ]
};

this.optionsDiferencial = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
      tooltip: {
          mode: 'index',
          intersect: false
      },
      legend: {
        display:false,
        position: 'right' ,
          labels: {

              color: textColor
          }
      }
  },
  scales: {
  
      x: {
        title: {
          display: true,
          text: 'Rango Diferencial'
        },
          stacked: true,
          ticks: {
              color: textColorSecondary,
              stepSize: 1
          },
          grid: {
              color: surfaceBorder,
              drawBorder: false
          }
      },
      y: {
          stacked: true,
          ticks: {
              color: textColorSecondary,
              stepSize: 1
          },
          title: {
            display: true,
            text: 'No. SKU\'s'
          },
          grid: {
              color: surfaceBorder,
              drawBorder: false
          }
      }
  }
};



this.dataCompetitividad = {
  labels: [this.getLabelFecha(-6), 
    this.getLabelFecha(-5), 
    this.getLabelFecha(-4), 
    this.getLabelFecha(-3), 
    this.getLabelFecha(-2), 
    this.getLabelFecha(-1), 
    this.getLabelFecha(0)],
  datasets: [
      {
          type: 'line',
          label: 'Precio Publicado',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [1000, 770, 770, 660, 660, 660, 870]
      },
      {
          type: 'bar',
          label: 'Precio por Competitividad',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [770, 770, , 660, 660, 870, 870],
          borderColor: 'white',
          borderWidth: 2
      },
      {
          type: 'bar',
          label: 'Mejor Competencia',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: [700, 700, 800, 600, 900,900,700]
      }
  ]
};

this.optionsCompetitividad = {
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  plugins: {
      legend: {
          labels: {
              color: textColor
          }
      }
  },
  scales: {
      x: {
          ticks: {
              color: textColorSecondary
          },
          grid: {
              color: surfaceBorder
          }
      },
      y: {
          ticks: {
              color: textColorSecondary
          },
          grid: {
              color: surfaceBorder
          }
      }
  }
};

this.optionsBarCard = {
  scales: {
    x:{
      grid:{
        drawOnChartArea: false
      }
    },
    y:{
      stacked: true,
      ticks: {
          color: textColorSecondary,
          stepSize: 1
      },
 
      grid:{
        drawOnChartArea: false
      }
    }
  },
  plugins: {
      legend: {
          display: false,
          position: 'bottom',
          labels:  {
              usePointStyle: true,
              color: textColor
          }
      }
  }
};


this.optionsReview = {
  cutout: '70%',
  plugins: {
      legend: {
          display: false,
          position: 'bottom',
          labels:  {
              usePointStyle: true,
              color: textColor
          }
      }
  }
};



  this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };


        this.items = [
            {
                label: 'Cambio Precios',
                command:  (event: any) =>{
                  this.activeIndex = 0;
                }
            },
            {
                label: 'Revisar y Enviar',
                command:  (event: any) =>{
                }
            }
        ];


    
        this.selectedTiendas = this.tiendas;


      //Recibiendo
      this.competitividadService.getCompetitividad().subscribe(data => {
        this.competitividadArray = data;
        console.log("Verificando recepcion de arreglo:");
            console.table(this.competitividadArray);
        this.transformCodigosToFlow();
      });
    }

    getCompetidorByPrecio(precioMinimo:any,c:any){
      switch(precioMinimo){
        case this.getPrecioPublicado(c.amazon):
          return 'Amazon';
          break;
        case  this.getPrecioPublicado(c.aurrera):
          return 'Aurrera';
        case  this.getPrecioPublicado(c.chedraui):
          return 'Chedraui';
        case  this.getPrecioPublicado(c.liverpool):
          return 'Liverpool';
        case  this.getPrecioPublicado(c.coppel):
        return 'Coppel';
        default:
          return 'N/A';
      }

    }

    reviewData(){
      let dataChart= [0,0,0,0,0,0,0,0];
      this.codigosCompetitivos = [];
      this.codigosNoCompetitivos = [];
      this.codigos.forEach((codigo:any) => {
        let dif = codigo.ps.diferencial;
        if(dif>10){
          this.codigosNoCompetitivos.push(codigo);
        }else{
          this.codigosCompetitivos.push(codigo);
        }
          
        if(dif < -10 )
            dataChart[0]++;
        if(dif >= -10 && dif <= 0)
            dataChart[1]++;
        if(dif >= 1 && dif <= 10)
            dataChart[2]++;
        if(dif  >= 11 && dif <= 20)
            dataChart[3]++;
        if(dif >= 21 && dif <= 30)
            dataChart[4]++;
        if(dif >= 31 && dif <= 40)
            dataChart[5]++;
        if(dif >= 41 && dif <= 50)
            dataChart[6]++;
        if(dif >= 51)
            dataChart[7]++;
      });
      this.diferencialChart={
        labels: ['> -10%','-10% - -0%', '1% - 10%', '11% - 20%', '21% - 30%', '31% - 40%', '41% - 50%', '50% - 50% <'],
        datasets: [
      
          
            {
              type: 'bar',
              label:"No Atendidos",
              data: dataChart,
              backgroundColor: [ '#295bac9c'],
              borderColor: ['#295bac'],
              borderWidth: 1
          }
        ]
      }

    }

    setAllFisicio(){
      this.codigos.forEach((c :any) => {
        c.canal.fisico = this.allFisico;
      });
    }

    setAllDigital(){
      this.codigos.forEach((c:any) => {
        c.canal.digital = this.allDigital;
      });
    }
    getPrecioPublicado(x:any){
   //   console.log(x);
      return x.precioPromocion  ? x.precioPromocion : x.precioRegular;
    }

    getProfundidad(precioBase:number, precioPromocion:number){
      if(precioBase && precioPromocion){
       let x =  100 - ((precioPromocion * 100)/precioBase);
     //  console.log(x);
       return x;
      }
      return null;
    }

    getAportacion(precioBase:number, precioPromocion:number){
      let aportacion = this.getProfundidad(precioBase, precioPromocion);
      if(aportacion != null){
        return aportacion/2;
      }
      return null;
    }

    getOrigen(){
      let index= this.contadorOrigen%5;
      this.contadorOrigen++;
      console.log(index + "-" + this.origen[index]);
      return this.origen[index];

    }
    getPrecioMinimo(c:any){
    return  Math.min(this.getPrecioPublicado(c.coppel),
      this.getPrecioPublicado(c.amazon),
        this.getPrecioPublicado(c.aurrera),
          this.getPrecioPublicado(c.chedraui),
            this.getPrecioPublicado(c.liverpool)
      );
    }

    getPrecioMaximo(c:any){
      return  Math.max(this.getPrecioPublicado(c.coppel),
      this.getPrecioPublicado(c.amazon),
        this.getPrecioPublicado(c.aurrera),
          this.getPrecioPublicado(c.chedraui),
            this.getPrecioPublicado(c.liverpool)
      );
    }


 
    resetKpi(){
      this.kpi = {
        evaluados: 0,
        competitivos: 0,
        noCompetitivos: 0,
        prcFueraCompetitividad: 0,
        prcDiferencial: 0,
        precioRegular : 0,
        promocion: 0
      }
    }
    actualizarKPIs(){
      this.resetKpi();
      this.kpi.evaluados = this.codigos.length;
      let result = 0;
      this.codigos.forEach((c:any) => {
        if(c.tipo.id  == 1){
         this.kpi.precioRegular++;
        }else{
          this.kpi.promocion++;
        }
        if(c.ps.diferencial > 10){
          this.kpi.noCompetitivos++;
        }else{
          this.kpi.competitivos++;
        }
        this.kpi.prcDiferencial +=c.ps.diferencial;
      });
      this.kpi.prcDiferencial  = this.kpi.prcDiferencial / this.kpi.evaluados;
    }


    transformCodigosToFlow(){
      this.codigos= [];
      this.competitividadArray.forEach((c:any)=>{
      let precioMinimo = this.getPrecioMinimo(c);
        this.codigos.push(
          {
            sku: c.codigo,
            clase: 'Colchón',
            departamento: 'Mueble Suelto',
            marca: 'America',
            modelo: 'Silver',
            canal: {
              digital: true,
              fisico: true
            },
            tipo: this.tipoCambio[1],
            ff: this.getFechaAddDays(8),
            fi: this.getFechaAddDays(1),
            diferencial: c.diferencialMargen,
            mc:{
              comp: this.getCompetidorByPrecio(precioMinimo, c),
              precio: precioMinimo
            },
            pp:{
              precio :  c.coppel.precioPromocion,
              prccp:this.getAportacion(c.coppel.precioRegular, c.coppel.precioPromocion),
              prcpr:this.getAportacion(c.coppel.precioRegular, c.coppel.precioPromocion),
              profundidad: this.getProfundidad(c.coppel.precioRegular, c.coppel.precioPromocion)
            },
            pb:{
              precio: c.coppel.precioRegular,
              margen_real: (Math.random() % 10) + 5,
              margen_rec: (Math.random() % 10) + 3,
              utilidad_real: (Math.random() % 50) + 100,
              utilidad_rec: (Math.random() % 50) + 60,
            },
            ps:{

              precio:  c.precioSugeridoPorcentaje,
              diferencial: 10,
              margen_real: (Math.random() % 10),
              margen_rec: (Math.random() % 50),
              utilidad_real: c.diferencialUtilidad,
              utilidad_rec: c.diferencialUtilidad+13,
              utilidad: c.diferencialUtilidad,
              profundidad: this.getAportacion(this.getPrecioPublicado(c.coppel),c.precioSugeridoPorcentaje),
              prcpr: 0,
              prccp: this.getAportacion(this.getPrecioPublicado(c.coppel),c.precioSugeridoPorcentaje)
            },

            coppel:{
              precio: this.getPrecioPublicado(c.coppel),
              precioRegular:  c.coppel.precioRegular,
              precioPromocion:  c.coppel.precioPromocion,
              origen: this.getOrigen() ,
              margen_real: (Math.random() % 10)+ 30,
              margen_rec: (Math.random() % 50)+40,
              utilidad_real: c.diferencialUtilidad,
              utilidad_rec: c.diferencialUtilidad+13,
            },
            amazon:{
              precio: this.getPrecioPublicado(c.amazon),
              precioRegular:  c.amazon.precioRegular,
              precioPromocion:  c.amazon.precioPromocion,

            },
            aurrera:{
              precio: this.getPrecioPublicado(c.aurrera),
              precioRegular: c.aurrera.precioRegular,
              precioPromocion:  c.aurrera.precioPromocion,

            },
            chedraui:{
              precio: this.getPrecioPublicado(c.chedraui),
              precioRegular: c.chedraui.precioRegular,
              precioPromocion: c.chedraui.precioPromocion
            },
            liverpool:{
              precio: this.getPrecioPublicado(c.liverpool),
              precioRegular: c.liverpool.precioRegular,
              precioPromocion: c.liverpool.precioPromocion

            }
          }
        )
      });
      this.actualizarKPIs();
    }

    clusterNacional(){
      this.filtroSelected = [];
      this.nombreCluster="Nacional";
      this.filtroSelected.push('Canal: Digital');
      this.filtroSelected.push('Canal: Físico');
      this.getMessages();
    }

    clusterMonterrey(){
      this.filtroSelected = [];
      this.nombreCluster="Monterrey";
      this.filtroSelected.push('Estado: Nuevo León');
      this.filtroSelected.push('Canal: Físico');
      this.filtroSelected.push('Bodega: 13546');
      this.getMessages();
    }

    clusterFrontera(){
      this.filtroSelected = [];
      this.nombreCluster="Frontera";
      this.filtroSelected.push('Estado: Baja California');
      this.filtroSelected.push('Estado: Chihuahua');
      this.filtroSelected.push('Estado: Coahuila');
      this.filtroSelected.push('Estado: Nuevo León');
      this.filtroSelected.push('Estado: Tamaulipas');
      this.getMessages();

    }
    isPromo(item:any){
      return item.tipo.id ==    this.tipoCambio[1].id;
    }

    isPrecioRegular(item: any){
      return item.tipo.id ==    this.tipoCambio[0].id;
    }

    showDetailSKU(){
      this.visibleModal = true;
    }


    changeBanderaMargen(bandera: boolean){
      bandera = !bandera;
    }

    filtrarCodigos(){

    }
  }
