<template>
  <DataTable
    class="
      p-shadow-10
      p-mx-sm-0
      p-mx-md-3
      p-mx-xl-6
      p-px-sm-0
      p-px-xl-3
      table
      p-text-center
    "
    :value="articles"
    :loading="loading"
    responsiveLayout="stack"
    rowHover
    :rows="15"
    paginator
    paginatorPosition="both"
    breakpoint="1024px"
  >

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
      :sortable="true"
      headerClass="p-text-center p-mx-auto"
      bodyClass="p-text-center p-mx-auto"
      field="denomination"
      header="Libellé"
    ></Column>

    <!-- Type -->
    <Column
      :sortable="true"
      headerClass="p-text-center p-mx-auto"
      bodyClass="p-text-center p-mx-auto"
      field="type"
      header="Type"
    >
      <template #body="slotProps">
        <p> {{typeFormatter(slotProps.data.type)}}</p>
      </template>
    </Column>

    <!-- Etat -->
    <Column
      :sortable="true"
      headerClass="p-text-center p-mx-auto"
      bodyClass="p-text-center p-mx-auto"
      field="repair_state"
      header="Etat"
    >
      <template #body="slotProps">
        <p
          :class="repairClass(slotProps.data.repair_state)"
          style="text-align: center;"
        > {{repairFormatter(slotProps.data.repair_state)}}</p>
      </template>
    </Column>

    <!-- Numéro de série -->
    <Column
      :sortable="true"
      headerClass="p-text-center p-mx-auto"
      bodyClass="p-text-center p-mx-auto"
      field="serial_number"
      header="Numéro de série"
    ></Column>

    <!-- Date Création -->
    <Column
      :sortable="true"
      headerClass="p-text-center p-mx-auto"
      bodyClass="p-text-center p-mx-auto"
      field="created_at"
      header="Date de création"
    >
      <template #body="slotProps">
        <p> {{dateFormatter(slotProps.data.created_at)}}</p>
      </template>
    </Column>

    <!-- Date de modificiation -->
    <Column
      :sortable="true"
      headerClass="p-text-center p-mx-auto"
      bodyClass="p-text-center p-mx-auto"
      field=""
      header="Date de création"
    >
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

    <!-- Supprimé -->
    <Column
      :sortable="true"
      headerClass="p-text-center p-mx-auto"
      bodyClass="p-text-center p-mx-auto"
      field="deleted_at"
      header="Supprimé"
    >
      <template #body="slotProps">
        <p> <i
            style="  font-size: 1.3em;"
            :class="`pi pi-${boolFormatter(slotProps.data.deleted_at)}-circle`"
          ></i></p>
      </template>
    </Column>

  </DataTable>

</template>

<script>
import { fetchAllArticles } from "../api/ArticleService"
import { DateTime } from "luxon";


export default {
  data () {
    return {
      articles: [],
      loading: true,
    }
  },
  created () {
    this.getAllArticles()
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
      let dt = DateTime.fromISO(date).setLocale('fr')
      return dt.toLocaleString(DateTime.DATETIME_SHORT)
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
    }
  }
}
</script>

<style scoped>
.table {
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
</style>