<script setup>
import { watchEffect, onMounted, ref } from "vue";
import { getApi } from "/src/components/getApi.js";
import Filter from "@/components/Filter.vue";
import Search from "@/components/Search.vue";

const dataState = ref([]);
const dataStateAll = ref([]);
const keyState = ref([]);
const isFetchingState = ref(true);
const filterState = ref({});
const UpdatedFilterState = ref({});
const searchNotFound = ref(false);
const checkedFlag = ref(false);
const searchInput = ref("");


async function getData() {
  const { isFetching, error, data } = await getApi();
  dataState.value = data.value.entries;
  dataStateAll.value = data.value.entries;
  isFetchingState.value = isFetching.value;
  getKeys(dataState.value[0]);
  getCategories(dataState.value);
}

function getKeys(arg) {
  let temp = [];
  for (const [key, value] of Object.entries(arg)) {
    temp.push(key);
  }
  keyState.value = temp;
}

function getCategories(arg) {
  let argCategories = arg.map(item => {
    return item.Category
  });
  let argCategoriesUnique = new Set(argCategories);
  let arr = [...argCategoriesUnique];

  let obj = {};
  arr.forEach(item => {
    obj[item] = false;
  });
  filterState.value = obj;
}

function updateData() {
  let dataStateFiltered;

  if((searchInput.value.length > 0) && checkedFlag.value) {
    dataStateFiltered = dataStateAll.value.filter(item => (UpdatedFilterState.value[item.Category] === true) && (item.API.toUpperCase().startsWith(searchInput.value.toUpperCase())));
    if(dataStateFiltered.length === 0) {
      searchNotFound.value = true;
    } else {
      searchNotFound.value = false;
    }
  } else if ((searchInput.value.length > 0) && !checkedFlag.value) {
    dataStateFiltered = dataStateAll.value.filter(item => item.API.toUpperCase().startsWith(searchInput.value.toUpperCase()));
    if(dataStateFiltered.length === 0) {
      searchNotFound.value = true;
    } else {
      searchNotFound.value = false;
    }
  } else if ((searchInput.value.length === 0) && checkedFlag.value) {
    dataStateFiltered = dataStateAll.value.filter(item => UpdatedFilterState.value[item.Category] === true);
    searchNotFound.value = false;
  } else {
    dataStateFiltered = dataStateAll.value;
    searchNotFound.value = false;
  }
  dataState.value = dataStateFiltered;

  
}

function checkedHandler(arg) {
  UpdatedFilterState.value = {...arg};
  let dataStateFiltered = dataStateAll.value.filter(item => arg[item.Category] === true);
  
  if(dataStateFiltered.length > 0) {
      checkedFlag.value = true;
  } else {
    checkedFlag.value = false;
  }
}

function searchHandler(arg) {
  searchInput.value = arg;
}

onMounted(getData());

watchEffect( () => {
  updateData();
}
)
</script>

<template>
  <Search :notFound="searchNotFound" @search="searchHandler"></Search>
  <div class="page">
    <div class="container">
      <Filter :titles="filterState" @filtered="checkedHandler"></Filter>
    </div>
    
    <div class="container">
      <div class="table">
        <div class="row1" v-for="(key,i) in keyState" :key="i"><p>{{ key }}</p></div>
        <template v-for="data in dataState">
          <div class="row" v-for="(value, name) in data" :key="name">
            <p>{{ value }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}

.table {
  display: grid;
  grid-template-columns: 200px 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  text-align: center;
  background-color: silver;
}

.row1, .row {
  background-color: #f7f4f4;
}
</style>
