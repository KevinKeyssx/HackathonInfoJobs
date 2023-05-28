<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import Readme from '../lib/components/readme/readme.svelte';
</script>

<div class="flex justify-center h-full items-center">
	<div class="max-w-4xl w-11/12 md:w-4/5">

		<div class="card variant-ghost-surface p-10">
			<h1 class="h1">
				<span class="text-sky-400">Job</span>Ease
			</h1>
			<p>Simplifica y Mejora tu Experiencia de Búsqueda y Postulación de Empleo.</p>
		</div>

		<div class="flex justify-center ">
			<section class="img-bg" />
		</div>

		<div class="card variant-ghost-surface p-10 mt-5">
			<h2 class="text-xl font-semibold">Publicación simplificada de empleos</h2>
			<p class="mt-4">
				Nuestra solución simplifica el proceso de publicación de empleos en InfoJobs. Ahora, la persona encargada no tiene que
				escribir largos textos, sino que se guía a través de un formulario intuitivo. Además, hemos incorporado una tabla con
				los requisitos necesarios clasificados por niveles, lo que nos permite ahorrar espacio y hacer la publicación más
				concisa. Todo esto se complementa con el uso de diseños personalizados utilizando Tailwind CSS para mejorar la
				visualización de los empleos y facilitar la lectura.
			</p>
			<p class="mt-4">
				Además, hemos incorporado inteligencia artificial para ayudar a mejorar las descripciones de los empleos. Ofrecemos
				consejos y sugerencias para optimizar la redacción, brindando una calificación del 0 al 5 estrellas para evaluar la
				calidad de la descripción. Esto permite a los empleadores obtener una descripción más atractiva y efectiva, lo que a
				su vez aumenta las posibilidades de atraer a candidatos altamente calificados.
			</p>
			<p class="mt-4">
				También hemos agregado la opción de subir archivos de video e imágenes, lo que mejora la interacción con los
				postulantes. Ahora pueden ver cómo es la oficina donde trabajarían, conocer más sobre el puesto de trabajo o incluso
				familiarizarse con el equipo con el que colaborarían. Esta función enriquece la experiencia del postulante y les brinda
				una visión más completa del empleo.
			</p>
		</div>

		<div class="card variant-ghost-surface p-10 mt-5">
			<h3 class="text-xl font-semibold">Mejora en la postulación</h3>
			<p class="mt-4">
				Nuestra segunda solución se enfoca en mejorar el proceso de postulación en InfoJobs. Hemos añadido un nuevo filtro de
				compatibilidad con el empleo, donde los candidatos pueden evaluar del 0 al 100% qué tan compatible es su currículum con
				el puesto de trabajo. Esto les brinda una mejor comprensión de si cumplen con los requisitos y habilidades necesarios.
			</p>
			<p class="mt-4">
				Con esta funcionalidad, los postulantes pueden postularse a múltiples puestos de trabajo seleccionados con un solo
				botón, sin necesidad de revisar en detalle cada descripción de empleo. Al contar con el filtro de compatibilidad,
				tienen más confianza de que encajan en el perfil buscado, ahorrando tiempo y esfuerzo en su búsqueda laboral.
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.img-bg {
		@apply w-3/4 h-3/4 md:w-full md:h-full;
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
