<script lang="ts">

    export let value:any;
    export let items:any[];

    let displayedItems:any[];
    let searchWord:string="";

    $:displayItems=items.filter(item=>{
      if(item.name.includes(searchWord)){
        return item;
      }
    });

    let visible=false;
    let droppedDown="hidden";

    let displayedName="";

    $:items.forEach((item)=>{
      if(item.value===value){
        displayedName=item.name;
      }
    })


    $:if(visible){
      droppedDown="block"
    }else{
      droppedDown="hidden";
    }


    const dropDown=()=>{
      visible=!visible;
    }

</script>

  <div class="relative z-20">
    <button type="button" class="relative w-1/3 h-10 rounded-md bg-transparent p-2 text-left text-white border-white border-2 m-1 focus:outline-none sm:text-sm hover:scale-100" on:click={dropDown}>
      <span>{displayedName}</span>
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>
<div class="{droppedDown} absolute md:w-1/3 bg-white p-4 rounded-md">
<input type="text" bind:value={searchWord} class="w-full border-black border-2 text-black">
    <ul class="max-h-20 overflow-auto w-full focus:outline-none sm:text-sm rounded-md p-1" tabindex="-1" role="listbox">
      {#each displayItems as item}
      <li class="text-black text-left w-full hover:bg-blue-600" id="listbox-option-0" role="option">
        <label class="text-left"><input type=radio bind:group={value} value={item.value} name="item" class="hidden" on:change={dropDown}/>{item.name}</label>
      </li>
      {/each}
    </ul>
  </div>
  </div>
