<script lang="ts">

    import {
        popup,
        type PopupSettings,
    } from '@skeletonlabs/skeleton';

    import { ProgressRadial } from '@skeletonlabs/skeleton';

    import type {
	TCustomInfo,
        TDescription,
        TKnowledge,
        TSalary,
        TStaff,
        TStudies
    } from '../../../models/jobs';

    export let knowledges       : TKnowledge[] = [];
    export let title            : string = '';
    export let vacancies        : number = 0;
    export let level            : string = '';
    export let typeOfContract   : string = '';
    export let typeOfIndustry   : string = '';
    export let category         : string = '';
    export let city             : string = '';
    export let workingDay       : string = '';
    export let modality         : string = '';
    export let staff            : TStaff | null = null;
    export let labels           : string[] = [];
    export let desirables       : string[] = [];
    export let skills           : string[] = [];
    export let benefits         : string[] = [];
    export let dailyTasks       : string[] = [];
    export let goalsObjectives  : string[] = [];
    export let minimumStudies   : TStudies[] = [];
    export let description      : TDescription | null = null;
    export let files            : FileList | null = null;
    export let salary           : TSalary | null = null;
    export let aditionalInfo    : string[] = [];
    export let customInfo       : TCustomInfo[] | null = null;

    const popupFeatured: PopupSettings = {
        event       : 'hover',
        target      : 'popupFeatured',
        placement   : 'top',
    };

    function transformToStringArray( file: File ): string {

        return URL.createObjectURL(file);

    }

    function getExtension( file: File ): string | null {
        const fileName = file.name;
        const extensionIndex = fileName.lastIndexOf(".");
        if (extensionIndex === -1)  return null;

        const extension = fileName.substring(extensionIndex + 1).toLowerCase();

        return {
            'jpg'   : 'img',
            'png'   : 'img',
            'jpeg'  : 'img',
            'gif'   : 'img',
            'svg'   : 'img',
            'webp'  : 'img',
            'bmp'   : 'img',
            'ico'   : 'img',
            'tif'   : 'img',
            'tiff'  : 'img',
            'mp4'   : 'video',
            'avi'   : 'video',
            'mov'   : 'video',
            'wmv'   : 'video',
            'flv'   : 'video',
            'webm'  : 'video',
            'mkv'   : 'video',
        } [ extension ] || null;
    }

    function getCoing(coing: string, salary: number) {
        const salaryString = salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return  coing === '€' ? `${salaryString}${coing}` : `${coing}${salaryString}`;
    }

    function getSalary( salary: TSalary | null ): string | null {
        if ( !salary ) return 'Salario no disponible';

        const { minimun, maximun, time, type, coin } = salary;
        const salaryString = `${type}/${time}`;

        if ( coin === 'P' ) return 'Salario a convenir';

        if ( !minimun && !maximun ) return 'Salario no disponible';
        if ( minimun && !maximun )  return `${getCoing(coin, minimun)} ${salaryString}`;
        if ( !minimun && maximun )  return `${getCoing(coin, maximun)} ${salaryString}`;
        if ( minimun === maximun )  return `${getCoing(coin, minimun)} ${salaryString}`;

        return `${getCoing(coin, minimun)} - ${getCoing(coin, maximun)} ${salaryString}`;
    }

    function getStaffInCharge( staff: TStaff | null ): string {
        if ( !staff ) return 'Sin personal a cargo';
        const { min, max } = staff;

        if ( !min && !max ) return 'Sin personal a cargo';
        if ( min && !max )  return `${min} personas a cargo`;
        if ( !min && max )  return `${max} personas a cargo`;
        if ( min === max )  return `${min} personas a cargo`;
        return `${min} - ${max} personas a cargo`;
    }

    function getStarsRating(rating: number): string {
        const maxStars = 5;
        let stars = "";

        for (let i = 0; i < maxStars; i++) {
            stars += i < rating ?
            `<span class="text-yellow-400">&#9733;</span>` : 
            `<span class="text-gray-400">&#9734;</span>`;
        }

        return stars;
    }

</script>

<div class="flex xl:w-full lg:w-1/2">
    <div class="shadow-xl rounded px-8 py-6">
        <div class="mb-4"> 
            <h1 class="text-2xl font-bold">{title|| 'Sin título'}</h1>
            <hr class="bg-white h-[3px]">

            <div class="flex flex-wrap">
                <span class="chip variant-filled-primary mt-1 mr-1">En {city}</span>
                <span class="chip variant-filled-primary mt-1 mr-1">Contrato {typeOfContract}</span>
                <span class="chip variant-filled-primary mt-1 mr-1">Jornada {workingDay}</span>
                <span class="chip variant-filled-primary mt-1 mr-1">{modality}</span>
                <span class="chip variant-filled-primary mt-1 mr-1">{level}</span>
                <span class="chip variant-filled-primary mt-1 mr-1">{getStaffInCharge(staff)}</span>
                <span class="chip variant-filled-primary mt-1 mr-1">{vacancies} vacante(s)</span>
                <span class="chip variant-filled-primary mt-1 mr-1">{getSalary(salary)}</span>
                {#if aditionalInfo && aditionalInfo.length > 0}
                    {#each aditionalInfo as label }
                        <span class="chip variant-filled-primary mr-1 mt-2">{label}</span>
                    {/each}
                {/if}
            </div>

            <h2 class="text-2xl font-bold mt-2">Requisitos</h2>

            <h3 class="mt-2">Conocimientos mínimos</h3>

            <div class="max-w-screen-md mx-auto">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 rounded-lg text-center">
                        <thead>
                            <tr>
                                <th scope="col" class="px-6 py-3 bg-transparent text-xs font-medium uppercase tracking-wider">
                                    Descripción
                                </th>
                                <th scope="col" class="px-6 py-3 bg-transparent text-xs font-medium uppercase tracking-wider">
                                    Nivel
                                </th>
                                <th scope="col" class="px-6 py-3 bg-transparent text-xs font-medium uppercase tracking-wider">
                                    Experiencia
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-transparent divide-y divide-gray-200">
                            {#each knowledges as item}
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm max-h-16 overflow-y-auto">
                                            {item.description}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm">{item.level}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm">{item.experience} {item.time}</div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            {#if minimumStudies.length > 0}
                <h3 class="mt-2">Estudios mínimos</h3>
                {#each minimumStudies as study}
                    <p>{study.name} - {study.experience} año(s)</p>
                {/each}
            {/if}
        </div>
    </div>
</div>

<div class="flex  xl:w-full lg:w-[188%]">
    <div class="shadow-xl rounded px-8 py-6 xl:w-full lg:w-full w-full ">
        <div class="mb-4">
            <article class="flex justify-between " use:popup={popupFeatured}>
                <h2 class="text-left text-2xl font-bold">Descripción</h2>

                <h2 class="text-right mt-1">
                    {#if description?.isLoaded}
                        <ProgressRadial
                            class   = "mr-3"
                            width   = "w-5"
                            stroke  = {120}
                            meter   = "stroke-primary-500"
                            track   = "stroke-primary-500/30"
                        />
                    {:else}
                        <div class="stars-container">
                            {@html getStarsRating(description?.stars || 0)}
                        </div>
                    {/if}
                </h2>
            </article>

            <hr class="bg-white h-[3px]">

            <div class="xl:min-w[80%] sm:min-w-full lg:w-1/2 overflow-hidden mt-1">
                <p class="overflow-wrap-break-word whitespace-pre-wrap">
                    {@html description?.prompt || "Ingresa una descripción para que la inteligencia articifial pueda darte feedback."}
                </p>
            </div>

            <h3 class="mt-2">Requisitos deseables</h3>
            {#if desirables.length > 0}
                {#each desirables as desirable}
                    <span class="chip variant-filled-surface mr-1 mt-2">{desirable}</span>
                {/each}
                {:else}
                    <p>Sin información</p>
            {/if}

            <h3 class="mt-2">Habilidades</h3>
            {#if skills.length > 0}
                {#each skills as item}
                    <span class="chip variant-filled-surface mr-1 mt-2">{item}</span>
                {/each}
                {:else}
                    <p>Sin información</p>
            {/if}

            <h3 class="mt-2">Beneficios y compensaciones</h3>
            {#if benefits.length > 0}
                {#each benefits as benefit}
                    <span class="chip variant-filled-surface mr-1 mt-2">{benefit}</span>
                {/each}
                {:else}
                    <p>Sin información</p>
            {/if}

            {#if dailyTasks.length > 0}
                <h3 class="mt-2">Tareas y responsabilidades</h3>
                {#each dailyTasks as item}
                    <span class="chip variant-filled-surface mr-1 mt-2">{item}</span>
                {/each}
            {/if}

            {#if goalsObjectives.length > 0}
                <h3 class="mt-2">Metas y objetivos</h3>
                {#each goalsObjectives as item}
                    <span class="chip variant-filled-surface mr-1 mt-2">{item}</span>
                {/each}
            {/if}

            {#if customInfo && customInfo.length > 0}
                {#each customInfo as info }
                    <h3 class="mt-2">{info.name}</h3>
                    {#each info.values as value }
                        <span class="chip variant-filled-surface mr-1 mt-2">{value}</span>
                    {/each}
                {/each}
            {/if}

            {#if files}
                <h3 class="mt-2 mb-2">Material digital</h3>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {#each Array.from(files) as file }
                        {#if getExtension( file ) === 'img' }
                            <img
                                src     = { transformToStringArray( file )}
                                alt     = "Preview"
                                width   = "100px"
                            />
                        {:else if getExtension( file ) === 'video' }
                            <video
                                src     = {transformToStringArray( file )}
                                controls
                                width   = "100px"
                            >
                                <track kind="captions"  srclang="es" label="Spanish" default />
                            </video>
                        {/if}
                    {/each}
                </div>
            {/if}

            <h3 class="mt-2">Tipo de industria de la oferta</h3>
            <p>{typeOfIndustry}</p>
            <h3 class="mt-2">Categoría</h3>
            <p>{category}</p>

            {#if labels.length > 0}
                <h3>Referencias / Etiquetas</h3>
                {#each labels as label }
                    <span class="chip variant-filled-primary mr-1">{label}</span>
                {/each}
            {/if}

        </div>
    </div>
</div>

<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
    <div><p>{description?.message|| 'Ingresa la descripción para evaluar.'}</p></div>
    <div class="arrow bg-surface-100-800-token" />
</div>

