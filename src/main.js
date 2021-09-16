import {createApp} from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';

// Styles, themes, icons
import "./assets/themes/default.css"                //theme
import "primevue/resources/primevue.min.css"        //core css
import "primeicons/primeicons.css"                  //icons

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const app = createApp(App);

app.use(PrimeVue);

//Globaly usable Components
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Button", Button);
app.component("InputText", InputText);

app.mount('#app')