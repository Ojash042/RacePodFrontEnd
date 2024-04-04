<script>
import { createEventDispatcher, onDestroy } from "svelte";

export let allItemsLoaded;
export let horizontal = false;
export let component;
const onScroll = e => {
    const element = e.target;

    const offset = horizontal
      ? e.target.scrollWidth - e.target.clientWidth - e.target.scrollLeft
      : e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;

    console.log(offset)
    /*if (offset <= threshold) {
      if (!isLoadMore && hasMore) {
        dispatch("loadMore");
      }
      isLoadMore = true;
    } else {
      isLoadMore = false;
    }*/
  };

</script>
<div on:scroll={()=>{console.log("hello")}}></div>