<template>
  <b-sidebar
    position="static"
    :fullheight="true"
    :mobile="mobile"
    :expand-on-hover="expandOnHover"
    :reduce="reduce"
    type="is-light"
    open
  >
    <nav class="panel">
      <p class="panel-heading p-2">Symbols</p>
      <b-field class="p-2">
        <b-autocomplete
          rounded
          v-model="name"
          :data="filteredDataArray"
          placeholder="Find a Security Name"
          field="securityName"
          icon="magnify"
          clearable
          @select="select"
        >
          <template #empty>No results found</template>
        </b-autocomplete>
      </b-field>
      <a
        v-for="(stock, index) in symbols"
        @click="update(stock)"
        class="panel-block is-justify-content-space-between"
        :key="index"
      >
        <div class="is-pulled-left">{{ stock.securityName }}</div>
      </a>
    </nav>
  </b-sidebar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
      name: "",
      selected: null,
    };
  },
  computed: {
    ...mapGetters(["symbols"]),
    filteredDataArray() {
      return this.symbols.filter((option) => {
        return (
          option.securityName
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        );
      });
    },
  },
  methods: {
    update(stock) {
      this.selected = stock;
      this.$store.commit("SET_SYMBOL", stock);
      this.$store.dispatch("loadSymbolData", stock.symbol);
    },
    select(option) {
      this.selected = option;
    },
    // TO BE Implemented In case the symbol is not avaiable in store
    addSymbol(symbol) {
      this.$store.commit("ADD", symbol);
    },
  },
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.is-mini-expand {
  .menu-list a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
