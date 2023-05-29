<script lang="ts">
	import { navigate } from '../../../store/store';
	import { goto }     from '$app/navigation';

    function changePage( url: string ) {
		const value = {
			'/'					: [true, false, false],
			'/job'				: [false, true, false],
			'/job-application'	: [false, false, true]
		}[ url ] || [false, false, false];

		navigate.set(value);
		goto( url );
	}

</script>

<div class="flex justify-center ">
	<section class="img-bg" />
</div>
<main class="container mx-auto px-4 py-10">
	<section class=" mb-8">
		<h1 class="h1 mb-5">
			<span class="text-sky-400">Job</span>Ease
		</h1>
		<h2 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text">Simplifica y Mejora tu Experiencia de Búsqueda y Postulación de Empleo</h2>
		<p class="mb-4 mt-2">JobEase es una solución innovadora que simplifica el proceso de publicación de empleos en InfoJobs y mejora la experiencia tanto para los empleadores como para los postulantes.</p>
		<p class="mb-4">Con JobEase, los empleadores pueden publicar empleos de manera más rápida y sencilla a través de un formulario intuitivo, evitando la necesidad de escribir largos textos. Además, ofrecemos asistencia de inteligencia artificial para mejorar las descripciones de los empleos y brindar consejos para optimizar la redacción.</p>
		<p class="mb-4">Para los postulantes, JobEase ofrece un filtro de compatibilidad con el empleo, lo que les permite evaluar qué tan compatible es su currículum con el puesto de trabajo. Esto les proporciona una mayor confianza al postularse, ahorrando tiempo y esfuerzo al encontrar empleos adecuados a su perfil.</p>
	</section>

    <button
        type="button"
        class="btn btn-lg variant-filled-secondary mr-5"
        on:click={() => changePage('/job')}
    >
        <span>
            <svg width="30px" height="30px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#ff9d27"> <path d="M10.9 48.7c4-4 4.4-5 6.9-2.5s1.5 2.8-2.5 6.9c-3 3-6.8 2.4-6.8 2.4s-.6-3.8 2.4-6.8"> </path> <path d="M18.5 52.8c1.6-4.2 2.1-4.7-.2-6c-2.3-1.3-2.3-.4-3.8 3.8c-1.2 3.1.2 5.9.2 5.9s2.7-.5 3.8-3.7"> </path> </g> <path d="M16.2 48.9c.9-2.3.9-2.8 2.1-2.1c1.3.7 1 1 .1 3.3c-.6 1.7-2.1 2.1-2.1 2.1s-.7-1.5-.1-3.3" fill="#fdf516"> </path> <path d="M17.1 45.7c-1.3-2.3-1.8-1.8-6-.2c-3.1 1.2-3.7 3.8-3.7 3.8s2.8 1.4 5.9.2c4.2-1.6 5.1-1.6 3.8-3.8" fill="#ff9d27"> </path> <g fill="#fdf516"> <path d="M15 47.8c2.3-.9 2.8-.9 2.1-2.1c-.7-1.3-1-1-3.3-.1c-1.7.6-2.1 2.1-2.1 2.1s1.6.7 3.3.1"> </path> <path d="M13.9 47.6c2.2-2.2 2.4-2.8 3.8-1.4s.8 1.6-1.4 3.8c-1.7 1.7-3.8 1.3-3.8 1.3s-.2-2 1.4-3.7"> </path> </g> <path d="M18.5 38C12.3 27.6 2 31.9 2 31.9s14.7-14.7 24.6-4.8L18.5 38z" fill="#3baacf"> </path> <path d="M23.3 30.3l3.2-3.2C16.7 17.2 2 31.9 2 31.9s12.9-9.2 21.3-1.6" fill="#428bc1"> </path> <path d="M26 45.5C36.4 51.7 32.1 62 32.1 62s14.7-14.7 4.8-24.6L26 45.5z" fill="#3baacf"> </path> <path d="M33.7 40.7l3.2-3.2c9.9 9.9-4.8 24.6-4.8 24.6s9.2-13 1.6-21.4" fill="#428bc1"> </path> <path d="M48.8 30.9C37.1 42.5 24.2 48.8 19.7 44.3c-4.5-4.5 1.8-17.4 13.4-29.1c13.6-13.6 28.7-13 28.7-13s.5 15.1-13 28.7" fill="#c5d0d8"> </path> <path d="M45.8 27.6C34.2 39.2 22.6 46.8 19.9 44.1c-2.7-2.7 4.9-14.3 16.5-25.9C50 4.6 62 2 62 2s-2.6 12-16.2 25.6z" fill="#dae3ea"> </path> <path d="M24.3 47.5c-.5.5-1.3.5-1.8 0l-6-6c-.5-.5-.5-1.4 0-1.9l1.8-1.8l7.8 7.8l-1.8 1.9" fill="#c94747"> </path> <path d="M22.6 45.7c-.5.5-1.1.7-1.4.4l-3.4-3.4c-.3-.3-.1-.9.4-1.4l1.8-1.8l4.4 4.4l-1.8 1.8" fill="#f15744"> </path> <path d="M20.9 48.2c-.3.3-1 .3-1.3 0l-3.9-3.9c-.3-.3-.2-.9.1-1.2l1.2-1.2l5.1 5.1l-1.2 1.2" fill="#3e4347"> </path> <path d="M20.1 47.4c-.3.3-.9.4-1.1.2l-2.7-2.7c-.2-.2-.1-.7.3-1l1.2-1.2l3.5 3.5l-1.2 1.2" fill="#62727a"> </path> <path d="M61.8 2.2S56.4 2 49.1 4.8l10.1 10.1C62 7.6 61.8 2.2 61.8 2.2" fill="#c94747"> </path> <path d="M61.8 2.2s-4.3.9-10.8 4.6l6.2 6.2c3.7-6.5 4.6-10.8 4.6-10.8" fill="#f15744"> </path> <circle cx="43.5" cy="20.5" r="5" fill="#edf4f9"> </circle> <circle cx="43.5" cy="20.5" r="3.3" fill="#3baacf"> </circle> <circle cx="33.5" cy="30.5" r="5" fill="#edf4f9"> </circle> <circle cx="33.5" cy="30.5" r="3.3" fill="#3baacf"> </circle> <g fill="#ffffff"> <path d="M48.9 6.9c-.3.3-.9.3-1.2 0c-.3-.3-.3-.9 0-1.2c.3-.3.9-.3 1.2 0c.3.3.3.9 0 1.2"> </path> <circle cx="50.6" cy="8.6" r=".8"> </circle> <circle cx="53" cy="11" r=".8"> </circle> <circle cx="55.3" cy="13.4" r=".8"> </circle> <circle cx="57.7" cy="15.7" r=".8"> </circle> </g> </g></svg>
        </span>
        <span>Comienza a Publicar</span>
    </button>

    <button
        type="button"
        class="btn btn-lg variant-filled-secondary"
        on:click={() => changePage('/job-application')}
    >
        <span>
            <svg width="30px" height="30px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#ff9d27"> <path d="M10.9 48.7c4-4 4.4-5 6.9-2.5s1.5 2.8-2.5 6.9c-3 3-6.8 2.4-6.8 2.4s-.6-3.8 2.4-6.8"> </path> <path d="M18.5 52.8c1.6-4.2 2.1-4.7-.2-6c-2.3-1.3-2.3-.4-3.8 3.8c-1.2 3.1.2 5.9.2 5.9s2.7-.5 3.8-3.7"> </path> </g> <path d="M16.2 48.9c.9-2.3.9-2.8 2.1-2.1c1.3.7 1 1 .1 3.3c-.6 1.7-2.1 2.1-2.1 2.1s-.7-1.5-.1-3.3" fill="#fdf516"> </path> <path d="M17.1 45.7c-1.3-2.3-1.8-1.8-6-.2c-3.1 1.2-3.7 3.8-3.7 3.8s2.8 1.4 5.9.2c4.2-1.6 5.1-1.6 3.8-3.8" fill="#ff9d27"> </path> <g fill="#fdf516"> <path d="M15 47.8c2.3-.9 2.8-.9 2.1-2.1c-.7-1.3-1-1-3.3-.1c-1.7.6-2.1 2.1-2.1 2.1s1.6.7 3.3.1"> </path> <path d="M13.9 47.6c2.2-2.2 2.4-2.8 3.8-1.4s.8 1.6-1.4 3.8c-1.7 1.7-3.8 1.3-3.8 1.3s-.2-2 1.4-3.7"> </path> </g> <path d="M18.5 38C12.3 27.6 2 31.9 2 31.9s14.7-14.7 24.6-4.8L18.5 38z" fill="#3baacf"> </path> <path d="M23.3 30.3l3.2-3.2C16.7 17.2 2 31.9 2 31.9s12.9-9.2 21.3-1.6" fill="#428bc1"> </path> <path d="M26 45.5C36.4 51.7 32.1 62 32.1 62s14.7-14.7 4.8-24.6L26 45.5z" fill="#3baacf"> </path> <path d="M33.7 40.7l3.2-3.2c9.9 9.9-4.8 24.6-4.8 24.6s9.2-13 1.6-21.4" fill="#428bc1"> </path> <path d="M48.8 30.9C37.1 42.5 24.2 48.8 19.7 44.3c-4.5-4.5 1.8-17.4 13.4-29.1c13.6-13.6 28.7-13 28.7-13s.5 15.1-13 28.7" fill="#c5d0d8"> </path> <path d="M45.8 27.6C34.2 39.2 22.6 46.8 19.9 44.1c-2.7-2.7 4.9-14.3 16.5-25.9C50 4.6 62 2 62 2s-2.6 12-16.2 25.6z" fill="#dae3ea"> </path> <path d="M24.3 47.5c-.5.5-1.3.5-1.8 0l-6-6c-.5-.5-.5-1.4 0-1.9l1.8-1.8l7.8 7.8l-1.8 1.9" fill="#c94747"> </path> <path d="M22.6 45.7c-.5.5-1.1.7-1.4.4l-3.4-3.4c-.3-.3-.1-.9.4-1.4l1.8-1.8l4.4 4.4l-1.8 1.8" fill="#f15744"> </path> <path d="M20.9 48.2c-.3.3-1 .3-1.3 0l-3.9-3.9c-.3-.3-.2-.9.1-1.2l1.2-1.2l5.1 5.1l-1.2 1.2" fill="#3e4347"> </path> <path d="M20.1 47.4c-.3.3-.9.4-1.1.2l-2.7-2.7c-.2-.2-.1-.7.3-1l1.2-1.2l3.5 3.5l-1.2 1.2" fill="#62727a"> </path> <path d="M61.8 2.2S56.4 2 49.1 4.8l10.1 10.1C62 7.6 61.8 2.2 61.8 2.2" fill="#c94747"> </path> <path d="M61.8 2.2s-4.3.9-10.8 4.6l6.2 6.2c3.7-6.5 4.6-10.8 4.6-10.8" fill="#f15744"> </path> <circle cx="43.5" cy="20.5" r="5" fill="#edf4f9"> </circle> <circle cx="43.5" cy="20.5" r="3.3" fill="#3baacf"> </circle> <circle cx="33.5" cy="30.5" r="5" fill="#edf4f9"> </circle> <circle cx="33.5" cy="30.5" r="3.3" fill="#3baacf"> </circle> <g fill="#ffffff"> <path d="M48.9 6.9c-.3.3-.9.3-1.2 0c-.3-.3-.3-.9 0-1.2c.3-.3.9-.3 1.2 0c.3.3.3.9 0 1.2"> </path> <circle cx="50.6" cy="8.6" r=".8"> </circle> <circle cx="53" cy="11" r=".8"> </circle> <circle cx="55.3" cy="13.4" r=".8"> </circle> <circle cx="57.7" cy="15.7" r=".8"> </circle> </g> </g></svg>
        </span>
        <span>Comienza a Postular</span>
    </button>

	<section class="mt-6 mb-8">
		<h2 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-800 text-transparent bg-clip-text mb-4">Características principales</h2>
		<dl class="list-dl">
			<div>
				<span class="badge bg-primary-500"><svg height="15px" width="15px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path> </g> </g></svg></span>
				<span class="flex-auto">
					<dt>Publicación simplificada de empleos con formulario intuitivo.</dt>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"><svg height="15px" width="15px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path> </g> </g></svg></span>
				<span class="flex-auto">
					<dt>Asistencia de inteligencia artificial para mejorar las descripciones de los empleos.</dt>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"><svg height="15px" width="15px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path> </g> </g></svg></span>
				<span class="flex-auto">
					<dt>Tabla de requisitos clasificados por niveles para hacer las publicaciones más concisas.</dt>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"><svg height="15px" width="15px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path> </g> </g></svg></span>
				<span class="flex-auto">
					<dt>Calificación de estrellas del 0 al 5 para evaluar la calidad de las descripciones de empleo.</dt>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"><svg height="15px" width="15px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path> </g> </g></svg></span>
				<span class="flex-auto">
					<dt>Posibilidad de subir archivos de video e imágenes para enriquecer la experiencia del postulante.</dt>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"><svg height="15px" width="15px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path> </g> </g></svg></span>
				<span class="flex-auto">
					<dt>Cuenta con un previsualizador para saber como quedaría la postulación.</dt>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"><svg height="15px" width="15px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path> </g> </g></svg></span>
				<span class="flex-auto">
					<dt>Filtro de compatibilidad con el empleo para una mejor selección de postulantes.</dt>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"><svg height="15px" width="15px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"></path> </g> </g></svg></span>
				<span class="flex-auto">
					<dt>Postular a múltiples empleos seleccionados con un solo botón.</dt>
				</span>
			</div>
		</dl>
	</section>
</main>

<style lang="postcss">
	.img-bg {
		@apply w-96 h-96 md:w-1/2 md:h-1/2;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/10;
		}
		33% {
			@apply bg-secondary-400/10;
		}
		66% {
			@apply bg-tertiary-400/10;
		}
		100% {
			@apply bg-primary-400/10;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>