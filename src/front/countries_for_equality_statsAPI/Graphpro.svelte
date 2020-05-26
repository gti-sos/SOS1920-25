<script>
async function loadGraph() {
	
	let MyData = [];
	let MyDataGraph = [];
	
	const resData = await fetch("/api/v2/countries_for_equality_stats");
	MyData = await resData.json();
	MyData.forEach( (x) => {
            MyDataGraph.push({name: x.country + " " + x.year, data: [parseInt(x.global_peace_index), parseFloat(x.global_peace_ranking), parseFloat(x.var)], pointPlacement: 'on'});
        });
	
	Highcharts.chart('container', {
		chart: {
			type: 'areaspline'
		},
		title: {
			text: 'Tasa de Igualdad'
		},
		
		xAxis: {
			categories: [
				'Ranking de Igualdad',
				'Tasa de Igualdad',
				'Variación'
			],
			plotBands: [{ 
				from: 4.5,
				to: 6.5,
				color: 'rgba(68, 170, 213, .2)'
			}]
		},
		yAxis: {
			title: {
				text: 'units'
			}
		},
		tooltip: {
			shared: true,
			valueSuffix: ' units'
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
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


<main>
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p class="highcharts-description">
			En la gráica podemos observar la Tasa de Igualdad por Paises, donde se ve: el Ranking de Igualdad, tasa de Igualdad y variacion de Igualdad.
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
		border: 1px solid #EBEBEB;
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