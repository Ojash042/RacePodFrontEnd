<script>
    import axios from "axios"
    export let key;
    import { isPlaying, justPlayed, playing, queue,seeekTime } from "../stores";
    import {Howl, Howler} from "howler";
    import Home from "../lib/Home.svelte";
    import { tick } from "svelte";

    let error;
    console.log("key+ " + key)
    $: play = JSON.parse($queue)[0] || {}; 
    let response;
    const url = "http://localhost:5050/podcast?id=3";

    $:  sound = new Howl({
                src: [`${play["audioSource"]}`],
                format: ["mp3"],
            }); 
            
    $: id= 0
    $: $queue, (()=>{
        console.log("hello");
        sound = new Howl({
            src: [`${play["audioSource"]}`],
            format: ["mp3"],
            html5:true,
        })
    })();
    $: $justPlayed, (()=>{
        if($justPlayed===true){
            console.log("hell")
            console.log(listOfId[0]);
            sound.pause(id);
            listOfId.shift();
            console.log(id);
            justPlayed.set(false);
        }
    })();
    //@ts-ignore
    $: $isPlaying ? id = sound.play() : sound.pause(); 
    $:listOfId = []; 
    $:{
        if(!listOfId.includes(id) && id!==0){
            listOfId.push(id);
        }
    }
    let seek = 1;
    let soundBufferd = false;
    let duration;
    let volume = 1;
    setInterval(()=>{
        //console.log(Number(JSON.stringify(sound.seek())))
        seek= (Number(JSON.stringify(sound.seek())))
        soundBufferd = sound.playing(id) && $isPlaying;
        duration = sound.duration()
        volume = Number(sound.volume());
    },50)
    sound = sound
    //let currentPlaying = {}
    //const play = playing.subscribe((value)=> {
    //    console.log(`value = ${value}`)
    //    currentPlaying= value || {}
//})
    /*axios.get(url)
    .then(res=>{
        response = res.data
        res=res;
        console.log("res= ")
        console.log(res.data)
    }).catch(error=>{
        console.log(error)
    })

    console.log(response);

    var sound = new Howl({
        src:[]
    })
    sound*/
    const volumeIcons = ["xmark", "off", "low", "high"]
    const playButtonState = {
        "loading":"fa-spinner fa-spin",
        "paused":"fa-play",
        "playing":"fa-pause",
    }
    function testSound(){
        if(JSON.stringify(play)==="{}"){
            return ""
        }
        if (($isPlaying && !sound.playing()) || (JSON.stringify(play)==="{}")){
            return "loading"
        }
        if($isPlaying && sound.playing()){
            return "playing"
        }
        else{
            return "paused"
        }
    }

</script>

<div class="position-absolute w-100 bottom-0 px-5 flex-shrink-0 widget flex-row">
    <div class="widget-info bg-secondary  d-flex">
        <div class=" flex-row align-items-center m-auto w-25 d-flex">
            <img class="poster" src="{JSON.stringify(play) === "{}"  ? "https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png": play["podcastImage"]}" width="80" height="80"  alt="hell"/>
            <div class="flex-column p-auto m-auto d-flex align-items-start" style="font-size:small;">
                <div class="row ms-1" style="font-weight: bold;">
                    {play["title"] === undefined ? "": play["title"].split(" ").slice(0,8).join(" ") + (play["title"].split(" ").length> 7?"...":"")} 
                </div>
                
                <div class="flex-row ms-1 p-auto d-flex" style="font-weight: lighter;">
                    {play["podcastTitle"] === undefined ? "": play["podcastTitle"]}
                </div>
            </div>
        </div>
                <div class="podcast-info w-50 d-flex flex-row justify-content-center align-items-center">
            <div class="flex-column d-flex align-items-center">
            {#key $isPlaying}
            {#key $queue}
            {#key soundBufferd}
            <div class="flex-row align-items-center d-flex">
                <button class="btn flex-row d-flex btn-secondary fa-solid bg-transparent border-0 fa-backward" disabled={testSound()==="loading"} on:click={()=>sound.seek(Math.max(seek-15,0))}></button>
                <button class="btn flex-row d-flex btn-secondary fa-solid bg-transparent border-0 {playButtonState[testSound()]}" disabled={testSound()==="loading"} on:click={()=>{
                isPlaying.update((val)=>!val);
            }}></button>
            <button class="btn flex-row d-flex btn-secondary fa-solid bg-transparent border-0 fa-forward" disabled={testSound()==="loading"} on:click={()=>sound.seek(Math.min(seek+15,duration))}></button>
            </div>
            <input type="range" id= "player" class="flex-column d-flex justify-content-center m-auto align-items-center" value="{Math.floor(seek)}" step="15" min="0" max="{duration}" on:input={()=>{
                sound.seek(document.getElementById("player").value,id)}}> 
            {/key}
            {/key}
            {/key}
            </div>
            <div class="mx-5 flex-row align-items-center justify-content-between d-flex p-auto" >{`${String(Math.floor(seek/3600)).padStart(2,"0")}:${String(Math.floor(seek/60)%60).padStart(2,"0")}:${String(Math.floor(seek)%60).padStart(2,"0")}`}</div>
        </div>
        {#key volume}
        <div class="flex-row w-25 align-items-center justify-content-end me-3 p-0 d-flex">
            <i class="fa-solid fa-volume-{volumeIcons[(Math.ceil((Number(sound.volume()))*3))]}"></i>
            <input type="range" id="volume" class="ms-3" min="0" max="1" style="width: 40%;" step="0.1" value="{Number(sound.volume())}" on:change={()=>{
                sound.volume(document.getElementById("volume").value)}}>
        </div>
        {/key}
    </div>  
</div>

<style>
    .widget{
        min-height: 13%;
        left: 30px;
    }

    .widget-info{
        position: fixed;
        right:15px;
        max-height: 100%;
        border-radius: 15px;
        left:30px;
    }

    .poster{
        margin-left: 0px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
    }
</style>
