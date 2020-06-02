<body style="background-color:#082EFF;">
</body>
<div align = "center">
<canvas  id="cvs" width="800" height="278" style="border: 1px solid #eee">
</canvas>
</div>
<script>
    import { onMount } from 'svelte';
    async function loadGraph() {
        
        let MyData = [];
        let Mylabels = [];
        let Myranking = [];

        const resData = await fetch("/api/v2/global_competitiveness_index");
        MyData = await resData.json();
        MyData.forEach( (x) => {
            Mylabels.push(x.country);
        });
        MyData.forEach( (x) => {
            Myranking.push(x.ranking);
        });
        var labels = Mylabels;

        new RGraph.Pie({
            id: 'cvs',
            data: Myranking,
            options: {
                shadow: true,
                shadowOffsetx: 0,
                shadowOffsety: 5,
                shadowColor: '#aaa',
                variant: 'donut3d',
                labels: labels,
                labelsSticksLength: 15,
                labelsSticksLinewidth: 2,
                textAccessible: false,
                colorsStroke: 'transparent'
            }
        }).draw().responsive([
            { maxWidth: null, width: 800, height: 278, options: { radius: 100, labelsList: true, labels: labels, title: '', tooltips: null } }
        ]);
    }
    onMount(loadGraph);
</script>

<main>
    <div align = "center" id="cvs">Aqui vemos la posición de los países en el ranking global. Menor tamaño equivale a mejor posición en el ranking</div>
</main>