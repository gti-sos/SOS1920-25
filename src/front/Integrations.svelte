<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
    <h2 style="text-align: center;">Integracion de APIs</h2>
    <br><br>   

    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/happiness_rate'" style="margin-left: 6.75%; width: 25%;">Tasa de Felicidad</button>
	<button type="button" class="btn btn-secondary" onclick="window.location.href='#/global_competitiveness_index'" style="width: 25%;">Indice de Competitividad Global</button>
	<button type="button" class="btn btn-secondary" onclick="window.location.href='#/countries_for_equality_stats'" style= "width: 25%;">Igualdad</button><br><br>

    <Button outline color="secondary"  on:click="{pop}">Volver</Button>

</main>