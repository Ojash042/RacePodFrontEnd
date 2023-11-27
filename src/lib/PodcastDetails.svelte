<script>
    import { onMount, createEventDispatcher } from "svelte";
    import Player from "../component/Player.svelte";
    import PodcastInfoPlayer from "../component/PodcastPlayer.svelte";
    import axios from "axios";
    import { queue, justPlayed } from "../stores";
    import { parse } from "svelte/compiler";
    import { Howler } from "howler";

    export let id;
    let url = "http://192.168.101.13:5050/podcast?id=3"
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
        }
        catch (e) {
            err =  e;
            console.log(e)
            alert(e);
        }
    })
</script>

<div class="px-4 container-fluid justify-content-end m-auto p-auto bg-dark text-white w-75">
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
            <div class="d-flex py-3 my-3  flex-column">
                <div class="d-inline-flex border border-1 border-white bg-secondary">
                    <button class="btn btn-secondary fa-solid fa-play d-flex align-items-center"
                     disabled = {
                        (($queue!=="[]") && (JSON.parse($queue)[0]["title"]===episode["title"]))
                     }
                     on:click={()=>{
                        let temp = JSON.parse($queue);
                        let item = JSON.parse(JSON.stringify(episode));
                        item["podcastImage"] = response["image"];
                        item["podcastTitle"] = response["title"];
                        item["author"] = response["author"];
                        Howler.unload();
                        justPlayed.set(true);
                        temp.unshift(item);
                        queue.set(JSON.stringify(temp));
                    }}>
                    </button>
                    <div class="p-2 bd-highlight d-flex m-auto justify-content-start bg-secondary">{episode["title"]}</div>
                    <div class="justify-content-end d-flex m-auto">
                        <button class="btn btn-secondary align-items-center d-flex fa-solid 
                        {(JSON.parse($queue).filter(e=> e["title"] === episode["title"])).length>0?"fa-tasks":"fa-list"}"
                        on:click={()=>{
                            let temp = JSON.parse($queue)
                            let item = JSON.parse(JSON.stringify(episode));
                            item["podcastImage"] = response["image"];
                            item["podcastTitle"] = response["title"];
                            item["author"] = response["author"] ;
                            temp.push(item);
                            queue.set(JSON.stringify(temp))

                        }} disabled={JSON.parse($queue).filter(e=>e["title"]===episode["title"]).length>0}></button>
                    </div>
                    <div class="justify-content-end d-flex m-auto">
                        <a class="btn btn-secondary align-items-center d-flex fa-solid fa-download" target="_blank" href="{episode["audioSource"]}"  download></a>
                    </div>
                </div>
                
                <div class="flex-grow-xl p-2" id={""+index}>{@html episode["episodeDescription"]}</div>
            </div>
         {/each}   
    </div>
    </div>
{/if}
</div>    