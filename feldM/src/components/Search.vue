<script setup>
import { onUpdated, ref } from "vue";

const props = defineProps({
  notFound: Boolean,
});

const searchInput = ref("");

const emits = defineEmits(["search"]);

onUpdated(() => {
    emits("search", searchInput.value);
});
</script>

<template>
  <div class="search">
    <input v-model="searchInput" placeholder="Search by Title">
    <h3 v-if="notFound">Not Found!</h3>
  </div>
</template>

<style>
.search {
    margin-bottom: 10px;
}

</style>
