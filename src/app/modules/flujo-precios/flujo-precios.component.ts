import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Competitividad } from 'src/app/model/competitividad';
import { CompetitividadService } from 'src/app/services/competitividad.service';
import { AppComponent } from '../../app.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-flujo-precios',
  templateUrl: './flujo-precios.component.html',
  styleUrls: ['./flujo-precios.component.scss'],
    providers: [ConfirmationService]
})
export class FlujoPreciosComponent implements OnInit {

  competitividadArray: Competitividad[];
  productSelected:any = {};
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
    tipoCambio:any = [{id:1,name:'Precio Regular'}, {id:2,name:'Promoción'},{id:3, name: 'Sin modificación'}]
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
    verSinCambio = true;
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
          precio:100},
        d2:{
        mc:false,
          mb:false,
          precio:100},
        d3:{
        mc:true,
          mb:false,
          precio:100},
        d4:{
        mc:true,
          mb:false,
          precio:80},
        d5:{
        mc:false,
          mb:false,
          precio:100},
        d6:{
        mc:true,
          mb:false,
          precio:100},
        d7:{
        mc:false,
          mb:false,
          precio:100
      }
    },
      {
        competidor: 'Amazon',
        promo: false,
        d1:{
        mc:false,
          mb:false,
          precio:70},
        d2:{
        mc:false,
          mb:false,
          precio:80},
        d3:{
        mc:false,
          mb:false,
          precio:80},
        d4:{
        mc:false,
          mb:true,
          precio:80},
        d5:{
        mc:false,
          mb:false,
          precio:80},
        d6:{
        mc:false,
          mb:false,
          precio:70},
        d7:{
        mc:true,
          mb:false,
          precio:70
      }
    },
      {
        competidor: 'Walmart',
        promo: true,
        d1:{
  mc:false,
  mb:false,
  precio:120},
        d2:{
  mc:true,
  mb:false,
  precio:150},
        d3:{
  mc:false,
  mb:true,
  precio:150},
        d4:{
  mc:false,
  mb:false,
  precio:150},
        d5:{
  mc:false,
  mb:true,
  precio:150},
        d6:{
  mc:false,
  mb:true,
  precio:100},
        d7:{
  mc:false,
  mb:true,
  precio:100
      }
    },
      {
        competidor: 'Mercado Libre',
        promo: true,
        d1:{
  mc:true,
  mb:false,
  precio:120},
        d2:{
  mc:false,
  mb:true,
  precio:120},
        d3:{
  mc:false,
  mb:false,
  precio:120},
        d4:{
  mc:false,
  mb:false,
  precio:120},
        d5:{
  mc:false,
  mb:false,
  precio:120},
        d6:{
  mc:false,
  mb:false,
  precio:120},
        d7:{
  mc:false,
  mb:false,
  precio:120
      }
    },
      {
        competidor: 'Bodega Aurrera',
        promo: false,
        d1:{
  mc:false,
  mb:true,
  precio:100},
        d2:{
  mc:false,
  mb:false,
  precio:100},
        d3:{
  mc:false,
  mb:false,
  precio:110},
        d4:{
  mc:false,
  mb:false,
  precio:110},
        d5:{
  mc:false,
  mb:false,
  precio:110},
        d6:{
  mc:true,
  mb:false,
  precio:110},
        d7:{
  mc:false,
  mb:false,
  precio:110
      }
    }
    ];
    preciosSeleccionados:Competitividad[] = [];
    kpi:any={};
    documentStyle : any;
    textColor : any;
    comment =  "";
    textColorSecondary : any;
    visibleComment=false;
    surfaceBorder : any;
    constructor(private confirmationService: ConfirmationService, private competitividadService: CompetitividadService, private router: Router) {
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

    showDialogComment(product:any){
      this.visibleComment = true;
      this.productSelected = product;
    }

    prevStep(){
      this.activeIndex --;

      if(this.activeIndex == -1){
        this.router.navigate(['/cambio-precios']);
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
      this.documentStyle = getComputedStyle(document.documentElement);
      this.textColor = this.documentStyle.getPropertyValue('--text-color');
      this.textColorSecondary =this.documentStyle.getPropertyValue('--text-color-secondary');
      this.surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');


    this.dataChart = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [
          {
              label: 'Coppel',
              data: [100, 100, 100, 80, 100, 100, 100],
              fill: false,
              borderColor: this.documentStyle.getPropertyValue('--blue-500'),
              tension: 0.4
          },
          {
              label: 'Amazon',
              data: [70, 80, 80, 80, 80, 70, 70],
              fill: false,
              borderColor: this.documentStyle.getPropertyValue('--pink-500'),
              tension: 0.4
          },
          {
              label: 'Walmart',
              data: [120, 150, 150, 150, 150, 100, 100],
              fill: false,
              borderColor: this.documentStyle.getPropertyValue('--red-500'),
              tension: 0.4
          },
          {
              label: 'Mercado Libre',
              data: [120, 120, 120, 120, 120, 120, 120],
              fill: false,
              borderColor: this.documentStyle.getPropertyValue('--gray-500'),
              tension: 0.4
          },
          {
              label: 'Bodega Aurrera',
              data: [110, 110, 110, 110, 110, 110, 110],
              fill: false,
              borderColor: this.documentStyle.getPropertyValue('--yellow-500'),
              tension: 0.4
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

              color: this.textColor
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
              color: this.textColorSecondary,
              stepSize: 1
          },
          grid: {
              color: this.surfaceBorder,
              drawBorder: false
          }
      },
      y: {
          stacked: true,
          ticks: {
              color: this.textColorSecondary,
              stepSize: 1
          },
          title: {
            display: true,
            text: 'No. SKU\'s'
          },
          grid: {
              color: this.surfaceBorder,
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
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [1000, 770, 770, 660, 660, 660, 870]
      },
      {
          type: 'bar',
          label: 'Precio por Competitividad',
          backgroundColor: this.documentStyle.getPropertyValue('--green-500'),
          data: [770, 770, , 660, 660, 870, 870],
          borderColor: 'white',
          borderWidth: 2
      },
      {
          type: 'bar',
          label: 'Mejor Competencia',
          backgroundColor: this.documentStyle.getPropertyValue('--orange-500'),
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
              color: this.textColor
          }
      }
  },
  scales: {
      x: {
          ticks: {
              color: this.textColorSecondary
          },
          grid: {
              color: this.surfaceBorder
          }
      },
      y: {
          ticks: {
              color: this.textColorSecondary
          },
          grid: {
              color: this.surfaceBorder
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
          color: this.textColorSecondary,
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
              color: this.textColor
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
              color: this.textColor
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
                  color: this.textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: this.textColorSecondary
              },
              grid: {
                  color: this.surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: this.textColorSecondary
              },
              grid: {
                  color: this.surfaceBorder,
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
              label:"No SKU's",
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
        prcDentroCompetitividad: 0,
        prcFueraCompetitividad: 0,
        prcDiferencial: 0,
        precioRegular : 0,
        prcRegular: 0,
        promocion: 0,
        prcPromocion: 0,
        fisico: 0,
        digital: 0,
        sincambio: 0,
        prcSinCambio: 0
      }
    }
    actualizarKPIs(){
      this.resetKpi();
      this.kpi.evaluados = this.codigos.length;
      let result = 0;
      this.codigos.forEach((c:any) => {
        if(c.tipo.id  == 1){
         this.kpi.precioRegular++;
        }else if(c.tipo.id == 2){
          this.kpi.promocion++;
        }else{
          this.kpi.sincambio++
        }
        if(c.canal.fisico){
          this.kpi.fisico ++;
        }
        if(c.canal.digital){
          this.kpi.digital ++;
        }
        if(c.ps.diferencial > 10){
          this.kpi.noCompetitivos++;
        }else{
          this.kpi.competitivos++;
        }
        this.kpi.prcDiferencial =   this.kpi.prcDiferencial + parseInt(c.ps.diferencial);
      });
      this.kpi.prcDiferencial  = this.kpi.prcDiferencial / this.kpi.evaluados;
      this.kpi.prcDentroCompetitividad = (this.kpi.competitivos * 100) / this.kpi.evaluados;
      this.kpi.prcFueraCompetitividad = 100 - this.kpi.prcDentroCompetitividad;
      this.kpi.prcRegular = (this.kpi.precioRegular * 100) / this.kpi.evaluados;
      this.kpi.prcPromocion = 100 - this.kpi.prcRegular;
      this.initCharts();
    }

    getCatTipoCambio(precioPromocion:number){
      let resultCat =  JSON.parse(JSON.stringify(this.tipoCambio)) ; 
      if(precioPromocion){
       resultCat[0].disabled = true;
      }
      return resultCat;
    }
    transformCodigosToFlow(){
      this.codigos= [];
      this.competitividadArray.forEach((c:any)=>{
      let precioMinimo = this.getPrecioMinimo(c);
      let cat = this.getCatTipoCambio(c.coppel.precioPromocion);
        this.codigos.push(
          {
            sku: c.codigo,
            clase: 'Colchón',
            departamento: 'Mueble Suelto',
            marca: 'America',
            modelo: 'Silver',
            comment: "",
            canal: {
              digital: true,
              fisico: true
            },
            tipoCambio: cat,
            tipo: cat[1],
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

 
    isPromo(item:any){
      return item.tipo.id ==    this.tipoCambio[1].id;
    }

    initCharts(){
      this.atendidosChart = {
        labels: ['Evaluados', 'Fuera del Ejercicio'],
        datasets: [
            {
                data: [this.kpi.evaluados, 350 - this.kpi.evaluados],
                backgroundColor: [this.documentStyle.getPropertyValue('--blue-700'), this.documentStyle.getPropertyValue('--gray-500')],
                hoverBackgroundColor: [this.documentStyle.getPropertyValue('--blue-600'), this.documentStyle.getPropertyValue('--gray-400')]
            }
        ]
    };
    this.fueraCompChart= {
      labels: ['Dentro de Competitividad', 'Fuera de Competitividad'],
      datasets: [
          {
              data: [this.kpi.competitivos, this.kpi.noCompetitivos],
              backgroundColor: [this.documentStyle.getPropertyValue('--blue-700'), this.documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [this.documentStyle.getPropertyValue('--blue-600'), this.documentStyle.getPropertyValue('--gray-400')]
          }
      ]
    };
    
    this.canalChart = {
      labels: ['Físico', 'Digital'],
      datasets: [
          {
              data: [this.kpi.fisico, this.kpi.digital],
              backgroundColor: [this.documentStyle.getPropertyValue('--blue-700'), this.documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [this.documentStyle.getPropertyValue('--blue-600'), this.documentStyle.getPropertyValue('--gray-400')]
          }
      ]
    }
    this.tipoCambioChart = {
      labels: ['Precio Regular', 'Promoción'],
      datasets: [
          {
              data: [this.kpi.precioRegular, this.kpi.promocion],
              backgroundColor: [this.documentStyle.getPropertyValue('--blue-700'), this.documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [this.documentStyle.getPropertyValue('--blue-600'), this.documentStyle.getPropertyValue('--gray-400')]
          }
      ]
    };
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


    confirmEnvio(event: Event){
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Está seguro que desea realizar el Envío de Precios?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            console.log("aceptar")
        },
        reject: () => {
            console.log("cancelar");
        }
    });
    }
  }
