<script>
      import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    async function loadGraph() {
        const datos_su_base = await fetch("https://sos1920-12.herokuapp.com/api/v2/school-dropouts");
        const datos_mi_base = await fetch("/api/v2/countries_for_equality_stats");
        let school_dropouts = await datos_su_base.json();
        let equality_stats = await datos_mi_base.json();
        
       
        let datoequality_stats = equality_stats.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["global_peace_ranking"]
            };
            return res;
        });
        let dataschool_dropouts = school_dropouts.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["sd_all"]
            };
            return res;
        });
        let dataTotal =
            [
                {
                    name: "Ranking",
                    data: datoequality_stats
                },
                {
                    name: "Número total de abandonos en las escuelas",
                    data: dataschool_dropouts
                }
            ];
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '60%'
            },
            title: {
                text: 'Relación entre número total de personas que dejan el colegio y el ranking de igualdad'
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
            Gráfica que muestra las diferencias entre entre número total de personas que dejan el colegio y el ranking de igualdad.
        </p>
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
        <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
        </div>
</main>