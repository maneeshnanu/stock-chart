<template>
  <div class="footer">
    <nav class="is-spaced has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <div class="hero-body">
            <p class="has-text-grey">
              Sample
              <strong class="has-text-grey-dark">Stock chart</strong>
              application
            </p>
            <p>
              By
              <a
                href="https://github.com/maneeshnanu/stock-chart"
                target="_blank"
                style="text-decoration: underline"
                >Maneesh Nanu</a
              >
            </p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: #fff;
  padding: 0;
  .is-spaced {
    padding: 1rem 2rem;
  }
  .has-shadow {
    -webkit-box-shadow: 0 0px 2px 0px #ccc;
    box-shadow: 0 0px 2px 0px #ccc;
    .hero-body {
      padding: 0;
    }
  }
}
</style>
