<body style="background-color:#082EFF;">
</body>

<script>
      import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    async function loadGraph() {
        const resMyData = await fetch("/api/v2/global_competitiveness_index");
        const resDataPost = await fetch("https://allies-postcoder.p.rapidapi.com/PCW45-12345-12345-1234X/addressgeo/uk/NR14%25207PZ?lines=3", {
	        "method": "GET",
	        "headers": {
		    "x-rapidapi-host": "allies-postcoder.p.rapidapi.com",
		    "x-rapidapi-key": "fe78d643b3msh07af37f2e92bccdp1ca7adjsn9ea37f0056ed"
	        }
        });
        let MyData = await resMyData.json();
        let PostData = await resDataPost.json();

        let global_competitiveness_index = MyData.map((x) => {
            let res = {
                name: x.country,
                value: x["ranking"]
            };
            return res;
        });

        let Post = PostData.map((x) => {
            let res = {
                name: x.addressline1,
                value: parseInt(x.grideasting)
            };
            return res;
        });
        let dataTotal =
            [
                {
                    name: "Índice de competitividad Global",
                    data: global_competitiveness_index
                },
                {
                    name: "Direccion de codigo postal",
                    data: Post
                }
            ];

            Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '60%'
            },
            title: {
                text: 'Aqui mostramos la integración de una API que muestra la direccion de codigos postales y lo comparamos con el Índice de Competitividad Global'
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


<main>

    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
        <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
        </div>
</main>