<script lang="ts">
	import '../app.postcss';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import { AppShell, AppBar, storePopup, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	import '../app.postcss';

	let value: number = 0;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">InfoJobs</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
						<a
							href="/"
							rel="prefetch"
						>
							<RadioItem bind:group={value} name="justify" value={0}>Inicio</RadioItem>
						</a>
						<a
							href	= "job"
							rel		= "prefetch"
						>
							<RadioItem bind:group={value} name="justify" value={1}>Publicación</RadioItem>
						</a>
						<a
							href="job-application"
							rel="prefetch"
						>
							<RadioItem bind:group={value} name="justify" value={2}>Postulación</RadioItem>
						</a>
				</RadioGroup>
				
				
				
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>

<Toast />