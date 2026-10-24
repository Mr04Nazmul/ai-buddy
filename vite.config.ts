import {defineConfig} from 'vite';
export default defineConfig({base:'./',server:{allowedHosts:['terminal.local']},worker:{format:'es'},build:{target:'es2022'}});
