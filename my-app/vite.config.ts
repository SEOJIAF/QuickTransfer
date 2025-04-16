import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        alias: {
            $app: path.resolve('.svelte-kit/runtime/app'),
            $lib: path.resolve('./src/lib')
        }
    }
});