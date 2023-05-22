<script lang="ts">
	import '../app.postcss';
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import { AppShell, AppBar, storePopup, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import '../app.postcss';

</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">InfoJobs</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/"
					rel="prefetch"
				>
					Discord
				</a>
				<a
					class	= "btn btn-sm variant-ghost-surface"
					href	= "job"
					rel		= "prefetch"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<a
					class="btn variant-filled"
					href='/profile'
					rel="prefetch"
				> 
					Profile
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
    <div><p>Demo Content</p></div>
    <div class="arrow bg-surface-100-800-token" />
</div>
<Toast />