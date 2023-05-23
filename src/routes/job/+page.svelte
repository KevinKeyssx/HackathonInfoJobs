<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import {
        Accordion,
        AccordionItem,
        FileDropzone,
        InputChip,
        popup,
        toastStore,
        type PopupSettings,
    } from '@skeletonlabs/skeleton';

	import type { TJob, TKnowledge } from '../../models/jobs';
    // import View from '$components/view/view.svelte';
    import View from '../../lib/components/view/view.svelte';

    const dispatch = createEventDispatcher();

    let text = '';

    let job: TJob = {
        title           : 'Título de la oferta',
        knowledges      :[{
            description     : 'Descripción del conocimiento',
            level           : 'Avanzado',
            experience      : '2',
            time            : 'año(s)'
        }],
        description     : 'Toda tu descripción aquí',
        maximunWage     : 0,
        vacancies       : 1,
        personnel       : 0,
        minimumWage     : 0,
        typeOfContract  : '',
        typeOfIndustry  : '',
        typeOfPosition  : '',
        typeOfWork      : '',
        benefits        : [],
        category        : '',
        city            : '',
        country         : '',
        level           : 'Emplead@',
        state           : 'string',
        labels          : [],
        skills          : [],
        desirables      : [],
        minimumStudies  : [{
            name        : 'Estudios mínimos',
            experience  : '2'}],
    }

    function updateText(event: any) {
        text = event.target.innerHTML;
        console.log(text);
        job.description = text;
        dispatch('textChange', text);
    }

    let selectedDescription: string = '';
    let description: string = '';

    function handleSelect(event: any) {
        const input = event.target;
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;
        
        selectedDescription = description.substring(selectionStart, selectionEnd);
        console.log('Texto seleccionado:', selectedDescription);
    }

    // function applyStyle(style: any) {
    //     document.execCommand(style, false, '');
    // }

    function applyStyle(style: string) {
        const value = {
            bold        : `<strong>${selectedDescription}</strong>`,
            italic      : `<em>${selectedDescription}</em>`,
            underline   : `<u>${selectedDescription}</u>`,
        }[style] || selectedDescription;

        console.log('Valor:', value);
        console.log('Estilo:', style);
        console.log('Texto :', description);
        
        const newValue = description.replace(selectedDescription, value);

        console.log('Nuevo valor:', newValue);
        

        job.description = newValue;
    }

    let isFocused = false;

    function handleClick() {
    isFocused = true;
    }

    function handleBlur() {
    isFocused = false;
    }

    const popupFeatured: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        // Matches the data-popup value on your popup element
        // Defines which side of your trigger the popup will appear
        event       : 'hover',
        target      : 'popupFeatured',
        placement   : 'top',
    };

    let dropzone = 'Sube tus archivos aquí'

    function onInvalidHandler( event: any ): void {

        const text = event.detail.input;
        let message = '';

        if ( text === '' )          message = 'Please enter a value';
        else if (text.length > 10)  message = 'Please enter a value with less than 10 characters';
        else                        message = 'Please enter a valid value';

        toastStore.trigger({
            message     : `(${message}) Please try again!`,
            background  : 'variant-filled-error'
        });

    }

    function onChangeHandler( event: Event ): void {
        const newFile = event.target as any;

        const files = (event.target as HTMLInputElement).files;
        if ( files && files.length > 0) {
            // const selectedFileVideo = files[0];
            job.files = files;
            // const videoUrl = URL.createObjectURL(selectedFileVideo);
        }

        dropzone = newFile.files.length > 1 ? 
            `${newFile.files.length} archivos seleccionados` : 
            newFile.files[0].name;

    }

    function addKnowledge( event: Event ) {

        event.preventDefault();
        job.knowledges = [
            ...job.knowledges, {
            description     : '',
            level           : '',
            experience      : '',
            time            : ''
        }];

    }

    function addMinimumStudies( event: Event ) {

        event.preventDefault();
        job.minimumStudies = [
            ...job.minimumStudies, {
            name        : '',
            experience  : ''
        }];

    }

</script>

<style>
    .display-none {
        display: none;
    }

    /* Ocultar las flechas predeterminadas */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Estilos personalizados para indicar la funcionalidad de ajuste */
    input[type="number"] {
        padding-right: 24px; /* Espacio para mostrar los indicadores de ajuste */
    }

    input[type="number"]::after {
        content: '\25B2\25BC'; /* Códigos de flechas Unicode (▲ ▼) */
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none; /* Evita la interacción con los indicadores */
    }
</style>
<!-- <div class="flex flex-wrap">
    <div class="w-full sm:w-2/3 bg-gray-200">Div 1 (62%)</div>
    <div class="w-full sm:w-1/3 bg-gray-300">Div 2 (38%)</div>
  </div> -->
<div class="flex">
    <div class="w-2/3">
        <div class="flex items-center justify-center  ">
            <div class="shadow-xl rounded px-8 py-6 w-4/5">
                <div class="mb-4">
                    
        
                    <label class="label" use:popup={popupFeatured}>
                        <span>Título atractivo:</span>
                        <input
                            class       ="input"
                            type        ="text"
                            placeholder ="Ingrese un título bien llamativo..."
                            bind:value={job.title}
                        />
                    </label>
        
                    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <label class="label">
                            <span>Nivel:</span>
                            <select class="select rounded-3xl" bind:value={job.level}>
                                <option value="Emplead@">Emplead@</option>
                                <option value="Jefe">Jefe</option>
                                <option value="Lider">Lider</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </label>
        
                        <label class="label">
                            <span>Personal a cargo:</span>
                            <input
                                class       = "input"
                                type        = "number"
                                placeholder = "Cantidad de personas a cargo..."
                                bind:value={job.personnel}
                            />
                        </label>
        
                        <label class="label">
                            <span>Número de vacantes:</span>
                            <input
                                class       = "input"
                                type        = "number"
                                placeholder = "Vacantes disponibles..."
                                bind:value={job.vacancies}
                            />
                        </label>
        
                        <label class="label">
                            <span>Salario mínimo:</span>
        
                            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                <!-- <div class="input-group-shim">$</div> -->
                                <input type="number" placeholder="Ingrese el salario..." />
                                <select>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                </select>
                                <!-- <button class="variant-filled-secondary">Submit</button> -->
                            </div>
                        </label>
        
                        <label class="label">
                            <span>Salario máximo:</span>
                            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                <!-- <div class="input-group-shim">$</div> -->
                                <input type="number" placeholder="Ingrese el salario..." />
                                <select>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                </select>
                                <!-- <button class="variant-filled-secondary">Submit</button> -->
                            </div>
                        </label>

                        <label class="label">
                            <span>Tipo de industria:</span>
                            <select class="select rounded-3xl">
                                <option value="1">Emplead@</option>
                                <option value="2">Jefe</option>
                                <option value="2">Lider</option>
                                <option value="2">Otro</option>
                            </select>
                        </label>

                        <label class="label">
                            <span>Categoría:</span>
                            <select class="select rounded-3xl">
                                <option value="1">Emplead@</option>
                                <option value="2">Jefe</option>
                                <option value="2">Lider</option>
                                <option value="2">Otro</option>
                            </select>
                        </label>

                        <label class="label">
                            <span>Referencias / Etiquetas</span>
                            <input class=" display-none" type="email" name="" id="">
                            <InputChip
                                bind:value={job.labels}
                                class       = "input"
                                name        = "chips"
                                placeholder = "Referencias y/o categorías..."
                            />
                        </label>
                    </div>
                </div>

                <Accordion>
                    <AccordionItem open>
                        <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
                        <svelte:fragment slot="summary">
                            <span>Conocimientos necesarios:</span>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {#each job.knowledges as item, index }
                                    <label class="label">
                                        {#if index === 0 }
                                            <span>Descripción</span>
                                        {/if}
                                        <input
                                            class       = "input" 
                                            type        = "text" 
                                            name        = "item" 
                                            placeholder = "Descripción"
                                            bind:value={item.description}
                                        >
                                    </label>

                                    <label class="label">
                                        {#if index === 0 }
                                            <span>Nivel</span>
                                        {/if}
                                        <select class="select rounded-3xl" bind:value={item.level}>
                                            <option value="Básico">Básico</option>
                                            <option value="Intermedio">Intermedio</option>
                                            <option value="Avanzado">Avanzado</option>
                                        </select>
                                    </label>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label class="label">
                                            {#if index === 0 }
                                                <span>Experiencia:</span>
                                            {/if}
                                            <input 
                                                class   = "input" 
                                                type    = "number" 
                                                name    = "" 
                                                id      = ""
                                                min     = "1"
                                                max     = "100"
                                                placeholder="Tiempo de experiencia"
                                                bind:value={item.experience}
                                            >
                                        </label>

                                        <label class="label"> 
                                            {#if index === 0 }
                                                <div class="flex justify-between">
                                                    <span class="text-left">Tiempo</span>
                                                    <button
                                                        type    = "button"
                                                        class   = "btn btn-sm variant-filled text-right  h-5"
                                                        on:click={addKnowledge}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            {/if}
                                            <select class="select rounded-3xl"  bind:value={item.time}>
                                                <option value="mese(s)">mese(s)</option>
                                                <option value="año(s)">año(s)</option>
                                            </select>
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </svelte:fragment>
                    </AccordionItem>

                    <AccordionItem>
                        <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
                        <svelte:fragment slot="summary">
                            <span >Estudios mínimos:</span>
                        </svelte:fragment>
                        <svelte:fragment slot="content"> 
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {#each job.minimumStudies as item, index }
                                    <label class="label">
                                        {#if index === 0 }
                                            <span>Nombre</span>
                                        {/if}
                                        <input
                                            class   = "input" 
                                            type    = "text" 
                                            name    = "" 
                                            id      = ""
                                            placeholder="Descripción"
                                            bind:value={item.name}
                                        >
                                    </label>

                                    <label class="label">
                                        {#if index === 0 }
                                            <div class="flex justify-between">
                                                <span class="text-left">Experiencia</span>
                                                <button
                                                    type    = "button"
                                                    class   = "btn btn-sm variant-filled text-right  h-5"
                                                    on:click={addMinimumStudies}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        {/if}
                                        <input 
                                            class       = "input" 
                                            type        = "number" 
                                            name        = "" 
                                            id          = ""
                                            min         = "1"
                                            max         = "100"
                                            placeholder = "Tiempo de experiencia"
                                            bind:value={item.experience}
                                        >
                                    </label>
                                {/each}
                            </div>
                        </svelte:fragment>
                    </AccordionItem>
                </Accordion>

                <label class="label" >
                    <span>Descripción:</span>
                        <textarea
                            class       = "textarea"
                            rows        = "4"
                            placeholder = "Ingresa una descripción clara del puesto de trabajo. Utiliza un lenguaje sencillo y evita utilizar jerga técnica excesiva."
                            bind:value={job.description}
                        />
                </label>
        
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <label class="label">
                            <span>Requisitos deseables</span>
                            <input class=" display-none" type="email" name="" id="">
                            <InputChip
                                class="input" 
                                bind:value={job.desirables}
                                name="chips"
                                placeholder="Enter any value..."
                            />
                        </label>
        
                        <label class="label">
                            <span>Habilidades:</span>
        
                            <input class=" display-none" type="email" name="" id="">
                            <InputChip 
                                bind:value={job.skills}
                                class           = "input"
                                name            = "skills"
                                placeholder     = "Habilidades esperadas..."
                            />
                        </label>
        
                        <label class="label">
                            <span>Beneficios y compensaciones</span>
                            <input class=" display-none" type="email" name="" id="">
        
                            <InputChip
                                allowUpperCase
                                on:invalid  = {onInvalidHandler}
                                class       = "input"
                                maxlength   = {10}
                                bind:value  = {job.benefits}
                                max         = {50}
                                name        = "benefits"
                                placeholder = "Benficios..."
                            />
                        </label>
                    </div>
        
                <label class="label">
                    <span>Material visual y/o audivisual</span>
                    <input class="display-none" type="email" name="" id="">
                    <FileDropzone name="files" on:change={onChangeHandler} multiple>
                        <svelte:fragment slot="lead">(icon)</svelte:fragment>
                        <svelte:fragment slot="message">{dropzone}</svelte:fragment>
                        <svelte:fragment slot="meta">(meta)</svelte:fragment>
                    </FileDropzone>
                </label>
        
                <div class="flex items-center justify-between">
                    <button
                        class   = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type    = "button"
                    >
                        Crear postulación
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="w-1/3">
        <View
            {...job}
        />
    </div>
</div>