<script lang="ts">
  import {slide} from 'svelte/transition';

    export let value:any;
    export let items:any[];

    let animateHelper={};

    let displayedItems:any[]=[];
    let searchWord:string="";

    let visible=false;
    let droppedDown="hidden";

    let displayedName="";

    let message='';

    $:if(searchWord.length>=3){
      message='No results found!'
    }else if(searchWord.length===0){
      message='Start typing to see results!';
    }else{
      message='Just a little more...';
    }

    $:items.forEach((item)=>{
      if(item.value===value){
        displayedName=item.name;
      }
    })

    $:if(searchWord.length>2){
      displayedItems=items.filter(item=>{
      if(item.name.toUpperCase().includes(searchWord.toUpperCase())){
        return item;
      }
    });
    }else{
      displayedItems=[];
    }


    $:if(visible){
      droppedDown="block"
    }else{
      droppedDown="hidden";
    }


    const dropDown=()=>{
      visible=!visible;
      animateHelper={};
    }

</script>

  <div class="relative p-2">
    <button type="button" class="w-full relative h-10 rounded-md bg-transparent p-2 text-left text-white border-white border-2 m-2 focus:outline-none lg:text-sm text-xs hover:scale-100" on:click={dropDown}>
      <span>{displayedName}</span>
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>
    {#key animateHelper}
<div class="{droppedDown} w-full relative rounded-md bg-transparent p-2 text-left text-white border-white border-2 m-2 z-40" transition:slide>
<input type="text" bind:value={searchWord} class="w-full border-white border-2 text-white">
{#if displayedItems.length>0}
    <ul class="max-h-36 overflow-auto w-full focus:outline-none sm:text-sm rounded-md p-1" tabindex="-1" role="listbox">
      {#each displayedItems as item}
      <li class="text-white text-left w-full hover:bg-blue-600 hover:text-white rounded-md p-1">
        <label class="text-left truncate"><input type=radio bind:group={value} value={item.value} name="item" class="hidden" on:change={dropDown}/>{item.name}</label>
      </li>
      {/each}
    </ul>
    {:else}
    <div class="text-center">{message}</div>
    {/if}
  </div>
  {/key}
  </div>
