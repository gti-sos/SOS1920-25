<script>
	import Router from 'svelte-spa-router';
	//Juan Manuel
	import CountriesTable from './happiness_rateAPI/CountriesTable.svelte';
	import EditCountry from './happiness_rateAPI/EditCountry.svelte';
	//Adrian
	import countries_adrescbar from './global_competitiveness_indexAPI/countries_adrescbar.svelte';
	import editCountry1 from './global_competitiveness_indexAPI/editCountry.svelte';
	// Alejandro
	import countries_for_equality_stats from './countries_for_equality_statsAPI/countries_for_equality_stats.svelte';
    import EditCountry2 from './countries_for_equality_statsAPI/EditCountry.svelte';
	
	import NotFound from './NotFound.svelte';

	import Home from './Home.svelte';


	const routes = {
		"/": Home,
		"/happiness_rate": CountriesTable,
		"/happiness_rate/:country/:year": EditCountry,
		"/global_competitiveness_index": countries_adrescbar,
        "/global_competitiveness_index/:country/:year": editCountry1,
		"/countries_for_equality_stats": countries_for_equality_stats,
		"/countries_for_equality_stats/:country/:year": EditCountry2,
		
		"*": NotFound
	};
</script>


<main>
	<Router {routes} />
</main>