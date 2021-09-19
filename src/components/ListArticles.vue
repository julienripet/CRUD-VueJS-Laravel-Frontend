<template>
  <div>
    <Toolbar class="
        toolbar
        p-mx-sm-0
        p-mx-md-3
        p-mx-xl-6
        p-shadow-5
    ">

      <template #left>
        <Button
          label="Créer un nouvel Article"
          icon="pi pi-plus"
          class="p-button-success p-mr-2 p-my-2"
          @click="openNew"
        />
      </template>

      <template #right>
        <Dropdown
          class="p-my-2"
          :options="archived_states"
          optionLabel="label"
          optionValue="value"
          v-model="filter_archived"
        />
      </template>

    </Toolbar>
    <DataTable
      class="
        p-datatable-sm
        p-shadow-10
        p-mx-sm-0
        p-mx-md-3
        p-mx-xl-6
        p-my-6
        p-px-sm-0
        p-px-xl-3
        p-text-center
        table
      "
      :value="filtrered_articles"
      :loading="loading"
      dataKey="id"
      responsiveLayout="stack"
      rowHover
      :rows="15"
      paginator
      paginatorPosition="both"
      breakpoint="1024px"
      :autoLayout="true"
      v-model:filters="filters"
      :globalFilterFields="['denomination', 'serial_number', 'type','repair_state']"
      filterDisplay="menu"
      stripedRows
      filterLocale="FR-fr"
      sortField="created_at"
      :sortOrder="-1"
    >

      <template #header>
        <div class="p-d-flex p-jc-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined"
            @click="clearFilter()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Recherche par libellé ou  NdS"
            />
          </span>
        </div>
      </template>
      <template #empty>
        <p class="p-text-center p-mx-auto">
          Aucun article enregistré
        </p>
      </template>

      <template #loading>
        <p class="p-text-center p-mx-auto">
          Chargement en cours, veuillez patienter...
        </p>
      </template>

      <!-- libellé -->
      <Column
        :showFilterMatchModes="false"
        :sortable="true"
        headerClass="p-text-center p-mx-auto"
        bodyClass="p-text-center p-mx-auto"
        field="denomination"
        header="Libellé"
      >
        <!-- :filterMatchModeOptions="matchModes" -->
        <template #filter="{filterModel,filterCallback}">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            :placeholder="`Tris par Libellé`"
          />
        </template>
      </Column>

      <!-- Type -->
      <Column
        :showFilterMatchModes="false"
        :sortable="true"
        headerClass="p-text-center p-mx-auto"
        bodyClass="p-text-center p-mx-auto"
        field="type"
        header="Type"
      >
        <!-- :filterMatchModeOptions="matchModes" -->
        <template #filter="{filterModel,filterCallback}">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="filterableTypes"
            optionLabel="label"
            placeholder="Tous"
            class="p-column-filter"
          >
            <template #option="slotProps">
              <div class="p-multiselect-representative-option">
                <span class="image-text">{{slotProps.option.label}}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
        <template #body="slotProps">
          <p> {{typeFormatter(slotProps.data.type)}}</p>
        </template>
      </Column>

      <!-- Etat -->
      <Column
        :showFilterMatchModes="false"
        :sortable="true"
        headerClass="p-text-center p-mx-auto"
        bodyClass="p-text-center p-mx-auto"
        field="repair_state"
        header="Etat"
      >
        <!-- :filterMatchModeOptions="matchModes" -->
        <template #filter="{filterModel,filterCallback}">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="filterableState"
            optionLabel="label"
            placeholder="Tous"
            class="p-column-filter"
          >
            <template #option="slotProps">
              <div class="p-multiselect-representative-option">
                <span class="">{{slotProps.option.label}}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
        <template #body="slotProps">
          <p
            :class="repairClass(slotProps.data.repair_state)"
            style="text-align: center;"
          > {{repairFormatter(slotProps.data.repair_state)}}</p>
        </template>
      </Column>

      <!-- Numéro de série -->
      <Column
        :showFilterMatchModes="false"
        :sortable="true"
        headerClass="p-text-center p-mx-auto header-SR"
        bodyClass="p-text-center p-mx-auto"
        field="serial_number"
        header="Numéro de série"
      >
        <!-- :filterMatchModeOptions="matchModes" -->
        <template #filter="{filterModel,filterCallback}">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            :placeholder="`Tris par Numéro de série`"
          />
        </template>
      </Column>

      <!-- Date Création -->
      <Column
        filterField="created_at"
        dataType="date"
        :sortable="true"
        headerClass="p-text-center p-mx-auto"
        bodyClass="p-text-center p-mx-auto"
        field="created_at"
        header="Date de création"
      >
        <!-- :filterMatchModeOptions="matchModes" -->
        <template #filter="{filterModel}">
          <Calendar
            v-model="filterModel.value"
            dateFormat="dd/mm/yy"
            placeholder="dd/mm/yyyy"
          />
        </template>
        <template #body="slotProps">
          <p> {{dateFormatter(slotProps.data.created_at)}}</p>
        </template>
      </Column>

      <!-- Date de modificiation -->
      <Column
        filterField="updated_at"
        dataType="date"
        :sortable="true"
        headerClass="p-text-center p-mx-auto"
        bodyClass="p-text-center p-mx-auto"
        field="updated_at"
        header="Date de modification"
      >
        <!-- :filterMatchModeOptions="matchModes" -->
        <template #filter="{filterModel}">
          <Calendar
            v-model="filterModel.value"
            dateFormat="dd/mm/yy"
            placeholder="dd/mm/yyyy"
          />
        </template>
        <template #body="slotProps">
          <p> {{dateFormatter(slotProps.data.updated_at)}}</p>
        </template>
      </Column>

      <!-- Archivé -->
      <Column
        :sortable="true"
        headerClass="p-text-center p-mx-auto"
        bodyClass="p-text-center p-mx-auto"
        field="archived"
        header="Archivé"
      >

        <template #body="slotProps">
          <p> <i
              style="  font-size: 1.3em;"
              :class="`pi pi-${boolFormatter(slotProps.data.archived)}-circle`"
            ></i></p>
        </template>
      </Column>

      <!-- Bouton éditer   -->
      <Column
        header="Modifier"
        headerClass="p-text-center p-mx-auto"
        bodyClass="p-text-center p-mx-auto"
        :exportable="false"
      >
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success "
            @click="editArticle(slotProps.data)"
          />
        </template>
      </Column>

      <!-- bouton supprimer -->
      <Column
        header="Supprimer l'article"
        headerClass="p-text-center p-mx-auto"
        bodyClass="p-text-center p-mx-auto"
        :exportable="false"
      >
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteArticle(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="askDelete"
      header="Confirmation"
      :modal="true"
    >

      <p>Etes-vous sûr de vouloir supprimer l'article {{articleToDelete.denomination}}</p>
      <template #footer>
        <Button
          @click="closeDialog"
          label="Non"
          icon="pi pi-times"
          class="p-button-text"
          style="color: var(--text-color)"
        />
        <Button
          label="Oui"
          icon="pi pi-check"
          class="p-button-text"
          style="color: var(--primary-color)"
          autofocus
          @click="deleteArticle"
        />
      </template>
    </Dialog>
  </div>

</template>

<script>
import { fetchAllArticles, deleteArticle } from "../api/ArticleService"
import { DateTime } from "luxon";
import { FilterMatchMode } from 'primevue/api';
import { FilterService } from 'primevue/api';


FilterService.register('FiltreType', (rowValue, searchValuesArray) => {

  if (searchValuesArray && Array.isArray(searchValuesArray) && searchValuesArray.length > 0) {

    let foundVal = false
    searchValuesArray.forEach(entry => {

      if (entry.value === rowValue) {
        foundVal = true
      }
    });

    return foundVal
  } else {
    return true

  }
});



export default {
  name: "ListArticles",
  created () {
    console.log(JSON.stringify(FilterService, null, 4))
    console.log(FilterService);

    this.getAllArticles()
    this.initFilters()

  },
  data () {
    return {
      articles: [],
      loading: true,
      askDelete: false,
      articleToDelete: null,
      filters: {},
      archived_states: [
        {
          value: 0,
          label: "Articles Actuels"
        },
        {
          value: 1,
          label: "Articles Archivés"
        },
        {
          value: 2,
          label: "Tous les Articles"
        }
      ],
      filter_archived: 0,
      filterableState: [
        { value: "pristine", label: "Bon état" },
        { value: "must_repair", label: "Doit être réparé" },
        { value: "been_repaired", label: "A été réparé" }
      ],
      filterableTypes: [
        { value: "tooling", label: "Outil" },
        { value: "consumable", label: "Consommable" }
      ],

    }
  },
  props: {
    toggleUpsert: { type: Function },
    setArticle: { type: Function },
  },
  methods: {
    async getAllArticles () {
      this.loading = true
      let res = await fetchAllArticles()
      if (res.data) {
        this.articles = res.data
        this.loading = false
      } else {

        this.loading = true
      }
    },

    rowClass (data) {
      console.log(JSON.stringify(data, null, 4))

      return data.repair_state === 'must_repair' ? 'must-repair' : null;
    },
    dateFormatter (date) {
      let dt = DateTime.fromJSDate(date).setLocale('fr')
      return dt.toLocaleString(DateTime.DATE_SHORT)
    },
    typeFormatter (type) {
      return type === "consumable" ? "Consomable" : "Outil"
    },
    repairFormatter (type) {
      switch (type) {
        case "pristine":
          return 'En bon état'

        case "must_repair":
          return 'Doit être réparé'

        case "been_repaired":
          return 'A été réparé'

        default:
          return "Etat inconnu"
      }
    },
    boolFormatter (bool) {
      return bool ? "check" : "times"
    },
    repairClass (state) {
      return state === 'must_repair' ? "must-repair" : "is-okay"
    },
    openNew () {
      this.setArticle(null)
      this.toggleUpsert(true)
    },
    editArticle (article) {
      this.setArticle(article)
      this.toggleUpsert(true)
    },
    confirmDeleteArticle (data) {
      this.articleToDelete = data
      this.askDelete = true
    },
    async deleteArticle () {
      let res = await deleteArticle(this.articleToDelete.id)
      if (res.data) {
        this.getAllArticles()
        this.articleToDelete = null
        this.closeDialog()
      }
    },
    closeDialog () {
      this.askDelete = false
    },
    initFilters () {
      this.filters = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'denomination': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'serial_number': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'repair_state': { value: null, matchMode: "FiltreType" },
        'type': { value: null, matchMode: "FiltreType" },
        'created_at': { value: null, matchMode: FilterMatchMode.DATE_IS },
        'updated_at': { value: null, matchMode: FilterMatchMode.DATE_IS },
      }
    },
    clearFilter () {
      this.initFilters();
    },

  },
  computed: {
    filtrered_articles () {
      let allArticles = [...this.articles]

      let filteredArticles = allArticles.filter(article => {
        if (this.filter_archived === 2) {
          return true
        } else {
          return article.archived === this.filter_archived
        }
      })

      filteredArticles.forEach(article => {
        article.created_at = new Date(article.created_at)
        article.updated_at = new Date(article.updated_at)
      })

      return filteredArticles
    }
  }
}
</script>

<style scoped>
/* .toolbar{} */
.table {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
}
.is-okay {
  color: #22ff22 !important;
  font-weight: 600;
}

.must-repair {
  color: #ee591f !important;
  font-weight: 600;
}

.pi-times-circle {
  color: red !important;
}

.pi-check-circle {
  color: green !important;
}

.header-SR > .p-column-header-content {
  width: max-content !important;
  margin: auto !important;
}
</style>