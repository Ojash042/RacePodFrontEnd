<script>
    import { onMount, createEventDispatcher } from "svelte";
    import Player from "../component/Player.svelte";
    import PodcastInfoPlayer from "../component/PodcastPlayer.svelte";
    import axios from "axios";
    import { queue, justPlayed } from "../stores";
    import { parse } from "svelte/compiler";
    import { Howler } from "howler";
    import EpisodeDetails from "../component/EpisodeDetails.svelte";

    export let id;
    let url = `http://localhost:5050/${id}`
    let response;
    let err;
    let queueVal = [];
    //const unsubscribe = queue.subscribe((value)=>queueVal = JSON.parse(value)); 

    const dispatch = createEventDispatcher();

    function dispatchPlay(episode){
        dispatch("eventName",episode)
    }

    onMount(async ()=>{
        try{
            const res = await axios.get(url)
            response = res.data
            console.log(response)
        }
        catch (e) {
            err =  e;
            console.log(e)
            alert(e);
        }
    })
</script>

<div class="px-4 mb-5 container-fluid justify-content-end m-auto p-auto bg-dark text-white w-75">
{#if (response!==undefined)}
    <div>
        <div class="d-flex">
            <div class="py-3 w-25">
                <img src="{response["image"]}" alt="{response["title"]}" width="120" height="120"/>
            </div>
            <div class="d-flex w-75 text-align-center justify-content-left align-items-center">
                <h2><strong>{response["title"]}</strong></h2>
            </div>
        </div>
        <div class="d-flex">
            {response["description"]}
        </div>
        <hr>
    <div class="">
         {#each response["episodes"] as episode, index}
            <EpisodeDetails episode={episode} response={response} index={index}/>
         {/each}   
    </div>
    <div class="mb-4 py-4"></div>
    </div>
{/if}
</div>    
