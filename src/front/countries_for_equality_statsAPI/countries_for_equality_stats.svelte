<script>
    import {
        onMount
    } from "svelte";
 
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
 
    let countries = [];
    let years = [];
	let newCountry = {
		country: "",
		year:    "" ,
		global_peace_index: "",
		global_peace_ranking: "",
		var: ""
	};
	let actualCountry = "";
	let actualYear = "";
	let longitud = 10;
	let limit = 2;
	let offset = 0;
	let currentPage = 1; 
	let moreData = true; 
	let field = "";
	let value = "";
    onMount(getcountries_for_equality_stats);
	
	
    async function getcountries_for_equality_stats() {
 
        console.log("Fetching countries...");
        const res = await fetch("/api/v2/countries_for_equality_stats?offset="  + longitud * offset + "&limit=" + longitud);
		const resNext = await fetch("/api/v2/countries_for_equality_stats?offset="  + longitud * (offset + 1) + "&limit=" + longitud);
 
        if (res.ok  && resNext.ok) {
            console.log("Ok:");
            const json = await res.json();
			const jsonNext = await resNext.json();
            countries = json;
			
			if (jsonNext.length == 0) {
				moreData = false;
			} else {
				moreData = true;
			}
			
            console.log("Received " + countries.length + " countries.");
        } else {
            console.log("ERROR!");
        }
    }
	function incrementOffset(valor) {
		offset += valor;
		currentPage += valor;
		getcountries_for_equality_stats();
	}
 
  	async function insertCountry() {
        console.log("Inserting new data..." + JSON.stringify(newCountry));
 
        const res = await fetch("/api/v2/countries_for_equality_stats", {
            method: "POST",
            body: JSON.stringify(newCountry),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
		if(res.status == 201){
			window.alert("DATO CREADO");
		}else if(res.status == 409){
			window.alert("YA EXISTE EL DATO");
		}else if(res.status == 400){
			window.alert("DATOS NO VALIDOS (NO SE PUEDE DEJAR VACIO EL PARAMETRO )");
		}
            getcountries_for_equality_stats();
        });
 
    }
    async function deleteCountry(country) {
        const res = await fetch("/api/v2/countries_for_equality_stats/" + country, {
            method: "DELETE"
        }).then(function (res) {
		if(res.status == 200){
			window.alert("DATO BORRADO");
		}else if(res.status == 404){
			window.alert("NO EXISTE EL ELEMENTO PARA ELIMINAR" + country);
		}
            getcountries_for_equality_stats();
		});
		
    }

	async function deleteAllCountries() {
        const res = await fetch("/api/v2/countries_for_equality_stats", {
            method: "DELETE"
        }).then(function (res) {
		if(res.status == 200){
			window.alert("DATOS BORRADOS");
		}else if(res.status == 405){
			window.alert("NO HAY ELEMENTOS PARA ELIMINAR");
		}

            getcountries_for_equality_stats();
        });
    }
	async function loadInitialData() {
        const res = await fetch("/api/v2/countries_for_equality_stats/loadInitialData", {
			method: "GET"
        }).then(function (res) {
		if(res.status == 200){
			window.alert("DATOS INSETADOS");
		}else if(res.status == 409){
			window.alert("HAY DATOS YA CARGADOS,PARA HACER LA CARGA DEBE ELIMINAR LOS DATOS PRIMERO");
		}
            getcountries_for_equality_stats();
		});
	}
    
    async function buscanota(country, year) {
		
	var url = "/api/v2/countries_for_equality_stats";
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
    countries = json;
    if(year =="" && country==""){
        window.alert("INTRODUCE DATOS");
    }else if(countries.length > 0  ){
        
        window.alert("SE HA ENCONTRADO UNO O VARIOS RESULTADOS");
    }else{
       
        window.alert("NO SE HA ENCONTRADO RESULTADOS");
    }

}else{
    console.log("ERROR");
}
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
    <h2 align = center >Tasa de Igualdad</h2>
    <body style="background-color:#082EFF;">
    </body>
    {#await countries}
        Loading datas...
    {:then countries}
        <Table bordered>
            <thead style="color:#00680D">
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
                    <td><input bind:value="{newCountry.country}"></td>
                    <td><input type="number" bind:value="{newCountry.year}"></td>
                    <td><input type="number" bind:value="{newCountry.global_peace_index}"></td>
                    <td><input type="number" bind:value="{newCountry.global_peace_ranking}"></td>
                    <td><input type="number" bind:value="{newCountry.var}"></td>
                    <td> <Button outline  color="primary" on:click={insertCountry}>Añadir</Button> </td>
				</tr>	
                {#each countries as c}
                    <tr>
						<td>
                        	<a href="#/countries_for_equality_stats/{c.country}/{c.year}">{c.country}</a>
						</td>
                        <td>{c.year}</td>
                        <td>{c.global_peace_index}</td>
						<td>{c.global_peace_ranking}</td>
                        <td>{c.var}</td>
                        <td><Button outline color="danger" on:click="{deleteCountry(c.country,c.year)}"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</Button>
						<Button outline color="success" href="#/countries_for_equality_stats/{c.country}/{c.year}"><i class="fa fa-trash" aria-hidden="true"></i> Modificar</Button>
						</td>
						
					</tr>
					

                {/each}
            </tbody>
		</Table>
		{/await}
 	<Pagination style="float:center;" ariaLabel="Cambiar de página">
		<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/countries_for_equality_stats" on:click="{() => incrementOffset(-1)}" />
		</PaginationItem>
		{#if currentPage != 1}
		<PaginationItem>
			<PaginationLink href="#/countries_for_equality_stats" on:click="{() => incrementOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/countries_for_equality_stats" >{currentPage}</PaginationLink>
		</PaginationItem>
		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/countries_for_equality_stats" on:click="{() => incrementOffset(1)}">{currentPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/countries_for_equality_stats" on:click="{() => incrementOffset(1)}"/>
		</PaginationItem>
	</Pagination>
	
	<div style="text-align:center;padding-bottom: 3%;">
		<Button outline  color="primary" on:click={loadInitialData}>Iniciar</Button>
		<Button outline  color="danger" on:click={deleteAllCountries}><i class="fa fa-trash" aria-hidden="true"></i> Eliminar todo</Button>
	</div>
	<Table bordered>
        <tbody>
            <tr>
                <td>
                    <FormGroup style="width:50%;"> 
                    <label >Selecciona el País:</label>
                    <Input type ="text" name="selectCountry" id="selectCountry" bind:value="{actualCountry}">
                       
                    </Input>
                    </FormGroup>
                </td>
                <td>
                    <FormGroup style="width:50%;">
                        <Label > Búsqueda por año </Label>
                        <Input type ="number" name="selectYear" id="selectYear" bind:value="{actualYear}">
                           
                        </Input>
                    </FormGroup>
                </td>
                <td>
                    <div style="text-align:center;padding-bottom: 3%;margin-top: 6%;">
                        <Button outline  color="primary" on:click="{buscanota(actualCountry, actualYear)}" class="button-search" >Buscar</Button>
                        <Button outline  color="secondary" href="javascript:location.reload()">Volver</Button>
                    </div>
                </td>
            </tr>
        </tbody>
    </Table>
 
</main>