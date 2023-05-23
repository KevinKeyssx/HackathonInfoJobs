<script lang="ts">
    import type { TKnowledge, TStudies } from '../../../models/jobs';

    export let knowledges       : TKnowledge[] = [];
    export let title            : string = '';
    export let vacancies        : number = 0;
    export let level            : string = '';
    export let personnel        : number = 0;
    export let labels           : string[] = [];
    export let desirables       : string[] = [];
    export let skills           : string[] = [];
    export let benefits         : string[] = [];
    export let minimumStudies   : TStudies[] = [];
    export let description      : string = '';
    export let files: FileList | null = null;

    let selectedFileVideo: File | null = null;
    let videoUrl: string = "";

    function handleFileVideoUpload(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            selectedFileVideo = files[0];
            videoUrl = URL.createObjectURL(selectedFileVideo);
        }
    }

    function transformToStringArray(file: File): string {

       return URL.createObjectURL(file);
    }

    let selectedFile: File | null = null;
    let imageUrl: string = "";

    function handleFileUpload(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            selectedFile = files[0];
            imageUrl = URL.createObjectURL(selectedFile);
        }
    }

</script>

<style>
</style>

<div class="flex w-11/12">
    <div class="shadow-xl rounded px-8 py-6 w-11/12">
        <div class="mb-4"> 
            <h1 class="text-2xl font-bold">{title|| 'Sin título'}</h1>
            <p>Información</p>
            <span class="chip variant-filled-primary mt-2">En Madrid</span>
            <span class="chip variant-filled-primary mt-2">Presencial</span>
            <span class="chip variant-filled-primary mt-2">Salario no disponible</span>
            <span class="chip variant-filled-primary mt-2">1 año de experiencia</span>
            <span class="chip variant-filled-primary mt-2">Contrato indefinido</span>
            <span class="chip variant-filled-primary mt-2">Jornada completa</span>
            <span class="chip variant-filled-primary mt-2">{vacancies} vacantes</span>
            <span class="chip variant-filled-primary mt-2">{level}</span>
            <span class="chip variant-filled-primary mt-2">{personnel} personas a cargo</span>
        </div>
    </div>
</div>

<div class="flex w-11/12">
    <div class="shadow-xl rounded px-8 py-6 w-11/12">
        <div class="mb-4"> 
            <h2 class="text-2xl font-bold">Requisitos</h2>

            <h3>Estudios mínimos</h3>
            {#each minimumStudies as study}
                <p>{study.name} - {study.experience} año(s)</p>
            {/each}

            <h3>Conocimientos mínimos</h3>

            <div class="max-w-screen-md mx-auto">
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
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    <div class="text-sm max-h-16 overflow-y-auto">
                                        {item.description}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm ">{item.level}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm "> {item.experience} {item.time}</div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <h3>Requisitos deseables</h3>
            {#each desirables as desirable}
                <span class="chip variant-filled-surface mr-1 mt-2">{desirable}</span>
            {/each}

            <h3>Habilidades</h3>
            {#each skills as item}
                <span class="chip variant-filled-surface mr-1 mt-2">{item}</span>
            {/each}

            <h3>Descripción</h3>
            <p>{@html description || "Sin descripción"}</p>

            <h3>Beneficios y compensaciones</h3>
            {#each benefits as benefit}
                <span class="chip variant-filled-surface mr-1 mt-2">{benefit}</span>
            {/each}

            <br>
            <input type="file" accept="video/*" on:change={handleFileVideoUpload} />

            <input type="file" accept="image/*" on:change={handleFileUpload} multiple />

            <br>
            <h3>Material audiovisual</h3>

            

            {#if videoUrl}
            <br>
                <video
                    src={videoUrl}
                    controls
                    width="100px"
                >
                    <track kind="captions"  srclang="es" label="Spanish" default />
                </video>
            {/if}

            {#if files}
                <h3>Archivos</h3>
                {#each Array.from(files) as file }
                    <video
                        src={transformToStringArray(file)}
                        controls
                        width="100px"
                    >
                        <track kind="captions"  srclang="es" label="Spanish" default />
                    </video>
                {/each}
            {/if}

            {#if imageUrl}
                <img
                    src={imageUrl}
                    alt="Preview"
                    width="100px"
                />
            {/if}



            {#if labels.length > 0}
                <h3>Referencias / Etiquetas</h3>
                {#each labels as label }
                    <span class="chip variant-filled-primary mr-1">{label}</span>
                {/each}
            {/if}

        </div>
    </div>
</div>