<script>
// @ts-nocheck


    import { onMount, createEventDispatcher, getAllContexts } from "svelte";
    import Player from "../component/Player.svelte";
    import PodcastInfoPlayer from "../component/PodcastPlayer.svelte";
    import axios, { all } from "axios";
    import { queue, justPlayed } from "../stores";
    import { parse } from "svelte/compiler";
    import { Howler } from "howler";
    import EpisodeDetails from "../component/EpisodeDetails.svelte";
    import InfiniteScroll from "../component/InfiniteScroll.svelte";
    import terminal from "virtual:terminal";
    import { config } from "../config";

    export let id;
    let socket = `http://${config["localIpAddress"]}:${config["backendPort"]}`;
    let url = `${socket}/${id}`;
    let response;
    let err;
    let queueVal = [];
    let allItemsLoaded = false;
    let pageNo = 0;
    //const unsubscribe = queue.subscribe((value)=>queueVal = JSON.parse(value)); 

    const dispatch = createEventDispatcher();

    function dispatchPlay(episode){
        dispatch("eventName",episode)
    }

    const handleScroll=()=>{
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight -100){
            addRemainingEpisodes();
        }
    }

    
    onMount(async ()=> {
        try {
            await axios.get(`${socket}/UpdateEpisodes/${id}`);
        } 
        catch (error) {
         console.log(error)   
        }
    })

    onMount(async ()=>{
        window.addEventListener('scroll', ()=>{})
        try{
            const res = await axios.get(url)
            response = res.data
            pageNo++;
        
        }
        catch (e) {
            err =  e;
            terminal.log("hello")
            terminal.log(e)
            console.log(e);
            alert(e);
        }
    })
    onMount(async ()=>{
        window.addEventListener('scroll', handleScroll);
        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        }
    });


    
    

    async function addRemainingEpisodes(){
        if(allItemsLoaded){
            return
        }
        try{
            let result;
            pageNo++;
            const res = await axios.get(`${socket}/api/getNextPage/?guid=${id}&page=${pageNo}`);
            result = await res.data;
            response["episodes"] = [...response["episodes"], ...result];
            if(result.length < 30){
                allItemsLoaded = true;
            }
        }
        catch(e){
            if(e.response){
                if(e.response.status === 400){
                    allItemsLoaded = true;
                }
            }
        }
    }
</script>

<div class="px-4 mb-5 container-fluid justify-content-end m-auto p-auto bg-dark text-white w-75" on:scroll={()=>{}}>
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
    <InfiniteScroll allItemsLoaded={allItemsLoaded}
    on:loadMore={() => addRemainingEpisodes()}
    ></InfiniteScroll>
    </div>
{/if}
</div>    
