<script lang="ts">
	import saveAs from 'file-saver';
	import JSZip from 'jszip';
	import type { FileContent } from './interfaces';

	export let files: FileContent[] = [];
	export let title: string;

	function handleClickDownload() {
		const zip = new JSZip();

		files.forEach((file) => {
			zip.file(file.name, file.content);
		});
		zip.generateAsync({ type: 'blob' }).then((content) => {
			saveAs(content, `${title}.zip`);
		});
	}
</script>

<button type="button" class="btn variant-filled" on:click={handleClickDownload}>
	<span><i class="fa-solid fa-download" /></span>
	<span>Download</span>
</button>
