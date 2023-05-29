<script lang="ts">

    import { onMount } from 'svelte';

    import { 
        Autocomplete,
        Paginator,
        popup,
        ProgressRadial,
        RangeSlider,
        SlideToggle,
        toastStore,
        type AutocompleteOption,
        type PopupSettings,
    }               from '@skeletonlabs/skeleton';
	import axios    from 'axios';

    import type { InfoJobsResponse, Item } from '../../models/infojobs';

    let keywords        = '';
    let offers          = [] as Item[];
    let offersList      = [] as Item[];
    let valueMin        = 0;
    let valueMax        = 100;
    let max             = 100;
    let isSelectedAll   = false;
    let lastSerchAuto   : AutocompleteOption[]  = [];
    let popupSettings   : PopupSettings = {
        event       : 'focus-click',
        target      : 'popupAutocomplete',
        placement   : 'bottom',
    };
        let page = {
        offset      : 0,
        limit       : 10,
        size        : 0,
        amounts     : [5, 10, 15, 20, 30]
    };
    let isOfferLoading = false;

    function selectedAll(): void {

        offers = offers.map( job => ({
            ...job,
            selected: isSelectedAll
        }));

    }

    function handleOfferSelected( event: Event, index: number ): void {

        event.stopPropagation();
        offers[index].selected = !offers[index].selected;

    }

    function onPopupSelect( event: CustomEvent ): void {
        keywords = event.detail.label;
        getJobs();
    }

    onMount(() => {

        getOffers();

    });

    async function getOffers(): Promise<void> {
        const res   =  await axios.get('/api/offer');
        const last  =  await res.data;

        let jobOffers: Item[] = last.data.offers;

        jobOffers = jobOffers.map( offer => ({
            ...offer,
            selected    : false,
            match       : Math.floor(Math.random() * (101))
        }));

        const categories = jobOffers.map( offer => offer.category.value );

        lastSerchAuto = Array
        .from(new Set( categories ))
        .map( category => ({

            label       : category,
            value       : convertToCateogory( category ),
            keywords    : [category],

        } as AutocompleteOption ));

    }

    function convertToCateogory( category: string ): string {

        return category
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(' y ', '-')
        .replace(' de ', '-')
        .replace(' a ', '-')
        .replace(', ', '-')
        .split(' ')
        .join('-')
        .replace('-e-i+d', '')
        .replace('ventas-al-detalle', 'venta-detalle');

    }

    function changePage( event: CustomEvent ): void {
        const offset    = page.offset * page.limit;
        const limit     = page.limit + offset;

        // offers = jobOffers?.slice(offset, limit);
    }

    async function getJobs(): Promise<void> {

        if ( !keywords || keywords === '' ) return;

        const category = lastSerchAuto
        .find( last => last.value === keywords );

        const params = {
            category,
        };

        isOfferLoading = true;

        const res   = await axios.get<InfoJobsResponse>('/api/offers', {params});
        const data  = res.data;

        if ( !data ) return;

        const offset    = page.offset * page.limit;
        const limit     = page.limit + offset;

        offersList = data.data.offers
        .slice(offset, limit)
        .map( offer => ({
            ...offer,
            selected    : isSelectedAll,
            match: Math.floor(Math.random() * (101))
        }));

        offers          = offersList;
        isOfferLoading  = false;

    }

    function searchCompatibility(): void {
        offers = offersList
        .filter( offer => (
            offer.match?? 0) >= valueMin && 
            (offer.match  ?? 0) <= valueMax
        );
    }

    function getLastTime( publishedAt: Date ): [string, boolean] {
        const now           = new Date();
        const published     = new Date( publishedAt );
        const difference    = now.getTime() - published.getTime();
        const seconds       = Math.floor(difference / 1000);
        const minutes       = Math.floor(seconds / 60);
        const hours         = Math.floor(minutes / 60);
        const days          = Math.floor(hours / 24);

        if ( days > 0 )     return [`Hace ${days} días`, false];
        if ( hours > 0 )    return [`Hace ${hours} horas`, true];
        if ( minutes > 0 )  return [`Hace ${minutes} minutos`, true];

        return ['Hace unos segundos', true];
    }

    function handleKeyDown( event: KeyboardEvent ): void {
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            getJobs();
        }
    }

    function sendApplication( event: Event, all: boolean = false ): void {
        event.stopPropagation();

        const message = all ?
            'Se ha postulado a todas las ofertas seleccionadas' :
            'Se ha postulado a la oferta seleccionada';

        toastStore.trigger({
            message,
            background  : 'variant-filled-success',
        });

    }

</script>

<svelte:head>
	<title>JobEase | Postulación</title>
</svelte:head>

<div class="card p-4 w-72 shadow-xl" data-popup="popupAutocomplete">
    {#if lastSerchAuto.length > 0}
        <Autocomplete
            options         = {lastSerchAuto}
            on:selection    = {onPopupSelect}
            bind:input      = {keywords}
        />
    {:else}

    <div class="flex items-center justify-center">
        <ProgressRadial
            width   = "w-10"
            track   = "stroke-surface-500/30"
            meter   = "stroke-amber-500"
            stroke  = {80}
            font    = {130}
        />
    </div>

    {/if}
</div>

<div class="flex justify-center items-center mt-10">
    <div class="w-full max-w-4xl">
        <form class="shadow-xl rounded py-6 px-8 pt-6 pb-8 mb-4">
            <div class="flex items-center justify-center">
                <input
                    class       = "input autocomplete"
                    type        = "search"
                    name        = "autocomplete-search"
                    placeholder = "Puesto, empresa o palabra clave"
                    use:popup   = {popupSettings}
                    on:keydown  = {handleKeyDown}
                    bind:value={keywords}
                />

                <button
                    type        = "button"
                    class       = "btn variant-filled ml-5"
                    on:click|stopPropagation={getJobs}
                >
                    <span><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke:#e8e6e3;"></path> </g> </g></svg></span>
                    <span>Buscar</span>
                </button>
            </div>
        </form>
    </div>
</div>

<div class="p-12 flex flex-col lg:flex-row">
    <div class="shadow-xl rounded px-8 pt-6 pb-8 mb-4 xl:w-[22%] w-full lg:w-auto lg:min-w-[280px] h-auto mr-5 card variant-ghost-surface">
        <h3 class=" text-xl">Compatibilidad</h3>
        <hr class="bg-white border-2 mb-5">

        <RangeSlider name="range-slider-min" bind:value={valueMin} max={valueMax} step={10} ticked class="w-full">
            <div class="flex justify-between items-center">
                <span class="font-bold">Rango mínimo</span>
                <span class="text-xs">{valueMin} / {valueMax}</span>
            </div>
        </RangeSlider>

        <RangeSlider name="range-slider-max" bind:value={valueMax} max={max} step={10} ticked class="w-full">
            <div class="flex justify-between items-center">
                <span class="font-bold">Rango máximo</span>
                <span class="text-xs">{valueMax} / {max}</span>
            </div>
        </RangeSlider>

        <button
            type        = "button"
            class       = "btn btn-sm mt-3 variant-ghost-primary ml-auto"
            on:click    = {searchCompatibility}
        >
            Buscar compatibilidad
        </button>

        <SlideToggle
            name            = "slide"
            bind:checked    = {isSelectedAll}
            label           = "Seleccionar todos"
            class           = "mt-5 mb-3 w-full"
            active          = "bg-primary-500"
            on:change       = {() => selectedAll()}
        >
            Seleccionar todos
        </SlideToggle>

        <button
            type        = "button"
            class       = "btn btn-sm mt-1 ml-auto variant-ghost-tertiary"
            disabled    = {offers.every( em => !em.selected)}
            on:click    = {( event ) => sendApplication(event, true)}
        >
            Postular a todos los seleccionados
        </button>
    </div>

    <div class="w-full">
        {#if isOfferLoading}
            <section class="card w-full animate-pulse mb-5">
                <div class="p-4 space-y-4">
                    <div class="flex flex-wrap items-center">
                        <div class="placeholder-circle w-14 mr-3"></div>
                        <div class="placeholder-circle w-12 mr-3"></div>
                        <div class="placeholder-circle w-12"></div>
                    </div>
                    <div class="placeholder" />
                    <div class="grid grid-cols-3 gap-8">
                        <div class="placeholder" />
                        <div class="placeholder" />
                        <div class="placeholder" />
                    </div>
                    <div class="grid grid-cols-4 gap-4">
                        <div class="placeholder" />
                        <div class="placeholder" />
                        <div class="placeholder" />
                        <div class="placeholder" />
                    </div>
                </div>
            </section>
        {:else}
            {#each offers as offer, index}
                <div
                    class="shadow-xl rounded mb-4 cursor-pointer min-w-full w-full lg:w-1/2 xl:w-full"
                >
                    <div class="flex p-8 card-hover hover:shadow-2xl active:bg-surface-900 card {offer.selected? 'bg-white':'variant-ghost-surface'} ">
                        <div class="mr-5">
                            <img src="https://via.placeholder.com/84" alt="Imagen de ejemplo" >

                            <ProgressRadial
                                class   = "ml-3 mt-8"
                                width   = "w-14"
                                track   = "stroke-surface-500/30"
                                meter   = "stroke-amber-500"
                                stroke  = {80}
                                font    = {130}
                                value   = {offer.match ?? 100}
                            >
                                {offer.match ?? 0}%
                            </ProgressRadial>
                    </div>
                        <div class="w-full">
                            <div class="flex flex-wrap items-center">
                                <span class="chip variant-filled-primary mr-2 rounded-full text-white"><span class="text-white">Proceso Online</span></span>
                                <span class="chip variant-filled-tertiary mr-2 rounded-full"><span class="text-white">Destacada</span></span>
                                <label class="flex items-center space-x-2 ml-auto">
                                    <input
                                        class       = "checkbox"
                                        type        = "checkbox"
                                        checked     = {offer.selected}
                                        on:change|stopPropagation={(event) => handleOfferSelected(event, index)}
                                    />
                                </label>
                            </div>

                            <h2 class="text-lg font-bold mt-1">{offer.title}</h2>

                            <a href={offer.author.uri} target="_blank">{offer.author.name}</a>

                            <ul class="flex mt-5 mb-1">
                                <li class="text-xs mr-2">{offer.city} | {offer.experienceMin.value} | {getLastTime(offer.published)[0]}</li>
                                {#if getLastTime(offer.published)[1]}
                                    <li class="chip variant-filled-primary mr-2 rounded-full -mt-2"><span class="text-white text-xs">Nueva</span> </li>
                                {/if}
                            </ul>

                            <div class="flex flex-wrap items-center mt-1">
                                <ul class="flex flex-wrap mt-2">
                                    <li class="chip mt-2 variant-filled-secondary mr-2 rounded-full"><span class="text-white text-xs">{offer.contractType.value}</span></li>
                                    <li class="chip mt-2 variant-filled-secondary mr-2 rounded-full"><span class="text-white text-xs">{offer.workDay.value}</span></li>
                                    <li class="chip mt-2 variant-filled-secondary mr-2 rounded-full"><span class="text-white text-xs">{offer.salaryDescription}</span></li>
                                </ul>

                                <button
                                    type="button"
                                    class="btn btn-sm mt-2 variant-ghost-tertiary ml-auto"
                                    on:click={sendApplication}
                                >
                                    Postular
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {:else}
                    <div
                        class="shadow-xl mb-4 min-w-full w-full lg:w-1/2 xl:w-full"
                    >
                        <div class="p-8 card variant-ghost-surface">
                            <p class=" text-center">Favor ingrese algun valor para buscar</p>
                        </div>
                    </div>
            {/each}
        {/if}

        <Paginator
            bind:settings   = {page}
            on:page         = {changePage}
            on:amount       = {changePage}
        />
    </div>
</div>