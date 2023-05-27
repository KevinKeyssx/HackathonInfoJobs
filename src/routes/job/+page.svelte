<script lang="ts">

    import { debounce } from 'lodash';
    import { Configuration, OpenAIApi } from 'openai';
    import {
        Accordion,
        AccordionItem,
        FileDropzone,
        InputChip,
        popup,
        toastStore,
        type PopupSettings,
    } from '@skeletonlabs/skeleton';

	import type { TJob } from '../../models/jobs';
    import View from '../../lib/components/view/view.svelte';

    const sendHttpRequest = debounce(async() => {

        if ( job.description.prompt.length < 100 ) return;

        job.description.isLoaded = true;

        const configuration = new Configuration({
            apiKey: '',
        });

        const openai    = new OpenAIApi( configuration );

        console.log(job.description);

        const responsed = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Comportate como si fueras un evaluador de descripciones de puestos de trabajo, tienes que puntuarlas del 0 al 5 donde 0 es muy mala y 5 es excelente y dar observaciones de como mejorarla,
            tienes que fijarte en la claridad de la descripción, que sea fácil de entender, que sea fácil de leer, que no tenga errores de ortografía,
            prioriza en que tenga no tenga ningún otro contexto que no sea el puesto de trabajo y que tiene que decir exactamente lo que se necesita para el puesto de trabajo mientras más información exista en esto suma más puntos en la puntuación,
            no está demá que se mencione la empresa pero sea muy breve y que sea motivacional,
            como recomendación indica que no es necesario ingresar la información de la empresa, ni los beneficios que entrega, ni el salario ya que esta información se ingresa en otros campos si agrega estos puntos baja el puntaje de stars,
            lo importante es la función y los roles que debe realizar en el puesto de trabajo
            ejemplo "${job.description.prompt}"
            Tu respuesta debe ser 
            {
            "stars": 0,
            "message": "tus observaciones de la descripción y una sugerencia de como megorarla"
            }
            El valor de stars dependerá de lo dicho anteriormente, y el valor de message serán tus observaciones con respecto a la descripción del puesto y una sugerencia de como mejorarla
            solo debes responder en este formato tanto en inglés como en español:
            {
            "stars": 0,
            "message": "tus observaciones de la descripción y una sugerencia de como megorarla"
            } `,
            max_tokens: 1000,
            temperature: 0,
        });

        const response = JSON.parse(responsed.data.choices[0].text || '{}');

        job.description.stars   = response.stars;
        job.description.message = response.message;
        job.description.isLoaded = false;

        console.log(response);

    }, 1000 );

    function handleInput() {
        sendHttpRequest.cancel();
        sendHttpRequest();
    }

    let job: TJob = {
        title           : 'Título de la oferta',
        knowledges      :[{
            description     : 'Descripción del conocimiento',
            level           : 'Avanzado',
            experience      : '2',
            time            : 'año(s)'
        }],
        customInfo      : null,
        description     : {
            prompt      : '',
            stars       : 0,
            message     : '',
            isLoaded    : false,
        },
        salary          : {
            minimun     : 0,
            maximun     : 0,
            type        : 'Bruto',
            time        : 'Mensual',
            coin        : '€'
        },
        staff           : {
            min         : 0,
            max         : 0,
        },
        modality        : 'Presencial',
        vacancies       : 1,
        workingDay      : 'completa',
        typeOfContract  : 'indefinido',
        typeOfIndustry  : '',
        typeOfPosition  : '',
        typeOfWork      : '',
        benefits        : [],
        category        : '',
        city            : 'Madrid',
        country         : '',
        level           : 'Emplead@',
        state           : 'string',
        labels          : [],
        skills          : [],
        desirables      : [],
        minimumStudies  : [{
            name        : 'Estudios mínimos',
            experience  : '2'
        }],
    }

    const popupFeatured: PopupSettings = {
        event       : 'hover',
        target      : 'popupFeatured',
        placement   : 'top',
    };

    let dropzone = 'Sube tus archivos aquí'

    const validInputChip = {
        max         : 20,
        maxlength   : 50,
        minlength   : 5
    }

    function onInvalidHandler( event: any, list: any[] ): void {

        const text          = event.detail.input;
        let message         = '';
        const { minlength, maxlength, max }  = validInputChip;

        if ( text === '' )                      message = 'Por favor, ingrese un valor';
        else if ( list.includes( text ) )       message = 'Valor ingresado ya existe';
        else if ( text.length >= maxlength )    message = `Por favor, ingrese un valor menor a ${maxlength} caracteres`;
        else if ( text.length <= minlength )    message = `Por favor, ingrese un valor mayor a ${minlength} caracteres`;
        else if ( list.length === max)          message = `Alcanzó el máximo de ${max} valores`;

        toastStore.trigger({
            message     : `${message}, Intente nuevamente!`,
            background  : 'variant-filled-error'
        });

    }

    function onChangeHandler( event: Event ): void {
        const newFile   = event.target as any;
        const files     = ( event.target as HTMLInputElement ).files;

        if ( files && files.length > 0) job.files = files;

        dropzone = newFile.files.length > 1 ? 
            `${newFile.files.length} archivos seleccionados` : 
            newFile.files[0].name;

    }

    function addKnowledge( event: Event ) {
        event.stopPropagation();

        job.knowledges = [
            ...job.knowledges, {
            description     : 'Descripción del conocimiento',
            level           : 'Básico',
            experience      : '1',
            time            : 'mes(es)',
        }];

    }

    function removeKnowledge(index: number) {
        if (index < 0 || index >= job.knowledges.length || job.knowledges.length === 1) {
            return job.knowledges;
        }

        job.knowledges = job.knowledges.filter((_, i) => i !== index);
    }

    function addMinimumStudies( event: Event ) {
        event.stopPropagation();

        job.minimumStudies = [
            ...job.minimumStudies, {
            name        : 'Nombre del estudio',
            experience  : '2'
        }];

    }

    function removeMinimumStudies( index: number ) {

        if ( index < 0 || index >= job.minimumStudies.length ) {
            return job.knowledges;
        }

        job.minimumStudies = job.minimumStudies.filter((_, i) => i !== index);

    }

    function addCustomInfo( event: Event ) {
        event.stopPropagation();

        if ( !job.customInfo ) {
            job.customInfo = [{
                name        : 'Nombre de la información',
                values      : []
            }];
            return;
        }
        job.customInfo = [
            ...job.customInfo, {
            name        : 'Nombre de la información',
            values  : []
        }];

    }

    function removeCustomInfo( index: number ) {
        if ( !job.customInfo ) return;

        if ( index < 0 || index >= job.customInfo.length ) {
            return job.customInfo;
        }

        job.customInfo = job.customInfo.filter((_, i) => i !== index);
    
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

<div class="flex">
    <div class="w-2/3">
        <div class="flex items-center justify-center  ">
            <div class="shadow-xl rounded px-8 py-6 w-11/12">
                    <label class="label" use:popup={popupFeatured}>
                        <span>Título atractivo:</span>
                        <input
                            class       = "input"
                            type        = "text"
                            placeholder = "Ingrese un título llamativo..."
                            bind:value={job.title}
                        />
                    </label>

                    <Accordion class="mt-2">
                        <AccordionItem open>
                            <svelte:fragment slot="summary">
                                <span>Información general:</span>
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                    <label class="label">
                                        <span>Cuidad:</span>
                                        <select class="select rounded-3xl" bind:value={job.city}>
                                            <option value="Madrid">Madrid</option>
                                            <option value="Barcelona">Barcelona</option>
                                            <option value="Málaga">Málaga</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </label>

                                    <label class="label">
                                        <span>Contrato:</span>
                                        <select class="select rounded-3xl" bind:value={job.typeOfContract}>
                                            <option value="indefinido">Indefinido</option>
                                            <option value="defindo">Defindo</option>
                                            <option value="por periodo de prueba">Por periodo de prueba</option>
                                            <option value="3 meses de prueba">3 meses de prueba</option>
                                            <option value="solo por proyecto">Solo por proyecto</option>
                                        </select>
                                    </label>

                                    <label class="label">
                                        <span>Jornada:</span>
                                        <select class="select rounded-3xl" bind:value={job.workingDay}>
                                            <option value="completa">Completa</option>
                                            <option value="part time">Part Time</option>
                                        </select>
                                    </label>

                                    <label class="label">
                                        <span>Modalidad:</span>
                                        <select class="select rounded-3xl" bind:value={job.modality}>
                                            <option value="Presencial">Presencial</option>
                                            <option value="Full Remoto">Full Remoto</option>
                                            <option value="Modalidad Híbrido">Híbrido</option>
                                        </select>
                                    </label>

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
                                            <span>Personal Min:</span>
                                            <input
                                                class       = "input"
                                                type        = "number"
                                                placeholder = "Cantidad de personas a cargo..."
                                                bind:value={job.staff.min}
                                            />
                                        </label>
            
                                        <label class="label">
                                            <span>Personal Max:</span>
                                            <input
                                                class       = "input"
                                                type        = "number"
                                                placeholder = "Cantidad de personas a cargo..."
                                                bind:value={job.staff.max}
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
                                </div>
                                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4"> 
            
                                    <label class="label">
                                        <span>Salario mínimo:</span>
            
                                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                            <input
                                                type="number"
                                                placeholder="Ingrese el salario..."
                                                bind:value={job.salary.minimun}
                                            />
                                            <select bind:value={job.salary.coin}>
                                                <option value="€">EUR</option>
                                                <option value="$">USD</option>
                                                <option value="P">PRS</option>
                                            </select>
                                        </div>
                                    </label>
            
                                    <label class="label">
                                        <span>Salario máximo:</span>
                                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                            <input
                                                type="number"
                                                placeholder="Ingrese el salario..."
                                                bind:value={job.salary.maximun}
                                            />
                                            <select bind:value={job.salary.coin}>
                                                <option value="€">EUR</option>
                                                <option value="$">USD</option>
                                                <option value="P">PRS</option>
                                            </select>
                                        </div>
                                    </label>
            
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
                                        <label class="label">
                                            <span>Tipo:</span>
                                            <select class="select rounded-3xl" bind:value={job.salary.type}>
                                                <option value="Bruto">Bruto</option>
                                                <option value="Líquido">Líquido</option>
                                            </select>
                                        </label>
            
                                        <label class="label">
                                            <span>Tiempo:</span>
                                            <select class="select rounded-3xl" bind:value={job.salary.time}>
                                                <option value="Mensual">Mensual</option>
                                                <option value="Anual">Anual</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </svelte:fragment>
                        </AccordionItem>

                        <AccordionItem>
                            <svelte:fragment slot="summary">
                                <span >Información adicional:</span>
                            </svelte:fragment>
                            <svelte:fragment slot="content"> 
                                <label class="label">
                                    <input class="display-none" type="email" name="" id="">
                                    <InputChip
                                        allowUpperCase
                                        bind:value={job.aditionalInfo}
                                        on:invalid  = {(event) => onInvalidHandler(event, job.aditionalInfo?? [])}
                                        maxlength   = {validInputChip.maxlength}
                                        max         = {validInputChip.max}
                                        minlength   = {validInputChip.minlength}
                                        class       = "input"
                                        name        = "aditionalInfo"
                                        placeholder = "Información extra..."
                                    />
                                </label>
                            </svelte:fragment>
                        </AccordionItem>

                    <AccordionItem open>
                        <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
                        <svelte:fragment slot="summary">
                            <div class="flex justify-between">
                                <span class="text-left mt-1">Conocimientos necesarios</span>
                                <button
                                    type    = "button"
                                    class   = "btn btn-sm text-right bg-transparent"
                                    on:click|stopPropagation={addKnowledge}
                                >
                                    <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF" /><path d="M682.7 554.7H341.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h341.3c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.6 42.7z" fill="#5F6379" /><path d="M512 725.3c-23.6 0-42.7-19.1-42.7-42.7V341.3c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v341.3c0 23.6-19.1 42.7-42.7 42.7z" fill="#5F6379" /></svg>
                                </button>
                            </div>

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
                                            <option value="Normal">Normal</option>
                                            <option value="Intermedio">Intermedio</option>
                                            <option value="Avanzado">Avanzado</option>
                                            <option value="Experto">Experto</option>
                                            <option value="Especialista">Especialista</option>
                                            <option value="Nativo">Nativo</option>
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
                                                <span>Tiempo:</span>
                                            {/if}
                                            <div class="flex">
                                                <div class="w-[84%]">
                                                    <select class="select rounded-3xl" bind:value={item.time}>
                                                        <option value="mes(es)">mes(es)</option>
                                                        <option value="año(s)">año(s)</option>
                                                    </select>
                                                </div>
                                                <div class="w-[16%] ml-1 mt-1">
                                                    <button
                                                        type    = "button"
                                                        class   = "btn btn-sm  text-right"
                                                        on:click={() => removeKnowledge(index)}
                                                    >
                                                        <svg width="18px" height="18px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m19 0c3.3137085 0 6 2.6862915 6 6h6c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1l-3-.001v18.001c0 3.3137085-2.6862915 6-6 6h-12c-3.3137085 0-6-2.6862915-6-6v-18h-3c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h6c0-3.3137085 2.6862915-6 6-6zm7 8h-20v18c0 2.1421954 1.68396847 3.8910789 3.80035966 3.9951047l.19964034.0048953h12c2.1421954 0 3.8910789-1.6839685 3.9951047-3.8003597l.0048953-.1996403zm-13 6c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm6 0c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm0-12h-6c-2.1421954 0-3.89107888 1.68396847-3.99510469 3.80035966l-.00489531.19964034h7 7c0-2.14219539-1.6839685-3.89107888-3.8003597-3.99510469z" fill="#9f1e1e" fill-rule="nonzero" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#7f1818;"></path> </g> </g></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </svelte:fragment>
                    </AccordionItem>

                    <AccordionItem>
                        <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
                        <svelte:fragment slot="summary">
                            <div class="flex justify-between">
                                <span class="text-left mt-1">Estudios mínimos</span>
                                <button
                                    type    = "button"
                                    class   = "btn btn-sm text-right bg-transparent"
                                    on:click|stopPropagation={addMinimumStudies}
                                >
                                    <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF" /><path d="M682.7 554.7H341.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h341.3c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.6 42.7z" fill="#5F6379" /><path d="M512 725.3c-23.6 0-42.7-19.1-42.7-42.7V341.3c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v341.3c0 23.6-19.1 42.7-42.7 42.7z" fill="#5F6379" /></svg>
                                </button>
                            </div>
                            
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
                                            <span>Experiencia:</span>
                                        {/if}

                                        <div class="flex">
                                            <div class="w-[95%]">
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
                                            </div>
                                            <div class="w-[5%] ml-1 mt-1">
                                                <button
                                                    type    = "button"
                                                    class   = "btn btn-sm  text-right"
                                                    on:click={() => removeMinimumStudies(index)}
                                                >
                                                    <svg width="18px" height="18px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m19 0c3.3137085 0 6 2.6862915 6 6h6c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1l-3-.001v18.001c0 3.3137085-2.6862915 6-6 6h-12c-3.3137085 0-6-2.6862915-6-6v-18h-3c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h6c0-3.3137085 2.6862915-6 6-6zm7 8h-20v18c0 2.1421954 1.68396847 3.8910789 3.80035966 3.9951047l.19964034.0048953h12c2.1421954 0 3.8910789-1.6839685 3.9951047-3.8003597l.0048953-.1996403zm-13 6c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm6 0c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm0-12h-6c-2.1421954 0-3.89107888 1.68396847-3.99510469 3.80035966l-.00489531.19964034h7 7c0-2.14219539-1.6839685-3.89107888-3.8003597-3.99510469z" fill="#9f1e1e" fill-rule="nonzero" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#7f1818;"></path> </g> </g></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </label>
                                {/each}
                            </div>
                        </svelte:fragment>
                    </AccordionItem>
                </Accordion>

                <label class="label mt-2">
                    <span>Descripción del puesto de trabajo:</span>
                    <textarea
                        required
                        class       = "textarea"
                        on:input    = {handleInput}
                        rows        = "4"
                        maxlength   = "1000"
                        placeholder = "Ingresa una descripción clara del puesto de trabajo. Concréntrate en dar la información necesaria para el puesto de trabajo."
                        bind:value={job.description.prompt}
                    />
                    <p class="text-sm text-right">{job.description.prompt.length}/1000</p>
                </label>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label class="label">
                        <span>Requisitos deseables</span>
                        <input class=" display-none" type="email" name="" id="">
                        <InputChip
                            allowUpperCase
                            bind:value  = {job.desirables}
                            on:invalid  = {(event) => onInvalidHandler(event, job.desirables)}
                            class       = "input" 
                            maxlength   = {validInputChip.maxlength}
                            max         = {validInputChip.max}
                            minlength   = {validInputChip.minlength}
                            name        = "desirables"
                            placeholder = "Requisitos no excluyentes..."
                        />
                    </label>

                    <label class="label">
                        <span>Habilidades:</span>
                        <input class=" display-none" type="email" name="" id="">
                        <InputChip 
                            allowUpperCase
                            bind:value  = {job.skills}
                            on:invalid  = {(event) => onInvalidHandler(event, job.skills)}
                            class       = "input"
                            maxlength   = {validInputChip.maxlength}
                            max         = {validInputChip.max}
                            minlength   = {validInputChip.minlength}
                            name        = "skills"
                            placeholder = "Habilidades esperadas..."
                        />
                    </label>

                    <label class="label">
                        <span>Beneficios y compensaciones</span>
                        <input class=" display-none" type="email" name="" id="">
                        <InputChip
                            allowUpperCase
                            bind:value  = {job.benefits}
                            on:invalid  = {(event) => onInvalidHandler(event, job.benefits)}
                            class       = "input"
                            maxlength   = {validInputChip.maxlength}
                            max         = {validInputChip.max}
                            minlength   = {validInputChip.minlength}
                            name        = "benefits"
                            placeholder = "Benficios..."
                        />
                    </label>
                </div>

                <h3 class=" text-lg font-bold mt-5">Información opcional</h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                    <label class="label">
                        <span>Tareas y responsabilidades:</span>
                        <input class="display-none">
                        <InputChip 
                            bind:value      = {job.dailyTasks}
                            on:invalid      = {(event) => onInvalidHandler(event, job.dailyTasks??[])}
                            maxlength       = {validInputChip.maxlength}
                            max             = {validInputChip.max}
                            minlength       = {validInputChip.minlength}
                            class           = "input"
                            name            = "tasks"
                            placeholder     = "Tareas y responsabilidades..."
                        />
                    </label>

                    <label class="label">
                        <span>Metas y objetivos:</span>
                        <input class="display-none">
                        <InputChip 
                            bind:value      = {job.goalsObjectives}
                            on:invalid      = {(event) => onInvalidHandler(event, job.goalsObjectives??[])}
                            maxlength       = {validInputChip.maxlength}
                            max             = {validInputChip.max}
                            minlength       = {validInputChip.minlength}
                            class           = "input"
                            name            = "goals"
                            placeholder     = "Metas y objetivos que debe cumplir..."
                        />
                    </label>
                </div>

                <Accordion class="mt-2">
                    <AccordionItem>
                        <svelte:fragment slot="summary">
                            <div class="flex justify-between">
                                <span class="text-left mt-1">Información personalizada</span>
                                <button
                                    type    = "button"
                                    class   = "btn btn-sm text-right bg-transparent"
                                    on:click|stopPropagation={addCustomInfo}
                                >
                                    <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF" /><path d="M682.7 554.7H341.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h341.3c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.6 42.7z" fill="#5F6379" /><path d="M512 725.3c-23.6 0-42.7-19.1-42.7-42.7V341.3c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v341.3c0 23.6-19.1 42.7-42.7 42.7z" fill="#5F6379" /></svg>
                                </button>
                            </div>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            {#if job.customInfo}
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {#each job.customInfo as item, index }
                                    <label class="label">
                                        {#if index === 0 }
                                            <span>Nombre</span>
                                        {/if}
                                        <input
                                            class   = "input" 
                                            type    = "text" 
                                            name    = "" 
                                            id      = ""
                                            placeholder="Nombre de la información"
                                            bind:value={item.name}
                                        >
                                    </label>
    
                                    <label class="label">
                                        {#if index === 0 }
                                            <span>Valores:</span>
                                        {/if}
    
                                        <div class="flex">
                                            <div class="w-[95%]">
                                                <InputChip 
                                                    bind:value      = {item.values}
                                                    on:invalid      = {(event) => onInvalidHandler(event, item.values)}
                                                    maxlength       = {validInputChip.maxlength}
                                                    max             = {validInputChip.max}
                                                    minlength       = {validInputChip.minlength}
                                                    class           = "input"
                                                    name            = "objectives"
                                                    placeholder     = "Objetivos que puede o debe cumplir..."
                                                />
                                            </div>
                                            <div class="w-[5%] ml-1 mt-1">
                                                <button
                                                    type    = "button"
                                                    class   = "btn btn-sm  text-right"
                                                    on:click={() => removeCustomInfo(index)}
                                                >
                                                    <svg width="18px" height="18px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m19 0c3.3137085 0 6 2.6862915 6 6h6c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1l-3-.001v18.001c0 3.3137085-2.6862915 6-6 6h-12c-3.3137085 0-6-2.6862915-6-6v-18h-3c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h6c0-3.3137085 2.6862915-6 6-6zm7 8h-20v18c0 2.1421954 1.68396847 3.8910789 3.80035966 3.9951047l.19964034.0048953h12c2.1421954 0 3.8910789-1.6839685 3.9951047-3.8003597l.0048953-.1996403zm-13 6c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm6 0c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm0-12h-6c-2.1421954 0-3.89107888 1.68396847-3.99510469 3.80035966l-.00489531.19964034h7 7c0-2.14219539-1.6839685-3.89107888-3.8003597-3.99510469z" fill="#9f1e1e" fill-rule="nonzero" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#7f1818;"></path> </g> </g></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </label>
                                {/each}
                            </div>
                        {/if}
                        </svelte:fragment>
                    </AccordionItem>
                </Accordion>

                <label class="label mt-2">
                    <span>Material digital</span>
                    <input class="display-none" type="email" name="" id="">
                    <FileDropzone name="files" on:change={onChangeHandler} multiple accept="image/*,video/*">
                        <svelte:fragment slot="lead">(icon)</svelte:fragment>
                        <svelte:fragment slot="message">{dropzone}</svelte:fragment>
                        <svelte:fragment slot="meta">(meta)</svelte:fragment>
                    </FileDropzone>
                </label>

                <Accordion class="mt-2">
                    <AccordionItem>
                        <svelte:fragment slot="summary">
                            <span >Tipo de oferta:</span>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label class="label">
                                    <span>Tipo de industria de la oferta:</span>
                                    <select class="select rounded-3xl" bind:value={job.typeOfIndustry}>
                                        <option value="Servicios y tecnología de la información">Servicios y tecnología de la información</option>
                                        <option value="Programación, Consultoria y otras Activ. informaticas">Programación, Consultoria y otras Activ. informaticas</option>
                                    </select>
                                </label>

                                <label class="label">
                                    <span>Categoría:</span>
                                    <select class="select rounded-3xl" bind:value={job.category}>
                                        <option value="Informática y telecomunicaciones - Programación">Informática y telecomunicaciones - Programación</option>
                                        <option value="Informática y telecomunicaciones - Programación">Informática y telecomunicaciones - Programación</option>
                                        <option value="Calidad, producción e I+D - Medio ambiente">Calidad, producción e I+D - Medio ambiente</option>
                                        <option value="2">Otro</option>
                                    </select>
                                </label>
                            </div>
                        </svelte:fragment>
                    </AccordionItem>
                </Accordion>

                <label class="label mt-2">
                    <span>Referencias / Etiquetas</span>
                    <input class=" display-none" type="email" name="" id="">
                    <InputChip
                        allowUpperCase
                        bind:value={job.labels}
                        on:invalid  = {(event) => onInvalidHandler(event, job.labels)}
                        maxlength   = {validInputChip.maxlength}
                        max         = {validInputChip.max}
                        minlength   = {validInputChip.minlength}
                        class       = "input"
                        name        = "labels"
                        placeholder = "Referencias y/o categorías..."
                    />
                </label>

                <div class="flex mt-2">
                    <button
                        class   = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto focus:outline-none focus:shadow-outline"
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