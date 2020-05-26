<script>
async function loadGraph() {
	
	let MyData = [];
    let MyDataGraph = [];
	
	const resData = await fetch("/api/v2/global_competitiveness_index");
	MyData = await resData.json();
	MyData.forEach( (x) => {
            MyDataGraph.push({name: x.country + " " + x.year , data: 
            [parseInt(x.ranking), parseFloat(x.index), parseFloat(x.var)]});
        });
	
        Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Índice de competitividad global'
    },

    xAxis: {
        categories: [
            "ranking",
            "index",
            "var"
        ],
        crosshair: true
    },
    yAxis: {
        min: -2,
        max: 85,
        title: {
				text: 'Valor'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.1,
            borderWidth: 0
        }
    },
    series: MyDataGraph
});
}
</script>

<svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
	
</svelte:head>

<body style="background-color:#082EFF;">
</body>

<main>

	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			En el gráfico podemos observar el índice de competitividad entre paises europeos
		</p>
	</figure>

</main>
<style>
	#container {
		height: 400px;

	}

	.highcharts-figure, .highcharts-data-table table {
		min-width: 310px; 
		max-width: 800px;
		margin: 1em auto;
	}
    
	.highcharts-data-table table {
		font-family: Verdana, sans-serif;
		border-collapse: collapse;
		border: 1px solid rgb(235, 235, 235);
		margin: 10px auto;
		text-align: center;
		width: 100%;
		max-width: 500px;
	}
	.highcharts-data-table caption {
		padding: 1em 0;
		font-size: 1.2em;
		color: #555;
	}
	.highcharts-data-table th {
		font-weight: 600;
		padding: 0.5em;
	}
	.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
		padding: 0.5em;
	}
	.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
		background: #f8f8f8;
	}
	.highcharts-data-table tr:hover {
		background: #f1f7ff;
	}


</style>