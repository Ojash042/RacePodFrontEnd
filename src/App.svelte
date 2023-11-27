<script>
// @ts-nocheck

import {Router,Link, Route} from "svelte-routing";
import Counter from "./lib/Counter.svelte";
import PodcastDetails from "./lib/PodcastDetails.svelte";
import Home from "./lib/Home.svelte";
import Player from "./component/Player.svelte";
import { justPlayed } from "./stores";
    import { Howler } from "howler";

  let playerId = 0;
  
  $: $justPlayed,(()=>{
    console.log("halse")
    if($justPlayed===true){
      console.log("false")
      playerId++;
      Howler.init();
    }
  })();
</script>

<Router><!--
  <nav class="d-flex flex-column flex-shrink-0 h-100 p-3 text-white bg-dark sidebar">
      <Link class="d-flex align-items-center  mb-3 mb-md-0 me-md-auto text-white text-decoration-none" to="/">Home</Link>
      <hr/>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a class="nav-link bg-dark active mb-3"> Add rss</a>
        </li>
        <li class="nav-item">
          <a class="nav-link bg-dark active mb-3">Queue</a>
        </li>
        <li class="nav-item">
          <a class="nav-link bg-dark active mb-3">Search</a>
        </li>
      </ul>
      <hr/>
  </nav>
  <div>
    <Route path="/podcast/:id" let:params>
      <PodcastDetails id="{params.id}"/>
    </Route>
    <Route path="/Counter" component={Counter}/>
    <Route path="/"><Home/></Route>
  </div>-->
  <div class="col-auto col-md-3 border-0 w-25 border-right col-xl-2 px-sm-2 m-0 px-0 px-0 bg-dark">
    <div class="d-flex position-fixed w-25 flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <Link to="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">RacePod</span>
        </Link>
        <hr>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <a class="nav-link bg-dark active mb-3">Queue</a>
            </li>
        </ul>
        <hr>
    </div>
  </div>
 
  <Route path="/podcast/:id" let:params><PodcastDetails id="{params.id}"></PodcastDetails></Route>
  <Route path="/Counter" component={Counter}/>
  <Route path="/" component={Home}></Route>
</Router>
{#key $justPlayed === false}
  
  <Player {playerId}/>
{/key}