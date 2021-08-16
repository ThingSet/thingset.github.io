<template>
  <Layout />
  <div class="footer">
    <span style="padding: 5px;"><a href="https://github.com/ThingSet"><img src="/images/github-logo.svg" height="14" /> GitHub</a></span>
    | <span style="padding: 5px;">Developed by Libre Solar Technologies GmbH</span>
    | <span style="padding: 5px;"><a href="/contact.html">Contact / Impressum</a></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

export default defineComponent({
  components: {
    Layout,
  },
})
</script>

<style>
.footer {
  border-top: 1px var(--c-border) solid;
  padding: 1rem;
  text-align: center;
  background-color: var(--c-bg-light);
  height: auto;
  flex-grow: 1;
}
</style>
