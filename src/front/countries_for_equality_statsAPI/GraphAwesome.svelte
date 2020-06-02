<canvas id="scatterChart" width="3" height="1"></canvas>
<script>
    import { onMount } from 'svelte';
    async function loadGraph() {
        const resData = await fetch("/api/v2/countries_for_equality_stats");
        let MyData = await resData.json();
        var ctx = document.getElementById('scatterChart');

        let Country = MyData.map((d) => { return d.country; });
        let Year = MyData.map((d) => { return d.year; });
        let global_peace_index = MyData.map((d) => { return d.global_peace_index; });
        let global_peace_ranking = MyData.map((d) => { return d.global_peace_ranking; });
        let var1 = MyData.map((d) => { return d.var; });

        var tam = Country.lenght;
        var allData = [];
        var allData1 = [];
        var allData2 = [];
        var inteo = [];

        for (var i = 0; i < tam; i++) {
            inteo.push({
                labels: Country[i]
            });
        }

        /* new Chart(ctx, {
             data: var1,
             labels: inteo,
             type: 'polarArea',
             options: animation.animateRotate
         });*/

        for (var i = 0; i < tam; i++) {
            inteo.push({
                label: Country[i]
            });
        }
        var tam = Country.length;

        for (var i = 0; i < tam; i++) {
            allData.push({
                y: Year[i],
                x: global_peace_index[i]
            });
        }
        for (var i = 0; i < tam; i++) {
            allData1.push({
                y: Year[i],
                x: global_peace_ranking[i]
            });
        }
        for (var i = 0; i < tam; i++) {
            allData2.push({
                y: Year[i],
                x: var1[i]
            });
        }
        var scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {

                datasets: [
                    {
                        label: "AÑOS POR INDICE",
                        backgroundColor: 'rgba(50, 50, 150, 1)',
                        pointBackgroundColor: 'rgba(50, 50, 150, 1)',
                        data: allData
                    },  
                    {
                        label: "AÑOS POR RANKING",
                        pointBackgroundColor: 'rgba(150, 50, 50, 1)',
                        backgroundColor: 'rgba(150, 50, 50, 1)',
                        data: allData1

                    }, {
                        label: "AÑOS POR VARIACION",
                        pointBackgroundColor: 'rgba(50, 150, 50, 1)',
                        backgroundColor: 'rgba(50, 150, 50, 1)',
                        data: allData2

                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        });
    }
    onMount(loadGraph);
</script>