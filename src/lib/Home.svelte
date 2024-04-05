<script>
    import axios from "axios";
    import { onMount, createEventDispatcher } from "svelte";
    $: response = [];
    const dispatcher = createEventDispatcher();

    onMount(async ()=>{
        try{
            const res = await axios.get("http://192.168.101.14:5050/")
            response = res.data
            console.log(response)
        }
        catch(e){
            alert(e);
        }
    })

</script>

<div class="py-3 container-fluid text-white w-75">
    {#if response !== undefined}
    <h1 style="font-weight: bold;">Your Podcasts</h1>
        <div class="row ">
        {#each response as val}
            <a class="col-md-4" style="text-decoration: none; color:white" href="/podcast/{val["podcastSeriesId"]}">
                <div class="card m-3 p-3" style="width: 18rem;">
                    <img class="card-img-top" src="{val["image"]}" alt={response["title"]} />
                    <div class="card-body">
                        <h5>{val["title"]}</h5>
                        <h6>By: {val["author"]}</h6>
                    </div>
                </div>
            </a>
        {/each}
        </div>
    {/if}
</div>