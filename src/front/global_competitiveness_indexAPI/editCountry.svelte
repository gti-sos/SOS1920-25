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
	let updatedRanking = 0;
	let updatedIndex = 0.0;
	let updatedVar = 0.0;
    let SuccessMsg = "";

    onMount(getCountries_adrescbar);

    async function getCountries_adrescbar() {

        const res = await fetch("/api/v2/global_competitiveness_index/" + params.country + "/" + params.year);
		
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            countries = json;
            updatedCountry = params.country;
            updatedYear = parseInt(params.year);
            updatedRanking = countries.ranking;
			updatedIndex = countries.index;
            updatedVar = countries.var;
            console.log("Received countries.");
        } else if(res.status == 404){
            window.alert("El dato: " + params.country + " " + params.year + " no existe");
        }
    }


    async function updateCountry() {

        console.log("Updating countries..." + JSON.stringify(params.countriesCountry));
		
        const res = await fetch("/api/v2/global_competitiveness_index/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                ranking: updatedRanking,
				index: updatedIndex,
				var: updatedVar
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getCountries_adrescbar();
            if(res.ok){
                SuccessMsg = res.status + ": " + res.statusText;
                console.log("OK!" + SuccessMsg);

            }else if(res.status == 400){
                window.alert("Datos no son válidos");
            }
        });



    }
</script>

<body style="background-color:#082EFF;">
</body>
<main>
    <h5>Editando datos de <strong>{params.country}</strong> en el año <strong>{params.year}</strong></h5>
    {#await countries}
        Loading countries...
    {:then countries}
        <Table bordered>
            <thead>
                <tr style="color:#00680D">
                    <th>País</th>
                	<th>Año</th>
                	<th>Posición</th>
                	<th>Índice</th>
					<th>Variación</th>
					<th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{params.country}</td>
					<td>{params.year}</td>
                    <td><input type="number" bind:value="{updatedRanking}"></td>
                    <td><input type="number" bind:value="{updatedIndex}"></td>
					<td><input type="number" bind:value="{updatedVar}"></td>
                    <td> <Button outline  color="success" on:click={updateCountry}>Actualizar</Button></td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if SuccessMsg}
        <p style="color: green">{SuccessMsg}. País actualizado con éxito</p>
    {/if}
    <Button outline color="danger" on:click="{pop}">Volver</Button>
</main>
