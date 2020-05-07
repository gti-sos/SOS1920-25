<script>
    import {
        onMount
    } from "svelte";
 
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";
 
	let countries_adrescbar = [];
	let newCountry = {
		country: "",
		year: "",
		ranking: "",
		index: "",
		var: ""
	};

	let numCountries = 10;  
	let offset = 0;
	let currentPage = 1; 
	let moreData = true;
	let searchCountry = "";
	let searchYear = ""; 
	let country = [];
    let year = [];

	onMount(getCountries_adrescbar);

	async function getCountries_adrescbar() {

		const res = await fetch("/api/v2/global_competitiveness_index?offset=" + numCountries * offset + "&limit=" + numCountries);
		const resNext = await fetch("/api/v2/global_competitiveness_index?offset="  + numCountries * (offset + 1) + "&limit=" + numCountries);

		if (res.ok && resNext.ok) {
			const json = await res.json();
			const jsonNext = await resNext.json();
			countries_adrescbar = json;
			if (jsonNext.length == 0) {
				moreData = false;
			} else {
				moreData = true;
			}
			console.log("Received " + countries_adrescbar.length + " countries_adrescbar.");
		} else {
			console.log("ERROR!");
		}
	}

	function incrementOffset(val) {
		offset += val;
		currentPage += val;
		getCountries_adrescbar();
	}

	async function search(country, year) {

	var url = "/api/v2/global_competitiveness_index";

		if (country != "" && year != "") {
			url = url + "?year=" + year + "&country=" + country;
		}else if (country != "" && year == "") {
			url = url + "?country=" + country;
		}else if (country == "" && year != "") {
			url = url + "?year=" + year;
		}
		const res = await fetch(url);

		if (res.ok) {

		const json = await res.json();
		countries_adrescbar = json;

		if (country == "" && year == "") {
			window.alert("Introduce datos para realizar la busqueda");
		}else if(countries_adrescbar.length > 0){
			window.alert("Datos encontrados");
		}else{
			window.alert("No hay datos que cumplan la busqueda");
		}
		}
	}
	
	async function insertCountries_adrescbar() {

		const res = await fetch("/api/v2/global_competitiveness_index", {
			method: "POST",
			body: JSON.stringify(newCountry),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
			
			if(res.status == 201){
            	window.alert("Datos añadidos");
        	}else if(res.status == 409){
            	window.alert("Estos elementos ya estan registrados");
        	}
			getCountries_adrescbar();
		});

	}
	async function deleteCountries_adrescbar(country) {
		const res = await fetch("/api/v2/global_competitiveness_index/" + country, {
			method: "DELETE"
		}).then(function (res) {

			if(res.status == 200){
            	window.alert("Dato borrado");
        	}else if(res.status == 404){
            	window.alert("No existen ese dato");
       		}
			getCountries_adrescbar();
		});
	}

	async function deleteAllCountries_adrescbar() {
        const res = await fetch("/api/v2/global_competitiveness_index/", {
            method: "DELETE"
        }).then(function (res) {

			if(res.status == 200){
            	window.alert("Datos borrados");
        	}else if(res.status == 405){
            	window.alert("No existen datos que borrar");
        	}
           getCountries_adrescbar();
        });
	}

	async function loadInitialData() {
        const res = await fetch("/api/v2/global_competitiveness_index/loadInitialData", {
            method: "GET"
        }).then(function (res) {

        	if(res.status == 409){
           		window.alert("Datos ya registrados");
        	}else{
				window.alert("Datos añadidos");
			}
            getCountries_adrescbar();
        });
	}
	
</script>

<style type='text/css'>
 
tr:nth-child(odd) {
    background-color:#f2f2f2;
}
tr:nth-child(even) {
    background-color:#fbfbfb;
}

</style>
<body style="background-color:#082EFF;">
	</body>

<main>
	<h2 align = center >Índice de Competitividad Global</h2>
	<body style="background-color:#082EFF;">
	</body>
	{#await countries_adrescbar}
		Loading countries...
	{:then countries_adrescbar}
		<Table bordered>
			<thead style="color:#00680D">
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Posición</th>
					<th>Índice</th>
					<th>Variación</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{newCountry.country}"></td>
					<td><input type="number" bind:value="{newCountry.year}"></td>
					<td><input type="number" bind:value="{newCountry.ranking}"></td>
					<td><input type="number" bind:value="{newCountry.index}"></td>
					<td><input type="number" bind:value="{newCountry.var}"></td>
					<td><Button outline  color="primary" on:click={insertCountries_adrescbar}>Añadir</Button> </td>
				</tr>

				{#each countries_adrescbar as country_adrescbar}
					<tr>
						<td>
							<a href="#/global_competitiveness_index/{country_adrescbar.country}/{country_adrescbar.year}">{country_adrescbar.country}</a>
						</td>
						<td>{country_adrescbar.year}</td>
						<td>{country_adrescbar.ranking}</td>
						<td>{country_adrescbar.index}</td>
						<td>{country_adrescbar.var}</td>
						<td>
							<Button outline color="danger" on:click="{deleteCountries_adrescbar(country_adrescbar.country)}">Borrar</Button>
							<Button outline color="success" href="#/global_competitiveness_index/{country_adrescbar.country}/{country_adrescbar.year}">Editar</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}

	<Pagination style="float:center;" ariaLabel="Cambiar de página">

        <PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/global_competitiveness_index" on:click="{() => incrementOffset(-1)}" />
        </PaginationItem>

        {#if currentPage != 1}
        <PaginationItem>
            <PaginationLink href="#/global_competitiveness_index" on:click="{() => incrementOffset(-1)}" >{currentPage - 1}</PaginationLink>
        </PaginationItem>
        {/if}
        <PaginationItem active>
            <PaginationLink href="#/global_competitiveness_index" >{currentPage}</PaginationLink>
        </PaginationItem>

        {#if moreData}
        <PaginationItem >
            <PaginationLink href="#/global_competitiveness_index" on:click="{() => incrementOffset(1)}">{currentPage + 1}</PaginationLink>
        </PaginationItem>
        {/if}

        <PaginationItem class="{moreData ? '' : 'disabled'}">
          <PaginationLink next href="#/global_competitiveness_index" on:click="{() => incrementOffset(1)}"/>
        </PaginationItem>

    </Pagination>


	<div style="text-align:center;padding-bottom: 3%;">
		<Button outline  color="primary" on:click={loadInitialData}>Iniciar</Button>
		<Button outline  color="danger" on:click={deleteAllCountries_adrescbar}>Borrar todo</Button>
	</div>

	<h5><strong>Busquedas:</strong></h5>

	<Table bordered>
        <tbody>
            <tr>
                <td>
                    <FormGroup style="width:50%;"> 
                    <label >Introduzca un País:</label>
                    <Input type ="text" name="selectCountry" id="selectCountry" bind:value="{searchCountry}">

                    </Input>
                    </FormGroup>
                </td>
                <td>
                    <FormGroup style="width:50%;">
                        <Label > Introduzca un año </Label>
                        <Input type ="number" name="selectYear" id="selectYear" bind:value="{searchYear}">

                        </Input>
                    </FormGroup>
                </td>
                <td>
                    <div style="text-align:center;padding-bottom: 3%;margin-top: 6%;">
                        <Button outline  color="primary" on:click="{search(searchCountry,searchYear)}" class="button-search" >Buscar</Button>
                        <Button outline  color="secondary" href="javascript:location.reload()">Volver</Button>
                    </div>
                </td>
            </tr>
        </tbody>
    </Table>
</main>