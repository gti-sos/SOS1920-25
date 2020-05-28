<script>
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
        let MyData_juaarcgon = [];
        let MyData_adrescbar = [];
        let MyData_alemencla = [];
        let MyDataGraph = [];
        const resData_juaarcgon = await fetch("/api/v2/happiness_rate");
        MyData_juaarcgon = await resData_juaarcgon .json();
        const resData_alemencla = await fetch("/api/v2/countries_for_equality_stats");
        MyData_alemencla = await resData_alemencla.json();
        const resData_adrescbar = await fetch("/api/v2/global_competitiveness_index");
        MyData_adrescbar = await resData_adrescbar.json();
        MyData_juaarcgon.forEach( (x) => {
            MyData_alemencla.forEach( (y) => {
                MyData_adrescbar.forEach( (z) => {
                    if (x.country == y.country && x.country == z.country && x.year == y.year && x.year == z.year) {
                        MyDataGraph.push({name: x.country, children: [
                            {name: "Tasa de Felicidad", children: [
                                {name: "Ranking de Felicidad", value: parseInt(x.happinessRanking)},
                                {name: "Tasa de Felicidd", value: parseFloat(x.happinessRate)},
                                {name: "Variacion", value: parse.Float(x.var)}
                            ]},
                            {name: "Igualdad", children: [
                                {name: "Indice de Igualdad", value: parseInt(y.global_peace_index)},
                                {name: "Ranking de Igualdad", value: parseInt(y.global_peace_ranking)},
                                {name: "Variacion", value: parseInt(y.var)}
                            ]},
                            {name: "Indice de Competitividad Global", children: [
                                {name: "Ranking", value: parseInt(z.ranking)},
                                {name: "Indice", value: parseFloat(z.index)},
                                {name: "Variacion", value: parseFloat(z.var)}
                            ]}
                        ]});
                    } else if (x.country == y.country && x.country == z.country && x.year == y.year && x.year == z.year) {
                        MyDataGraph.push({name: x.country, children: [
                            {name: "Tasa de Felicidad", children: [
                                {name: "Ranking de Felicidad", value: parseInt(x.happinessRanking)},
                                {name: "Tasa de Felicidd", value: parseFloat(x.happinessRate)},
                                {name: "Variacion", value: parse.Float(x.var)}
                            ]},
                            {name: "Igualdad", children: [
                                {name: "Indice de Igualdad", value: parseInt(y.global_peace_index)},
                                {name: "Ranking de Igualdad", value: parseInt(y.global_peace_ranking)},
                                {name: "Variacion", value: parseInt(y.var)}
                            ]},
                            {name: "Indice de Competitividad Global", children: [
                                {name: "Ranking", value: parseInt(z.ranking)},
                                {name: "Indice", value: parseFloat(z.index)},
                                {name: "Variacion", value: parseFloat(z.var)}
                            ]}
                        ]});
                    } else if (x.country == y.country && x.country == z.country && x.year == y.year && x.year == z.year) {
                        MyDataGraph.push({name: x.country, children: [
                            {name: "Tasa de Felicidad", children: [
                                {name: "Ranking de Felicidad", value: parseInt(x.happinessRanking)},
                                {name: "Tasa de Felicidd", value: parseFloat(x.happinessRate)},
                                {name: "Variacion", value: parse.Float(x.var)}
                            ]},
                            {name: "Igualdad", children: [
                                {name: "Indice de Igualdad", value: parseInt(y.global_peace_index)},
                                {name: "Ranking de Igualdad", value: parseInt(y.global_peace_ranking)},
                                {name: "Variacion", value: parseInt(y.var)}
                            ]},
                            {name: "Indice de Competitividad Global", children: [
                                {name: "Ranking", value: parseInt(z.ranking)},
                                {name: "Indice", value: parseFloat(z.index)},
                                {name: "Variacion", value: parseFloat(z.var)}
                            ]}
                        ]});
                    } else if (x.country == y.country && x.country == z.country && x.year == y.year && x.year == z.year) {
                        MyDataGraph.push({name: x.country, children: [
                            {name: "Tasa de Felicidad", children: [
                                {name: "Ranking de Felicidad", value: parseInt(x.happinessRanking)},
                                {name: "Tasa de Felicidd", value: parseFloat(x.happinessRate)},
                                {name: "Variacion", value: parse.Float(x.var)}
                            ]},
                            {name: "Igualdad", children: [
                                {name: "Indice de Igualdad", value: parseInt(y.global_peace_index)},
                                {name: "Ranking de Igualdad", value: parseInt(y.global_peace_ranking)},
                                {name: "Variacion", value: parseInt(y.var)}
                            ]},
                            {name: "Indice de Competitividad Global", children: [
                                {name: "Ranking", value: parseInt(z.ranking)},
                                {name: "Indice", value: parseFloat(z.index)},
                                {name: "Variacion", value: parseFloat(z.var)}
                            ]}
                        ]});
                    } else if (x.country == y.country && x.country == z.country && x.year == y.year && x.year == z.year) {
                        MyDataGraph.push({name: x.country, children: [
                            {name: "Tasa de Felicidad", children: [
                                {name: "Ranking de Felicidad", value: parseInt(x.happinessRanking)},
                                {name: "Tasa de Felicidd", value: parseFloat(x.happinessRate)},
                                {name: "Variacion", value: parse.Float(x.var)}
                            ]},
                            {name: "Igualdad", children: [
                                {name: "Indice de Igualdad", value: parseInt(y.global_peace_index)},
                                {name: "Ranking de Igualdad", value: parseInt(y.global_peace_ranking)},
                                {name: "Variacion", value: parseInt(y.var)}
                            ]},
                            {name: "Indice de Competitividad Global", children: [
                                {name: "Ranking", value: parseInt(z.ranking)},
                                {name: "Indice", value: parseFloat(z.index)},
                                {name: "Variacion", value: parseFloat(z.var)}
                            ]}
                        ]});
                    } else if (x.country == y.country && x.country == z.country && x.year == y.year && x.year == z.year) {
                        MyDataGraph.push({name: x.country, children: [
                            {name: "Tasa de Felicidad", children: [
                                {name: "Ranking de Felicidad", value: parseInt(x.happinessRanking)},
                                {name: "Tasa de Felicidd", value: parseFloat(x.happinessRate)},
                                {name: "Variacion", value: parse.Float(x.var)}
                            ]},
                            {name: "Igualdad", children: [
                                {name: "Indice de Igualdad", value: parseInt(y.global_peace_index)},
                                {name: "Ranking de Igualdad", value: parseInt(y.global_peace_ranking)},
                                {name: "Variacion", value: parseInt(y.var)}
                            ]},
                            {name: "Indice de Competitividad Global", children: [
                                {name: "Ranking", value: parseInt(z.ranking)},
                                {name: "Indice", value: parseFloat(z.index)},
                                {name: "Variacion", value: parseFloat(z.var)}
                            ]}
                        ]});
                    } else if (x.country == y.country && x.country == z.country && x.year == y.year && x.year == z.year) {
                        MyDataGraph.push({name: x.country, children: [
                            {name: "Tasa de Felicidad", children: [
                                {name: "Ranking de Felicidad", value: parseInt(x.happinessRanking)},
                                {name: "Tasa de Felicidd", value: parseFloat(x.happinessRate)},
                                {name: "Variacion", value: parse.Float(x.var)}
                            ]},
                            {name: "Igualdad", children: [
                                {name: "Indice de Igualdad", value: parseInt(y.global_peace_index)},
                                {name: "Ranking de Igualdad", value: parseInt(y.global_peace_ranking)},
                                {name: "Variacion", value: parseInt(y.var)}
                            ]},
                            {name: "Indice de Competitividad Global", children: [
                                {name: "Ranking", value: parseInt(z.ranking)},
                                {name: "Indice", value: parseFloat(z.index)},
                                {name: "Variacion", value: parseFloat(z.var)}
                            ]}
                        ]});
                    } else if (x.country == y.country && x.country == z.country && x.year == y.year && x.year == z.year) {
                        MyDataGraph.push({name: x.country, children: [
                            {name: "Tasa de Felicidad", children: [
                                {name: "Ranking de Felicidad", value: parseInt(x.happinessRanking)},
                                {name: "Tasa de Felicidd", value: parseFloat(x.happinessRate)},
                                {name: "Variacion", value: parse.Float(x.var)}
                            ]},
                            {name: "Igualdad", children: [
                                {name: "Indice de Igualdad", value: parseInt(y.global_peace_index)},
                                {name: "Ranking de Igualdad", value: parseInt(y.global_peace_ranking)},
                                {name: "Variacion", value: parseInt(y.var)}
                            ]},
                            {name: "Indice de Competitividad Global", children: [
                                {name: "Ranking", value: parseInt(z.ranking)},
                                {name: "Indice", value: parseFloat(z.index)},
                                {name: "Variacion", value: parseFloat(z.var)}
                            ]}
                        ]});
                    }
                })
            });
        });
        am4core.useTheme(am4themes_kelly);
        am4core.useTheme(am4themes_animated);
        // Themes end
        var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
        var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
        chart.data = [{
            name: "Europa",
            children: MyDataGraph
        }];
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.children = "children";
        networkSeries.nodes.template.tooltipText = "{name}:{value}";
        networkSeries.nodes.template.fillOpacity = 1;
        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 10;
        networkSeries.links.template.strokeWidth = 1;
        var hoverState = networkSeries.links.template.states.create("hover");
        hoverState.properties.strokeWidth = 3;
        hoverState.properties.strokeOpacity = 1;
        networkSeries.nodes.template.events.on("over", function(event) {
            event.target.dataItem.childLinks.each(function(link) {
                link.isHover = true;
            })
            if (event.target.dataItem.parentLink) {
                event.target.dataItem.parentLink.isHover = true;
            }
        })
        networkSeries.nodes.template.events.on("out", function(event) {
            event.target.dataItem.childLinks.each(function(link) {
                link.isHover = false;
            })
            if (event.target.dataItem.parentLink) {
                event.target.dataItem.parentLink.isHover = false;
            }
        })
    }
loadGraph();
</script>

<svelte:head>

</svelte:head>

<main>
    <h2 style="text-align: center;">Analisis de todos los datos del grupo SOS1920-25</h2>

    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    <div id="chartdiv"></div>

</main>

<style>
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    #chartdiv {
        width: 100%;
        height:550px;
        max-width:100%;
    }
</style>