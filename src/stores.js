import { writable, derived } from "svelte/store";

export const storedQueue = localStorage.getItem("queue");
export const queue = writable(storedQueue!==null ? storedQueue : JSON.stringify([]))
export const seeekTime = writable(0);
export const playing = writable(0)
export const isPlaying = writable(false);

queue.subscribe((value)=>{
    localStorage.setItem("queue",value)}
);



