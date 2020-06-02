<script>
      import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph() {
        const resDataStarWars = await fetch("https://swapi.dev/api/planets/");
        const resDataEquality = await fetch("api/v2/countries_for_equality_stats");
        let starwar1 = await resDataStarWars.json();
        let starwar2 = starwar1.results;
        let equality = await resDataEquality.json();
        console.log(equality);
        console.log(starwar2.map((d) => {
            let res = {
                name: d.name,
                value: parseInt(d["diameter"])
            };
            return res;
        })
        );
        let dataStarWars = starwar2.map((d) => {
            let res = {
                name: d.name,
                value: parseInt(d["diameter"])
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
                    name: "Diametro de los planetas de star wars",
                    data: dataStarWars
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
                text: 'Relación entre el ranking de paz y el diamentro de los planetas de star wars'
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
            Gráfica de diferencia entre el ranking de paz y el diamentro de los planetas de star wars.
        </p>
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
        <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
        </div>
</main>