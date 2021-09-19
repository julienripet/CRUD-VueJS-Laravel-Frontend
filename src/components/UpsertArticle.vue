<template>
  <Dialog
    :visible="open"
    :modal="true"
    @hide="closeDialog"
    dismissableMask
    :closable="false"
  >
    <template #header>
      <h3>{{newArticle ? "Créer un nouvel article" : `Modifier l'article ${article.denomination}`}}</h3>
    </template>
    <form class="p-fluid">

      <!-- Libellé -->
      <span class="p-float-label p-my-2 field p-grid">
        <InputText
          id="denomination"
          type="text"
          v-model="article.denomination"
        />
        <label for="denomination">Libellé</label>
      </span>

      <!-- S/R -->
      <span class="p-float-label p-my-3 field p-grid">
        <Textarea
          id="serial_number"
          v-model="article.serial_number"
          :autoResize="true"
        />
        <label for="serial_number">Numéro de Série</label>
      </span>

      <!-- Etat réparé -->
      <Dropdown
        class=" p-my-3 field p-grid"
        v-model="article.repair_state"
        :options="repair_states"
        optionLabel="label"
        optionValue="value"
        placeholder="Etat"
      />

      <!-- Type -->
      <div class="p-d-flex  p-jc-between p-my-3 field p-grid">
        <span class="p-field-radiobutton">
          <label for="tooling">Outillage:</label>
          <RadioButton
            name="tooling"
            value="tooling"
            v-model="article.type"
          />
        </span>

        <span class="p-field-radiobutton">
          <label for="consumable">Consomable:</label>
          <RadioButton
            name="consumable"
            value="consumable"
            v-model="article.type"
          />
        </span>
      </div>

      <!-- Archivé -->
      <div class="p-d-flex  p-jc-evenly p-mt-3 field p-grid p-field-checkbox">
        <label for="archived">Archivé :</label>
        <Checkbox
          name="archived"
          value="Archivé"
          v-model="article.archived"
          :binary="true"
          :trueValue="1"
          :falseValue="0"
        />
      </div>

      <!-- Boutons Actions -->

    </form>
    <template #footer>
      <div class="p-d-flex p-jc-bewteen">
        <Button
          @click="closeDialog"
          label="Annuler"
          icon="pi pi-times"
          class="p-button-text p-mx-2"
        />
        <Button
          @click="handleClick"
          class=" p-mx-2"
          label="Confirmer"
          icon="pi pi-check"
        />
      </div>
    </template>

  </Dialog>
</template>

<script>
import { postArticle, putArticle } from '../api/ArticleService'

export default {
  name: "UpsertArticle",
  data () {
    return {
      article: {},
      repair_states: [
        {
          value: "pristine",
          label: "En bon état"
        },
        {
          value: "must_repair",
          label: "Doit être réparé"
        },
        {
          value: "been_repaired",
          label: "A été réparé"
        },
      ]
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    toggleOpen: {
      type: Function,
      required: true
    },
    newArticle: {
      type: Boolean,
      required: true
    },
    editingArticle: {
      type: Object,
    }
  },
  updated () {
    if (!this.newArticle) {
      this.article = { ...this.editingArticle }
    } else {
      this.article = {}
    }
  },
  methods: {
    closeDialog () {
      this.toggleOpen(false)
    },
    handleClick () {
      if (this.newArticle) {
        this.saveNew()
      } else {
        this.saveEdit()
      }
    },
    async saveNew () {
      let res = await postArticle(this.article)
      if (res.data) {
        console.log(res.data);
        this.$emit('reloadArticles')
        this.closeDialog()
      } else {
        console.log(res.data);

      }
    },
    async saveEdit () {
      let res = await putArticle(this.article)
      if (res.data) {
        console.log(res.data);
        this.$emit('reloadArticles')
        this.closeDialog()
      } else {
        console.log(res.data);

      }
    },
  }

}
</script>

<style>
</style>