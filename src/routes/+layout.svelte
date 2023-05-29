<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.postcss';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import { AppShell, AppBar, storePopup, Toast, RadioGroup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import {navigate} from '../store/store';
    import { onMount } from 'svelte';
	import Footer from '$lib/components/footer/footer.svelte';

	import '../app.postcss';

	onMount(() => {
		const currentURL = window.location.pathname;
		change( currentURL );
	});

	function changePage( url: string ) {
		change( url );
		goto( url );
	}

	function change( url:string ) {
		const value = {
			'/'					: [true, false, false],
			'/job'				: [false, true, false],
			'/job-application'	: [false, false, true]
		}[ url ] || [false, false, false];

		navigate.set(value);
	}

</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<h1 class="text-2xl"><span class="text-sky-500">InfoJobs </span><span class=" text-teal-500"> Hackathon</span></h1>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
					<button
						type    = "button"
						class   = "btn btn-sm text-right {$navigate[0] ? 'variant-filled-primary' : ''}  hover:variant-soft-primary"
						on:click={() => changePage('/')}
					>
						Inicio
					</button>
					<button
						type    = "button"
						class   = "btn btn-sm text-right {$navigate[1] ? 'variant-filled-primary' : ''} hover:variant-soft-primary"
						on:click={() => changePage('/job')}
					>
						Publicación
					</button>
					<button
						type    = "button"
						class   = "btn btn-sm text-right {$navigate[2] ? 'variant-filled-primary' : ''} hover:variant-soft-primary"
						on:click={() => changePage('/job-application')}
					>
						Postulación
					</button>
				</RadioGroup>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<Footer />
</AppShell>

<Toast />