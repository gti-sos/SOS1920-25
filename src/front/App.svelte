<script>
	import Router from 'svelte-spa-router';
	import Integrations from './Integrations/IntegrationsHome.svelte';
	import Analytics from './Analytics.svelte';
	//Juan Manuel
	import CountriesTable from './happiness_rateAPI/CountriesTable.svelte';
	import EditCountry from './happiness_rateAPI/EditCountry.svelte';
	import Graph from './happiness_rateAPI/Graph.svelte';
	import GraphA from './happiness_rateAPI/GraphAwesome.svelte';
	import Grupo05 from './Integrations/happiness_rate/Grupo05.svelte';
	import Grupo09 from './Integrations/happiness_rate/Grupo09.svelte';
	import Grupo12 from './Integrations/happiness_rate/Grupo12.svelte';
	import Grupo22 from './Integrations/happiness_rate/Grupo22.svelte';
	import Externa01 from './Integrations/happiness_rate/Externa01.svelte';
	import Externa02 from './Integrations/happiness_rate/Externa02.svelte';
	import Externa03 from './Integrations/happiness_rate/Externa03.svelte';
	import Externa04 from './Integrations/happiness_rate/Externa04.svelte';

	//Adrian
	import countries_adrescbar from './global_competitiveness_indexAPI/countries_adrescbar.svelte';
	import editCountry1 from './global_competitiveness_indexAPI/editCountry.svelte';
	import Graph_adrescbar from './global_competitiveness_indexAPI/Graph_adrescbar.svelte';
	import Awesome_Graph_adrescbar from './global_competitiveness_indexAPI/Awesome_Graph.svelte';
	import API_22 from './Integrations/global_competitiveness_index/22.svelte';
    import API_10 from './Integrations/global_competitiveness_index/10.svelte';
    import Coins from './Integrations/global_competitiveness_index/coins.svelte';
    import Hearthstone from './Integrations/global_competitiveness_index/Hearthstone.svelte';
    import City from './Integrations/global_competitiveness_index/City.svelte';
    import proxy_latency from './Integrations/global_competitiveness_index/proxy_latency.svelte';
    import Soccer_games from './Integrations/global_competitiveness_index/soccer_games.svelte';
    import Investors from './Integrations/global_competitiveness_index/Investors.svelte';
	import Name from './Integrations/global_competitiveness_index/name.svelte';
	import Post_code from './Integrations/global_competitiveness_index/Post_code.svelte';
	// Alejandro
	import countries_for_equality_stats from './countries_for_equality_statsAPI/countries_for_equality_stats.svelte';
    import EditCountry2 from './countries_for_equality_statsAPI/EditCountry.svelte';
	import Graphpro from './countries_for_equality_statsAPI/Graphpro.svelte';
	import Graph2 from './countries_for_equality_statsAPI/GraphAwesome.svelte';
	import G22 from './Integrations/countries_for_equality_stats/22.svelte';
	import G12 from './Integrations/countries_for_equality_stats/12.svelte';
	import G30 from './Integrations/countries_for_equality_stats/30.svelte';
	import E01 from './Integrations/countries_for_equality_stats/APIExterna1.svelte';
	import E02 from './Integrations/countries_for_equality_stats/APIExterna2.svelte';
	import E03 from './Integrations/countries_for_equality_stats/APIExterna3.svelte';
	import E04 from './Integrations/countries_for_equality_stats/APIExterna4.svelte';
	import E05 from './Integrations/countries_for_equality_stats/APIExterna5.svelte';
	import E06 from './Integrations/countries_for_equality_stats/APIExterna6.svelte';
	import E07 from './Integrations/countries_for_equality_stats/APIExterna7.svelte';


	import NotFound from './NotFound.svelte';


	import Home from './Home.svelte';

	

	const routes = {
		"/": Home,
		"/integrations": Integrations,
		"/analytics": Analytics,

		"/happiness_rate": CountriesTable,
		"/happiness_rate/:country/:year": EditCountry,
		"/happiness_rate/graph": Graph,
		"/happiness_rate/awesomegraph": GraphA,
		"/integrations/Grupo05": Grupo05,
		"/integrations/Grupo09": Grupo09,
		"/integrations/Grupo12": Grupo12,
		"/integrations/Grupo22": Grupo22,
		"/integrations/Externa01": Externa01,
		"/integrations/Externa02": Externa02,
		"/integrations/Externa03": Externa03,
		"/integrations/Externa04": Externa04,
	

		"/global_competitiveness_index": countries_adrescbar,
        "/global_competitiveness_index/:country/:year": editCountry1,
		"/global_competitiveness_index/graph": Graph_adrescbar,
		"/global_competitiveness_index/Awesome_Graph": Awesome_Graph_adrescbar,
        "/integrations/api-22": API_22,
        "/integrations/api-10": API_10,
        "/integrations/coins": Coins,
        "/integrations/Hearthstone": Hearthstone,
        "/integrations/City": City,
        "/integrations/proxy_latency": proxy_latency,
        "/integrations/soccer_games": Soccer_games,
        "/integrations/Investors": Investors,
		"/integrations/name": Name,
		"/integrations/Post_code": Post_code,

		"/countries_for_equality_stats": countries_for_equality_stats,
		"/countries_for_equality_stats/:country/:year": EditCountry2,
		"/countries_for_equality_stats/graph": Graphpro,
		"/countries_for_equality_stats/graphawesome": Graph2,
		"/integrations/G22": G22,
		"/integrations/G12": G12,
		"/integrations/G30": G30,
		"/integrations/E01": E01,
		"/integrations/E02": E02,
		"/integrations/E03": E03,
		"/integrations/E04": E04,
		"/integrations/E05": E05,
		"/integrations/E06": E06,
		"/integrations/E07": E07,
	
	

		"*": NotFound
	};
</script>


<main>
	<Router {routes} />
</main>