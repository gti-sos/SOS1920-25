<script>
    import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let countries = {};
    let updatedCountry = "";
    let updatedYear = 0;
	let updatedGlobal_peace_index = 0.0;
	let updatedGlobal_peace_ranking = 0.0;
	let updatedVar = 0.0;
    let MenExito = "";

    onMount(getCountry);

    async function getCountry() {

        console.log("Fetching countries...");
        const res = await fetch("/api/v2/countries_for_equality_stats/" + params.country + "/" + params.year);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            countries = json;
            updatedCountry = params.country;
            updatedYear = parseInt(params.year);
            updatedGlobal_peace_index = countries.global_peace_index;
            updatedGlobal_peace_ranking = countries.global_peace_ranking;
            updatedVar = countries.var;
            console.log("Received countries.");
        } else if(res.status == 404){
            window.alert("El dato: " + params.country + " " + params.year + " no existe");
        }
    }
    
  
		

    async function updatecountries_for_equality_stats() {
		
        const res = await fetch("/api/v2/countries_for_equality_stats/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                global_peace_index: updatedGlobal_peace_index,
				global_peace_ranking: updatedGlobal_peace_ranking,
			    var: updatedVar
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
          getCountry();
            if(res.ok){	
				MenExito = res.status + ": " + res.statusText;
				console.log("OK!" + MenExito);

			}else if(res.status == 400){
				window.alert("Datos no son válidos");
			} 
        });



    }
</script>
<main>
    <h3>Editar el dato: <strong>{params.country} {params.year}</strong></h3>
    {#await countries}
        Loading datas...
    {:then countries}
        <Table bordered>
            <thead>
                <tr>
                  	<th>Pais</th>
                	<th>Año</th>
                	<th>Ranking de Paz</th>
					<th>Tasa de Paz</th>
					<th>Variación</th>
					<th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{params.country}</td>
					<td>{params.year}</td>
                    <td><input type="number" bind:value="{updatedGlobal_peace_index}"></td>
                    <td><input type="number" bind:value="{updatedGlobal_peace_ranking}"></td>
					<td><input type="number" bind:value="{updatedVar}"></td>
                    <td> <Button outline  color="success" on:click={updatecountries_for_equality_stats}>Actualizar</Button></td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if MenExito}
        <p style="color: green">{MenExito}. Dato actualizado con éxito</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Volver</Button>
</main>