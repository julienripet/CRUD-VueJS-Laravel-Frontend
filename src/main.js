import {createApp} from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';

// Styles, themes, icons
import "./assets/themes/default.css"                //theme
import "primevue/resources/primevue.min.css"        //core css
import "primeicons/primeicons.css"                  //icons

import 'primeflex/primeflex.css';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Toolbar from "primevue/toolbar"
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import MultiSelect from 'primevue/multiselect'
import Calendar from 'primevue/calendar';

const app = createApp(App);

app.use(PrimeVue);

//Globaly usable Components
app.component("DataTable", DataTable);
app.component("Textarea", Textarea);
app.component("Column", Column);
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("RadioButton", RadioButton);
app.component("Checkbox", Checkbox);
app.component("Dropdown", Dropdown);
app.component("Toolbar", Toolbar);
app.component("InputText", InputText);
app.component("MultiSelect", MultiSelect);
app.component("Calendar", Calendar);

app.mount('#app')