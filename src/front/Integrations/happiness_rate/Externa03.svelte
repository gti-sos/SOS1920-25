<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    let Data = [];
    let Pokemon = [];
    async function loadGraph() {
        const resPokemon = await fetch("https://pokemon-go1.p.rapidapi.com/pokemon_stats.json", {
            "method": "GET",
	        "headers": {
		        "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
		        "x-rapidapi-key": "7ba6091b4amsh6731b2f89b0cdc6p106e3fjsnbd534659f6b0"
	        }
        });

        const resDataHappiness_rate = await fetch("/api/v2/happiness_rate");
        let Happy = await resDataHappiness_rate.json();
        
        let dataHappiness = Happy.map((x) => {
            let res = {
                name: x.country + " - " + x.year,
                value: x["happinessRanking"]
            };
            return res;
        });
        Pokemon = await resPokemon.json();
        console.log(Pokemon);
        Pokemon.forEach((x) => {
            let pokemon = {
                'name': x.pokemon_name + " " + x.form,
		        'value': x.base_attack
            };
           
            Data.push(pokemon);

        }); 
       
        let dataTotal =
            [
                {
                    name: "Ranking de Felicidad",
                    data: dataHappiness
                },
                {
                    name: "Ataque por Pokemon segun su naturaleza",
                    data: Data
                }
            ];
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '40%'
            },
            title: {
                text: 'Relación entre el ataque por Pokemon segun su naturaleza y el Ranking de Felicidad'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
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
        <p class="highcharts-description" align = "center">
            Gráfica que muestra el ranking de felicidad y el ataque por Pokemon segun su naturaleza.
        </p>
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
    <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
    </div>

</main>