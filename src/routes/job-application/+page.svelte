<script lang="ts">

    import { onMount } from 'svelte';

    import { 
        Autocomplete,
        Paginator,
        popup,
        ProgressRadial,
        RangeSlider,
        SlideToggle,
        type AutocompleteOption,
        type PopupSettings,
    } from '@skeletonlabs/skeleton';

    import type { Root, Salary } from '../../models/infojobs';
	import { get } from 'lodash';
	import type { TLastSearch } from '../../models/lastsearch';

    let valueMin    = 0;
    let valueMax    = 100;
    let max         = 100;
    let min         = max;

    let flavorDenylist: AutocompleteOption[] = [
        {
            label: 'PHP',
            value: 'php',
            keywords: ['php', 'php7', 'php8', 'php 7', 'php 8'],
            meta: {
                description: 'PHP es un lenguaje de programación de uso general de código del lado del servidor originalmente diseñado para el desarrollo web de contenido dinámico.',
                url: 'https://www.php.net/',
            },
        },
        {
            label: 'HTML',
            value: 'html',
            keywords: ['php', 'php7', 'php8', 'php 7', 'php 8'],
            meta: {
                description: 'PHP es un lenguaje de programación de uso general de código del lado del servidor originalmente diseñado para el desarrollo web de contenido dinámico.',
                url: 'https://www.php.net/',
            },
        }
    ];

    let popupSettings: PopupSettings = {
        event       : 'focus-click',
        target      : 'popupAutocomplete',
        placement   : 'bottom',
    };

    function onPopupDemoSelect(event: CustomEvent) {

        console.log(event.detail);

        keywords = event.detail.value;
    }

    let checked: boolean = false;

    function selectedAll(){
        // for (let i = 0; i < empleos2.length; i++) {
        //     empleos2[i].selected = !checked;
        // }
        // checked = !checked;

        // console.log(empleos2);

        jobs?.offers.forEach( job => {
            job.selected = !checked;
        });
    }

    let empleos2 = [
        {
            value: 1,
            selected: false,
        },
        {
            value: 2,
            selected: false,
        },
        {
            value: 3,
            selected: false,
        },
        {
            value: 4,
            selected: false,
        },
        {
            value: 5,
            selected: false,
        },
        {
            value: 6,
            selected: false,
        },
        {
            value: 7,
            selected: false,
        },
        {
            value: 8,
            selected: false,
        },
        {
            value: 9,
            selected: false,
        },
        {
            value: 10,
            selected: false,
        },
    ]

    // let empleos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    let page = {
        offset      : 0,
        limit       : 5,
        size        : empleos2.length,
        amounts     : [1,2,5,10],
    };

    let value: boolean = false;

    function handleEmpleoSelected(event: Event, empleo: any) {

        console.log('handleEmpleoSelected');
        event.stopPropagation();
        

        // if ( empleo.selected === '' )
        //     empleo.selected = 'bg-surface-800';
        // else
        //     empleo.selected = '';

        // empleo.selected = !empleo.selected;
        empleos2[empleo].selected = !empleos2[empleo].selected;

        console.log(empleo);
    }


    let valueRange: number = 50;



    // Para autocomplete, se puede usar el siguiente endpoint
    // https://ms-autocomplete.spain.advgo.net/v1/search?max_results=5&prefix=java
    //  Obtiene las últimas búsquedas
    //  https://www.infojobs.net/webapp/offers/search/last-searches

    // Para buscar por últimas BÚSQUEDAS
    // https://www.infojobs.net/webapp/offers/search/48136938754?referer=search-recent

    // Para buscar por palabra clave
    // https://www.infojobs.net/webapp/offers/search?keyword=Javascript&normalizedJobTitleIds=&provinceIds=&onlyForeignCountry=false

    // Para buscar el código de compatibilidad
    // https://www.infojobs.net/candidate/match?offerCode=78dacc257147419ae91f20bcb4dea3

    // e39b69f8564388a5af392b817606d9

    let lastSearches: TLastSearch[] = [];
    onMount(() => {

        getSearchRecent();

    });

    async function getSearchRecent() {
        const res       = await fetch(`https://www.infojobs.net/webapp/offers/search/last-searches`);
        const last      = await res.json();
        lastSearches    = last;
        console.log(last);
    }

    let keywords  = '';
    let jobs: Root | null = null;

    async function getJobs( event: Event ): Promise<void> {
        event.stopPropagation();
        const res = await fetch(`https://www.infojobs.net/webapp/offers/search?keyword=${keywords}&onlyForeignCountry=false`);
        // const res = await fetch(`https://www.infojobs.net/webapp/offers/search?keyword=${keywords}&normalizedJobTitleIds=&provinceIds=&onlyForeignCountry=false`);
        jobs = await res.json();

        if ( !jobs?.offers ) return;

        jobs.offers.forEach( job => {
            getMatch( job.code ).then( match => {
                job.match = match;
            });
        });


        console.log(jobs);
    }

    async function getMatch( code: string ): Promise<any> {
        const match = await fetch(`https://www.infojobs.net/candidate/match?offerCode=${code}`);
        return await match.json();
    }

    function getLastTime( publishedAt: string ) {
        // Crear las fechas de ejemplo
        const now               = new Date();
        const publishedAtDate   = new Date( publishedAt );

        // Restar las fechas
        const diferenciaMilisegundos: number = publishedAtDate.getTime() - now.getTime();

        // Convertir la diferencia a días, horas, minutos y segundos
        const segundos  = Math.floor(diferenciaMilisegundos / 1000);
        const minutos   = Math.floor(segundos / 60);
        const horas     = Math.floor(minutos / 60);
        const dias      = Math.floor(horas / 24);

        // Calcular el residuo para obtener horas, minutos y segundos restantes
        const horasRestantes        = horas % 24;
        const minutosRestantes      = minutos % 60;
        const segundosRestantes     = segundos % 60;

        console.log(`Han pasado ${dias} días, ${horasRestantes} horas, ${minutosRestantes} minutos y ${segundosRestantes} segundos.`);

    }

    function getSalary( salary: Salary | null ) {

        if ( !salary ) return "Salario no disponible";

        if ( salary.range.min && salary.range.max )
            return `${salary.range.min} - ${salary.range.max} ${salary.currency} ${salary.period}`;
        else if ( salary.range.min )
            return `${salary.range.min} ${salary.currency} ${salary.period}`;
        else if ( salary.range.max )
            return `${salary.range.max} ${salary.currency} ${salary.period}`;
    
    }

</script>

<div class="card p-4 w-72 shadow-xl" data-popup="popupAutocomplete">
    <div class="flex">
        <svg width="25px" height="25px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8V12L15 15" stroke="#ffffff" stroke-width="0.9600000000000002" stroke-linecap="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke:#e8e6e3;"></path> <circle cx="12" cy="12" r="9" stroke="#ffffff" stroke-width="0.9600000000000002" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke:#e8e6e3;"></circle> </g></svg>
        <h2 class="ml-2 mb-2">Tus últimas búsquedas</h2>
    </div>

    <hr class="bg-white mb-2">

    <Autocomplete
        options         = {flavorDenylist}
        on:selection    = {onPopupDemoSelect}
        bind:input      = {keywords}
	/>
</div>

<div class="flex justify-center items-center mt-10">
    <div class="w-full max-w-2xl">
        <form class="shadow-xl rounded py-6 w-11/12 px-8 pt-6 pb-8 mb-4">
        <!-- <form class="shadow-xl rounded py-6 w-11/12 px-8 pt-6 pb-8 mb-4 card variant-ghost-surface"> -->
            <div class="flex items-center justify-center">
                <input
                    class       = "input autocomplete"
                    type        = "search"
                    name        = "autocomplete-search"
                    placeholder = "Puesto, empresa o palabra clave"
                    use:popup   = {popupSettings}
                    bind:value={keywords}
                />
                <button
                    type="button"
                    class="btn variant-filled ml-2"
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
        <hr class="bg-white mb-5">

        <RangeSlider name="range-slider" bind:value={valueMin} max={valueMax} step={10} ticked class="w-full">
            <div class="flex justify-between items-center">
                <span class="font-bold">Rango mínimo</span>
                <span class="text-xs">{valueMin} / {valueMax}</span>
            </div>
        </RangeSlider>

        <RangeSlider name="range-slider" bind:value={valueMax} max={max} step={10} ticked class="w-full">
            <div class="flex justify-between items-center">
                <span class="font-bold">Rango máximo</span>
                <span class="text-xs">{valueMax} / {max}</span>
            </div>
        </RangeSlider>

        <SlideToggle
            name            = "slide"
            bind:checked    = {value}
            label           = "Seleccionar todos"
            class           = "mt-5 mb-3 w-full"
            on:change       = {() => selectedAll()}
        >
            Seleccionar todos
        </SlideToggle>

        <button
            type="button"
            class="btn btn-sm mt-1 variant-filled ml-auto"
            disabled={empleos2.every( em => !em.selected)}
        >
            Postular a todos los seleccionados
        </button>

    </div>

    <div class="flex-wrap w-full">
        
        {#each jobs?.offers || [] as job, index}
            <div
                class="shadow-xl rounded mb-4 cursor-pointer min-w-full w-full lg:w-1/2 xl:w-full"
            >
                <div class="flex items-center p-8 card-hover hover:shadow-2xl active:bg-surface-900 card {job.selected? 'bg-white':'variant-ghost-surface'} ">
                    <div class="mr-5 -mt-7">
                        <img src="https://via.placeholder.com/84" alt="Imagen de ejemplo" >

                        <ProgressRadial
                            class   = "ml-3 mt-12"
                            width   = "w-14"
                            track   = "stroke-surface-500/30"
                            meter   = "stroke-amber-500"
                            stroke  = {80}
                            font    = {130}
                            value   = {valueRange}
                        >
                            {valueRange}%
                        </ProgressRadial>
                </div>
                    <div>
                        <div class="flex items-center">
                            <span class="chip variant-filled-primary mr-2 rounded-full text-white"><span class="text-white">Proceso Online</span> </span>
                            <span class="chip variant-filled-tertiary mr-2 rounded-full "><span class="text-white">Destacada</span> </span>
                            <!-- <span class="chip variant-filled-error rounded-full "><span class="text-white">Destacada</span> </span> -->
                            <label class="flex items-center space-x-2 ml-auto">
                                <input
                                    class="checkbox"
                                    type="checkbox"
                                    checked={job.selected}
                                    on:change|stopPropagation={(event) =>handleEmpleoSelected(event, index)}
                                />
                            </label>

                            <button type="button" class="btn btn-sm">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.75 20.75C17.5974 20.747 17.4487 20.702 17.32 20.62L12 16.91L6.68 20.62C6.56249 20.6915 6.42757 20.7294 6.29 20.7294C6.15243 20.7294 6.01751 20.6915 5.9 20.62C5.78491 20.5607 5.68741 20.4722 5.61722 20.3634C5.54703 20.2546 5.50661 20.1293 5.5 20V6C5.5 5.27065 5.78973 4.57118 6.30546 4.05546C6.82118 3.53973 7.52065 3.25 8.25 3.25H15.75C16.4793 3.25 17.1788 3.53973 17.6945 4.05546C18.2103 4.57118 18.5 5.27065 18.5 6V20C18.5005 20.1362 18.4634 20.2698 18.3929 20.3863C18.3223 20.5027 18.2209 20.5974 18.1 20.66C17.9927 20.7189 17.8724 20.7498 17.75 20.75ZM12 15.25C12.1532 15.2484 12.3033 15.2938 12.43 15.38L17 18.56V6C17 5.66848 16.8683 5.35054 16.6339 5.11612C16.3995 4.8817 16.0815 4.75 15.75 4.75H8.25C7.91848 4.75 7.60054 4.8817 7.36612 5.11612C7.1317 5.35054 7 5.66848 7 6V18.56L11.57 15.38C11.6967 15.2938 11.8468 15.2484 12 15.25Z" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"></path> </g></svg>
                            </button>

                            <button type="button" class="btn btn-sm">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.75 3.25H8.24999C7.52064 3.25 6.82117 3.53973 6.30545 4.05546C5.78972 4.57118 5.49999 5.27065 5.49999 6V20C5.49898 20.1377 5.53587 20.2729 5.60662 20.391C5.67738 20.5091 5.77926 20.6054 5.90112 20.6695C6.02298 20.7335 6.16012 20.7627 6.2975 20.754C6.43488 20.7453 6.56721 20.6989 6.67999 20.62L12 16.91L17.32 20.62C17.4467 20.7063 17.5967 20.7516 17.75 20.75C17.871 20.7486 17.9903 20.7213 18.1 20.67C18.2203 20.6041 18.3208 20.5072 18.3911 20.3894C18.4615 20.2716 18.499 20.1372 18.5 20V6C18.5 5.27065 18.2103 4.57118 17.6945 4.05546C17.1788 3.53973 16.4793 3.25 15.75 3.25Z" fill="#cfc" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#cfc;"></path> </g></svg>
                            </button>

                        </div>

                        <h2 class="text-lg font-bold mt-1">{job.title}</h2>

                        <a href={job.companyLink}>{job.companyName}</a>

                        <ul class="flex mt-5 mb-3">
                            <li class="text-xs mr-2">{job.city} | {job.teleworking} | {getLastTime(job.publishedAt)}</li>
                            <li class="chip variant-filled-primary mr-2 rounded-full -mt-2"><span class="text-white text-xs">Nueva</span> </li>
                            <!-- <li class="chip variant-filled-primary mr-2 rounded-full -mt-2"><span class="text-white text-xs">Solo Teletrabajo</span> </li> -->
                            <!-- <li class="chip variant-filled-primary mr-2 rounded-full -mt-2"><span class="text-white text-xs">Solo Teletrabajo</span> </li> -->
                            <!-- <li class="bg-gray-200 text-gray-500 py-1 px-2 rounded-full text-xs">Hace 2 horas</li> -->
                        </ul>

                        <p class="text-sm mt-2">{job.description}</p>

                        <div class="flex items-center mt-1">
                            <ul class="flex mt-2">
                                <li class="chip variant-filled-secondary mr-2 rounded-full"><span class="text-white text-xs">{job.contractType}</span> </li>
                                <li class="chip variant-filled-secondary mr-2 rounded-full"><span class="text-white text-xs">{job.workday}</span> </li>
                                <li class="chip variant-filled-secondary mr-2 rounded-full"><span class="text-white text-xs">{getSalary(job.salary || null)}</span> </li>
                            </ul>

                            <button type="button" class="btn btn-sm variant-ghost-tertiary ml-auto">Postular</button>
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

        <Paginator bind:settings={page}></Paginator>
    </div>
</div>