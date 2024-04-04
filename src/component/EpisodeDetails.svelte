<script>
    import { Howler } from "howler";
    import { queue, justPlayed } from "../stores";
    export let episode;
    export let response;
    export let index;
    let collapsed = true;
</script>

<div class="flex-container p-autoflex-column">
    <div class="d-inline-flex w-100 border border-1 border-white bg-secondary">
        <button
            class="btn btn-secondary fa-solid fa-play d-flex align-items-center"
            disabled={$queue !== "[]" &&
                JSON.parse($queue)[0]["title"] === episode["title"]}
            on:click={() => {
                let temp = JSON.parse($queue);
                let item = JSON.parse(JSON.stringify(episode));
                item["podcastImage"] = response["image"];
                item["podcastTitle"] = response["title"];
                item["author"] = response["author"];
                Howler.unload();
                justPlayed.set(true);
                temp.unshift(item);
                queue.set(JSON.stringify(temp));
            }}></button>
        <div class="col p-auto py-2 bd-highlight d-flex m-auto justify-content-start bg-secondary">
            {episode["title"]}
        </div>
        <div class="justify-content-end d-flex m-auto">
            <button
                class="btn btn-secondary align-items-center d-flex fa-solid
                        {JSON.parse($queue).filter(
                    (e) => e['title'] === episode['title'],
                ).length > 0
                    ? 'fa-tasks'
                    : 'fa-list'}"
                on:click={() => {
                    let temp = JSON.parse($queue);
                    let item = JSON.parse(JSON.stringify(episode));
                    item["podcastImage"] = response["image"];
                    item["podcastTitle"] = response["title"];
                    item["author"] = response["author"];
                    temp.push(item);
                    queue.set(JSON.stringify(temp));
                }}
                disabled={JSON.parse($queue).filter(
                    (e) => e["title"] === episode["title"],
                ).length > 0}
            ></button>
        </div>
        <div class="justify-content-end d-flex m-auto">
            <button
                class="btn btn-secondary align-items-center d-flex fa-solid {collapsed
                    ? 'fa-angle-down'
                    : 'fa-angle-up'}"
                on:click={() => {
                    collapsed = !collapsed;
                }}
            />
        </div>
        <div class="justify-content-end d-flex m-auto">
            <a
                class="btn btn-secondary align-items-center d-flex fa-solid fa-download"
                target="_blank"
                href={episode["audioSource"]}
                download
            > </a>
        </div>
    </div>

    <div class="flex-grow-xl p-2 {collapsed ? 'd-none' : ''}" id={"" + index}>
        {@html episode["episodeDescription"]}
    </div>
</div>
