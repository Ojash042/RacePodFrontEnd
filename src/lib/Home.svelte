<script>
    import axios from "axios";
    import { onMount, createEventDispatcher } from "svelte";
    import { getLocalIP } from "../util";
    import { config } from "../config";
    import { Link, Route, Router } from "svelte-routing";

    $: response = [];
    const dispatcher = createEventDispatcher();

    onMount(async ()=>{
        try{
            let url = config["localIpAddress"];
            let port = config["backendPort"];
            
            const res = await axios.get(`http://${url}:${port}`);
            response = res.data
            console.log(response)
        }
        catch(e){
            alert(e);
        }
    })

</script>

<Router>
<div class="py-3 container-fluid text-white w-75">
    {#if response !== undefined}
    <h1 style="font-weight: bold;">Your Podcasts</h1>
        <div class="row ">
        {#each response as val}
            <Link class="col-md-4 text-decoration-none" to="/podcast/{val["podcastSeriesId"]}"let:params>
                <div class="card m-3 p-3" style="width: 18rem;">
                    <img class="card-img-top" src="{val["image"]}" alt={response["title"]} />
                    <div class="card-body">
                        <h5 class="text-light text-decoration-none">{val["title"]}</h5>
                        <h6 class="text-light">By: {val["author"]}</h6>
                    </div>
                </div>
            </Link>
            
            
                
            
        {/each}
        </div>
    {/if}
</div>
</Router>