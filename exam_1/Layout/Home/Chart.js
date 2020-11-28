import React,{ Component } from 'react';
import Table from '../../Componnet/Table';
import { Button } from '@sencha/ext-modern';
import Storer from "../../Store/Storer";
export default class Chart extends Component {
  state={loading:false}
  query(){
    let query={};
    let searchVal  = decodeURIComponent(window.location.search)
    searchVal.slice(1).split('&').map(e => { e = e.split('='); if(e[0]!="") query[e[0]] = e[1]; });
    
    return query;
  }
  getdata(e){
    let _chart = e.target.title
     this.state.loading = true;
    Storer({
      noddata:{from:"chart_sound_series_data",order:"ord",asc:true,0:{_chart}},
      series:{from:"chart_sound_series",0:{_chart}},
      sound:{from:"chart_sound",0:{_chart}},
      chart:{from:"chart",0:{id:_chart}},
    },this);
   
  }
  opener(){
    let {name,xaxis,yaxis,zaxis,xmax,ymax,zmax,xmin,ymin,zmin} = this.state.chart[0];
    let {sound,series,noddata} = this.state
    let sname=[],sref=[],scolor=[],serii=[];
    for(let s of sound) sname[s.id] = s.name,scolor[s.id] = s.color;
    for(let i in series) serii[series[i].id] = i;
    for(let seri of series) {
      seri.name = sname[seri._chart_sound];
      seri.color = "#" + (scolor[seri._chart_sound]||"eeeeee");
      
      seri.id =  "a"+seri.id;
      if(sref[seri._chart_sound]) {
        seri.linkedTo = sref[seri._chart_sound];
        seri.showInLegend= false; 
      } else sref[seri._chart_sound] = seri.id;
      seri.data=[];
      seri.lineWidth = seri.type
      delete seri.type
      delete seri._chart
      delete seri._chart_sound
    } 
    for(let node of noddata) {
      let {x,y,z,name,_chart_sound_series} = node
      if(serii[_chart_sound_series])   series[serii[_chart_sound_series]].data.push({x,y,z,name})
    }
    let html='<!doctype html><html>        <head>            <meta charset="UTF-8">            <title>'+name+'</title>            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><script src="https://code.highcharts.com/highcharts.js"></script><script src="https://code.highcharts.com/highcharts-3d.js"></script>    <script src="https://code.highcharts.com/modules/exporting.js"></script>            <script src="https://code.highcharts.com/modules/export-data.js"></script>            <script src="https://code.highcharts.com/modules/accessibility.js"></script><style>  .highcharts-figure, .highcharts-data-table table {min-width: 310px; max-width: 1000px;margin: 0 auto;}#container {height: 1200px; }.highcharts-credits{display: none !important;}.highcharts-data-table table {font-family: Verdana, sans-serif;border-collapse: collapse;border: 1px solid #EBEBEB;margin: 10px auto;text-align: center;width: 100%;max-width: 500px;}.highcharts-data-table caption {padding: 1em 0;font-size: 1.2em;color: #555;}.highcharts-data-table th {font-weight: 600;padding: 0.5em;}.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {padding: 0.5em;}.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {background: #f8f8f8;}.highcharts-data-table tr:hover {background: #f1f7ff;} </style></head> <body><div align=center style="    width: 100%;    position: absolute;    z-index: 100;    margin: 20px 0 0 0;"> '+name+'</div><div id="container">1234</div></body> <script type="text/javascript">Highcharts.setOptions({colors: Highcharts.getOptions().colors.map(function (color) {         return {                radialGradient: {cx: 0.4,cy: 0.3,r: 0.5 },stops: [[0, color], [1, Highcharts.color(color).brighten(-0.2).get("rgb")]         ]};})}); var chart = new Highcharts.Chart({ chart: {  renderTo: "container",      margin: 150,         type: "scatter3d",           animation: false,            options3d: {                enabled: true,                alpha: 10,                beta: 30,                depth: 250,                viewDistance: 500,                fitToPlot: true,                frame: {                    bottom: { size: 1, color: "rgba(0,0,0,0.02)" },                    back: { size: 1, color: "rgba(0,0,0,0.04)" },              side: { size: 1, color: "rgba(0,0,0,0.06)" }      }            }        },        title: {            text: "",         useHTML: 10        },        subtitle: {            text: ""        },        plotOptions: {          series: {            marker:{symbol :"circle" },            dataLabels: {                    enabled: true,                    useHTML: Highcharts.hasBidiBug,                    format :"{point.name}"  },                tooltip:{             headerFormat: "",    }            },            scatter: {    width: 10,                height: 10,                depth: 10            }        },        yAxis: {            min: '+ymin+',            max: '+ymax+',      title: {                useHTML: Highcharts.hasBidiBug,                text: "'+yaxis+'",                skew3d: true            }        },        xAxis: {            min:'+xmin+',            max: '+xmax+',            gridLineWidth: 1,            title: {              useHTML: Highcharts.hasBidiBug,                text: "'+xaxis+'",                skew3d: true            }        },        zAxis: {            min: '+zmin+',            max: '+zmax+',            showFirstLabel: false,            title: {               useHTML: Highcharts.hasBidiBug,                text: "'+zaxis+'",                skew3d: true            }        },        legend: {             enabled: true        },        series: '+JSON.stringify(series)+' });     (function (H) {        function dragStart(eStart) {            eStart = chart.pointer.normalize(eStart);   var posX = eStart.chartX,                posY = eStart.chartY,                alpha = chart.options.chart.options3d.alpha,                beta = chart.options.chart.options3d.beta,                sensitivity = 5,                 handlers = [];  function drag(e) {e = chart.pointer.normalize(e);   chart.update({                    chart: {                        options3d: {                            alpha: alpha + (e.chartY - posY) / sensitivity,                            beta: beta + (posX - e.chartX) / sensitivity                        }                    }                }, undefined, undefined, false);            }    function unbindAll() {                handlers.forEach(function (unbind) {                    if (unbind) {                        unbind();                    }                });                handlers.length = 0;            }   handlers.push(H.addEvent(document, "mousemove", drag));            handlers.push(H.addEvent(document, "touchmove", drag));             handlers.push(H.addEvent(document, "mouseup", unbindAll));            handlers.push(H.addEvent(document, "touchend", unbindAll));        }        H.addEvent(chart.container, "mousedown", dragStart);        H.addEvent(chart.container, "touchstart", dragStart);    }(Highcharts));  if (window.parent && window.parent.parent){          window.parent.parent.postMessage(["resultsFrame", {            height: document.body.getBoundingClientRect().height,            slug: "u6kmwrn0"          }], "*")        }        window.name = "result"      </script></html>'
   var winPrint = window.open('', '', 'left=0,top=0,width=1000,height=1200,toolbar=0,scrollbars=0,status=0');
   winPrint.document.write(html);
   winPrint.document.close();
   winPrint.focus();
  }
  render = () =>{
    if(this.state.loading && this.state.chart && this.state.chart.length){
      
      this.opener()
     this.state.loading=true;
    }
    this.config = {
      cols: {
        "`id`":{text:"شناسه",dataIndex:"id"},
        //"id as view":{text:"صدا ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Chartview",col:"_chart",icon:"x-fa fa-chart-scatter"},width:60},
        "id as view":{text:"نمایش",dataIndex:"id",renderer:(v)=><a title={v} className="x-fa fa-chart-scatter green" onClick={this.getdata.bind(this)}/>,width:60},
         name :{text:"عنوان",type:"text" ,flex:1},

        xaxis :{text:"محورx",type:"text",width:"80" },
        xmin :{text:"xmin",type:"number" ,width:"80" },
        xmax :{text:"xmax",type:"number",width:"80"  },

        yaxis :{text:"محورy",type:"text",width:"80"  },
        ymin :{text:"ymin",type:"number",width:"80"  },
        ymax :{text:"ymax",type:"number",width:"80"  },

        zaxis :{text:"محورz",type:"text",width:"80"  },
        zmin :{text:"zmin",type:"number",width:"80"  },
        zmax :{text:"zmax",type:"number",width:"80"  },

        "id as target":{text:"صدا ها",dataIndex:"id",btn:"linkkey",exp:"key",options:{path:"/Sound",col:"_chart",icon:"x-fa fa-waveform-path"},width:60},

        id:{text:"حذف",btn:"delbtn" ,width:60}

      },
      from : "chart",
      join : false,
      title: "چارت ها",
      icon: "chart-bar",
      filter:{hidden:true},
      num:1000,
      new:{hidden:false,name:"نمودار جدید"},
      history : this.props.history
    }
    
    return <Table {...this.config} />
  }
}