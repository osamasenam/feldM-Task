<script setup>
import { onUpdated } from "vue";

const props = defineProps({
  titles: Object,
});

const emits = defineEmits(["filtered"]);

onUpdated(() => {
    emits("filtered", props.titles);
});
</script>

<template>
  <div class="filter">
    <h3>Filter by Category</h3>
    <div class="filter-row" v-for="(value, name) in titles" :key="name">
        <input type="checkbox" id="{{name}}" name="{{name}}" v-model="props.titles[name]" >
        <label for="{{name}}">{{name}}</label>
    </div>
  </div>
</template>

<style>
.filter {
      background-color: #f7f4f4;
}
</style>
