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

	import type { TKnowledge } from '../../models/jobs';

    const dispatch = createEventDispatcher();

    let text = '';

    let knowledge: TKnowledge[] = [
        {
            description     : 'Descripción del conocimiento',
            level           : 'Avanzado',
            experience      : '2',
            time            : 'año(s)'
        },
    ];

    function updateText(event: any) {
        text = event.target.innerHTML;
        dispatch('textChange', text);
    }

    function applyStyle(style: any) {
        document.execCommand(style, false, '');
    }

    const popupFeatured: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        // Matches the data-popup value on your popup element
        // Defines which side of your trigger the popup will appear
        event       : 'hover',
        target      : 'popupFeatured',
        placement   : 'top',
    };

    let list: string[] = [];
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

    function onChangeHandler( e: Event ): void {
        const newFile = e.target as any;

        dropzone = newFile.files.length > 1 ? 
            `${newFile.files.length} archivos seleccionados` : 
            newFile.files[0].name;

    }

    function addKnowledge(event: Event) {
        event.preventDefault();
        knowledge = [...knowledge, {description: '', level: '', experience: '', time: ''}];
    }

</script>

<style>
    .display-none {
        display: none;
    }
</style>

<div class="flex items-center justify-center  ">
    <div class="shadow-xl rounded px-8 py-6 w-4/5">
        <div class="mb-4">
            <div class="p-4">
                <div class="flex mb-2">
                    <button
                        class       = "mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        on:click    = {() => applyStyle('bold')}
                    >
                        Negrita
                    </button>
                    <button
                        class       = "mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        on:click    = {() => applyStyle('italic')}
                    >
                        Cursiva
                    </button>
                    <button
                        class       = "mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        on:click    = {() => applyStyle('underline')}
                    >
                        Subrayado
                    </button>
                    <button
                        class       = "mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        on:click    = {() => applyStyle('insertunorderedlist')}
                    >
                        Lista
                    </button>
                </div>

                <div
                    contenteditable = "true"
                    on:input        = {updateText}
                    bind:innerHTML={text}
                ></div>
            </div>
            <label class="label"  use:popup={popupFeatured}>
                <span>Título atractivo</span>
                <input class="input" type="text" placeholder="Input" />
            </label>

            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">

                <label class="label">
                    <span>Nivel:</span>
                    <select class="select rounded-3xl">
                        <option value="1">Emplead@</option>
                        <option value="2">Jefe</option>
                        <option value="2">Lider</option>
                        <option value="2">Otro</option>
                    </select>
                </label>

                <label class="label">
                    <span>Personal a cargo:</span>
                    <input class="input" type="number" placeholder="Cantidad de personas a cargo..." />
                </label>

                <label class="label">
                    <span>Número de vacantes:</span>
                    <input class="input" type="number" placeholder="Ingrese el salario..." />
                </label>

                <label class="label">
                    <span>Salario mínimo:</span>

                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <div class="input-group-shim">$</div>
                        <input type="number" placeholder="Ingrese el salario..." />
                        <select>
                            <option value="EURO">EURO</option>
                            <option value="USD">DÓLAR</option>
                            <option value="PESO">PESO</option>
                        </select>
                        <!-- <button class="variant-filled-secondary">Submit</button> -->
                    </div>
                </label>

                <label class="label">
                    <span>Salario máximo:</span>
                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <div class="input-group-shim">$</div>
                        <input type="number" placeholder="Ingrese el salario..." />
                        <select>
                            <option value="EURO">EURO</option>
                            <option value="USD">DÓLAR</option>
                            <option value="PESO">PESO</option>
                        </select>
                        <!-- <button class="variant-filled-secondary">Submit</button> -->
                    </div>
                </label>

                <label class="label">
                    <span>Tipo de industria de la oferta:</span>
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
                    <InputChip class="input"  bind:value={list} name="chips" placeholder="Enter any value..." />
                </label>
            </div>

        </div>

        <Accordion>
                    <AccordionItem open>
                        <svelte:fragment slot="lead">(icon)</svelte:fragment>
                        <svelte:fragment slot="summary">
                            <article class="flex justify-between font-bol">
                                <span class="text-left">Conocimientos necesarios:</span>
                                <span class="text-right">
                                    <button
                                        type    = "button"
                                        class   = "btn btn-sm variant-filled"
                                        on:click={addKnowledge}
                                    >
                                        +
                                    </button>
                
                                </span>
                            </article>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <button
                                        type    = "button"
                                        class   = "btn btn-sm variant-filled"
                                        on:click={() => knowledge = [...knowledge, {description: '', level: '', experience: '', time: ''}]}
                                    >
                                        +
                                    </button>

                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                        {#each knowledge as item }
                        
                                            <input
                                                class   = "input" 
                                                type    = "text" 
                                                name    = "" 
                                                id      = ""
                                                placeholder="Descripción"
                        
                        
                                                value="{item.description}"
                                            >
                        
                                            <select class="select rounded-3xl">
                                                <option value="1">Básico</option>
                                                <option value="2">Intermedio</option>
                                                <option value="3">Avanzado</option>
                                            </select>
                        
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <input 
                                                    class   = "input" 
                                                    type    = "number" 
                                                    name    = "" 
                                                    id      = ""
                                                    min     = "1"
                                                    max     = "100"
                                                    placeholder="Tiempo de experiencia"
                                                    value="{item.experience}"
                                                >
                        
                                                <select class="select rounded-3xl">
                                                    <option value="1">mese(s)</option>
                                                    <option value="2">año(s)</option>
                                                </select>
                                            </div>
                                            
                                        {/each}
                        
                                        
                        
                                    </div>
                        </svelte:fragment>
                    </AccordionItem>
                    <AccordionItem>
                        <svelte:fragment slot="lead">(icon)</svelte:fragment>
                        <svelte:fragment slot="summary">
                            <article class="flex justify-between font-bol">
                                <span class="text-left">Estudios mínimos:</span>
                                <span class="text-right">
                                    <button
                                        type    = "button"
                                        class   = "btn btn-sm variant-filled"
                                        on:click={addKnowledge}
                                    >
                                        +
                                    </button>
                                </span>
                            </article>
                        </svelte:fragment>
                        <svelte:fragment slot="content"> 
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {#each knowledge as item }
                                    <input
                                        class   = "input" 
                                        type    = "text" 
                                        name    = "" 
                                        id      = ""
                                        placeholder="Descripción"
                                        value="{item.description}"
                                    >

                                    <select class="select rounded-3xl">
                                        <option value="1">Básico</option>
                                        <option value="2">Intermedio</option>
                                        <option value="3">Avanzado</option>
                                    </select>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input 
                                            class   = "input" 
                                            type    = "number" 
                                            name    = "" 
                                            id      = ""
                                            min     = "1"
                                            max     = "100"
                                            placeholder="Tiempo de experiencia"
                                            value="{item.experience}"
                                        >

                                        <select class="select rounded-3xl">
                                            <option value="1">mese(s)</option>
                                            <option value="2">año(s)</option>
                                        </select>
                                    </div>
                                {/each}
                            </div>
                        </svelte:fragment>
                    </AccordionItem>
                </Accordion>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label class="label">
                    <span>Requisitos deseables</span>

                    <input class=" display-none" type="email" name="" id="">
                    <InputChip class="input"  bind:value={list} name="chips" placeholder="Enter any value..." />
                </label>

                <label class="label">
                    <span>Habilidades:</span>

                    <input class=" display-none" type="email" name="" id="">
                    <InputChip class="input"  bind:value={list} name="chips" placeholder="Enter any value..." />
                </label>

                <label class="label">
                    <span>Beneficios y compensaciones</span>
                    <input class=" display-none" type="email" name="" id="">

                    <InputChip
                        allowUpperCase
                        on:invalid  = {onInvalidHandler}
                        class       = "input"
                        maxlength   = {10}
                        bind:value  = {list}
                        max         = {5}
                        name        = "chips"
                        placeholder = "Enter any value..."
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

<!-- <textarea class="textarea" rows="4" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." /> -->
