<script>
      import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    async function loadGraph() {
        const resDatasugarconsume = await fetch("https://sos1920-30.herokuapp.com/api/v2/sugarconsume");
        const resDataEquality = await fetch("api/v2/countries_for_equality_stats");
        let sugarconsume = await resDatasugarconsume.json();
        let equality = await resDataEquality.json();
        console.log(equality);
        let datasugarconsume = sugarconsume.map((d) => {
            let res = {
                name: d.place + " - " + d.year,
                value: parseInt(d["sugarconsume"])
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
                    name: "Consumo de azucar",
                    data: datasugarconsume
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
                text: 'Relación entre el ranking de paz y consumo de azucar'
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
                    zMax: 100,
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
            Gráfica de diferencia entre el consumo de azucar y el ranking de paz.
        </p>
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
        <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
        </div>
        
</main>