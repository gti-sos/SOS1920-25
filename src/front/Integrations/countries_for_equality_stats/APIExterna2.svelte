<script>
     import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    async function loadGraph() {
        const resDatatvmaze= await fetch("https://tvjan-tvmaze-v1.p.rapidapi.com/schedule?filter=primetime", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tvjan-tvmaze-v1.p.rapidapi.com",
		"x-rapidapi-key": "5acefcc3b4msh4884fd7c1958392p10a3abjsn4fe5ecdb7afa"
	}
});

        const resDataEquality = await fetch("api/v2/countries_for_equality_stats");

        let tvmaze = await resDatatvmaze.json();
        let equality = await resDataEquality.json();

        console.log(equality);
        console.log(tvmaze);
        let datatvmaze = tvmaze.map((d) => {
            let res = {
                name: d.name,
                value: d["runtime"]
            };
            return res;
        });
        let dataEquality = equality.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["global_peace_ranking"]
            };
            return res;
        });
        let dataTotal =
            [
                {
                    name: "Tiempo en escena en tvmaze",
                    data: datatvmaze
                },
                {
                    name: "Ranking de paz",
                    data: dataEquality
                }
            ];
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '60%'
            },
            title: {
                text: 'Relación entre el ranking de paz y el tiempo en escena en tvmaze'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '20%',
                    maxSize: '100%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: dataTotal
        });
    }
    loadGraph();
</script>

<svelte:head>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfica de diferencia entre el ranking de paz y tvjan-tvmaze
        </p>
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
        <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
        </div>
</main>