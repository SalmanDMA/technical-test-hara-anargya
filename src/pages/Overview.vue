<script setup>
import { ref, reactive, computed } from 'vue';
import Layout from '../components/Layout/index.vue';
import cities from '../assets/js/city';
import provinces from '../assets/js/province';
import { getCityListByProvinceId, getProvinceNameByCityId, sortProvinces } from '../utils/overviewData';
import { tableHeadCity, tableHeadProvince } from '../utils/tableData';

const listItemsSelect = ref([
  { id: 1, name: 'Cities' },
  { id: 2, name: 'Provinces' },
]);

const itemSelected = reactive({
  id: 1,
  name: 'Cities',
});

const refCities = ref(cities);
const refProvinces = ref(provinces);
const selectedValueFilter = ref('');

const handleItemSelected = (id) => {
  itemSelected.id = id;
  itemSelected.name = listItemsSelect.value[id - 1].name;
  selectedValueFilter.value = '';
  refCities.value = cities;
  refProvinces.value = provinces;
};

const displayTableHead = computed(() => {
  if (itemSelected.id === 1) {
    return tableHeadCity;
  } else {
    return tableHeadProvince;
  }
});

const displayOptiosSelect = computed(() => {
  if (itemSelected.id === 1) {
    return provinces;
  } else {
    return cities;
  }
});

const handleFilter = (value) => {
  selectedValueFilter.value = value;
  currentPage.value = 1;
  if (itemSelected.id === 1) {
    if (selectedValueFilter.value === '') {
      return (refCities.value = cities);
    }
    return (refCities.value = getCityListByProvinceId(value, cities));
  }
  if (itemSelected.id === 2) {
    if (selectedValueFilter.value === '') {
      return (refProvinces.value = provinces);
    }
    return (refProvinces.value = getProvinceNameByCityId(value, provinces));
  }
};

const sortingColumn = reactive({
  title: 'No',
  order: 'asc',
});

const sortFunctions = {
  Id: (order) => sortProvinces(refProvinces.value, 'id', order),
  Name: (order) => sortProvinces(refProvinces.value, 'name', order),
  'Wilayah Id': (order) => sortProvinces(refProvinces.value, 'wilayah_id', order),
};

const handleSort = (title) => {
  sortingColumn.order = sortingColumn.title === title ? (sortingColumn.order === 'asc' ? 'desc' : 'asc') : 'desc';
  sortingColumn.title = title;
  currentPage.value = 1;
  refProvinces.value = sortFunctions[title](sortingColumn.order);
};

const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => {
  if (itemSelected.id === 1) {
    return Math.ceil(refCities.value.length / itemsPerPage);
  } else {
    return Math.ceil(refProvinces.value.length / itemsPerPage);
  }
});

const visiblePages = computed(() => {
  let maxVisiblePages = null;
  if (window.innerWidth < 425) {
    maxVisiblePages = 1;
  } else if (window.innerWidth < 768) {
    maxVisiblePages = 3;
  } else {
    maxVisiblePages = 5;
  }

  const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
  }

  const pagesArray = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i);
  }

  return pagesArray;
});

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const slicedProvinces = computed(() => refProvinces.value.slice(startIndex.value, startIndex.value + itemsPerPage));
const sliceCities = computed(() => refCities.value.slice(startIndex.value, startIndex.value + itemsPerPage));
</script>

<template>
  <Layout>
    <main
      class="flex flex-col gap-[31px] flex-1 overflow-x-hidden overflow-y-auto bg-[#F7F8FA] px-5 py-4 sm:px-9 sm:py-[30px]"
    >
      <section class="grid grid-cols-1 sm:grid-cols-2 gap-[23px]">
        <div class="flex flex-col bg-white rounded-[10px] shadow-lg px-10 py-5 border border-black">
          <div class="flex justify-between items-center">
            <h3 class="text-[#424242] font-bold text-3xl sm:text-5xl">{{ cities.length }}</h3>
            <Icon icon="bxs:city" class="w-12 h-12 sm:w-20 sm:h-20 text-[#686868]" />
          </div>
          <p class="text-lg font-medium text-[#686868]">Total Cities</p>
        </div>
        <div class="flex flex-col bg-white rounded-[10px] shadow-lg px-10 py-5 border border-black">
          <div class="flex justify-between items-center">
            <h3 class="text-[#080808] font-bold text-3xl sm:text-5xl">{{ provinces.length }}</h3>
            <Icon icon="solar:city-bold" class="w-12 h-12 sm:w-20 sm:h-20 text-[#686868]" />
          </div>
          <p class="text-lg font-medium text-[#686868]">Total Provinces</p>
        </div>
      </section>
      <section class="flex flex-wrap gap-5">
        <div class="shadow-lg bg-white rounded-lg w-full md:w-auto border border-black">
          <div class="bg-[#424242] p-4 rounded-t-lg border-b border-black">
            <h3 class="text-white font-bold text-2xl">Items Overview</h3>
          </div>
          <div class="bg-white rounded-b-lg p-4">
            <ul>
              <li
                class="text-[#686868] font-medium cursor-pointer hover:bg-[#424242] hover:text-white p-2 rounded-md mb-2"
                :class="itemSelected.id === item.id ? 'bg-[#424242] text-white' : ''"
                v-for="item in listItemsSelect"
                :key="item.id"
                @click="handleItemSelected(item.id)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="flex-1 shadow-lg bg-white rounded-lg w-full md:w-auto border border-black">
          <div class="bg-[#424242] p-4 rounded-t-lg border-b border-black">
            <h3 class="text-white font-bold text-2xl">Table {{ itemSelected.name }}</h3>
          </div>
          <div class="bg-white rounded-b-lg p-4 flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <div class="ml-0 sm:ml-auto px-4 py-2 border w-full sm:max-w-max flex items-center">
                <label for="filter" class="font-medium text-[#686868]"
                  >Filter By {{ itemSelected.id === 1 ? 'Province' : 'City' }} :
                </label>
                <select
                  name="filter"
                  id="filter"
                  class="font-medium text-[#686868] cursor-pointer border-none outline-none focus:outline-none pr-4 w-full sm:max-w-max"
                  v-model="selectedValueFilter"
                  @change="handleFilter($event.target.value)"
                >
                  <option class="text-[#686868] text-[12px]" value="">All</option>
                  <option
                    class="text-[#686868] text-[12px]"
                    v-for="item in displayOptiosSelect"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="bg-white rounded-b-lg overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-[#424242] border-b border-gray-300">
                    <th
                      v-for="head in displayTableHead"
                      :key="head.id"
                      class="text-white font-bold px-4 py-2"
                      :class="head.class"
                    >
                      <span v-if="itemSelected.id === 1">
                        {{ head.title }}
                      </span>
                      <div v-if="itemSelected.id === 2" class="flex items-center justify-center gap-2">
                        <span>{{ head.title }}</span>
                        <Icon
                          v-if="sortingColumn.title === head.title && sortingColumn.order === 'asc'"
                          :icon="head.iconAsc"
                          @click="handleSort(head.title)"
                          class="w-4 h-4 cursor-pointer"
                        />
                        <Icon
                          v-else-if="sortingColumn.title === head.title && sortingColumn.order === 'desc'"
                          :icon="head.iconDesc"
                          @click="handleSort(head.title)"
                          class="w-4 h-4 cursor-pointer"
                        />
                        <Icon
                          v-else
                          :icon="head.iconAsc"
                          @click="handleSort(head.title)"
                          class="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="itemSelected.id === 1">
                  <tr
                    v-if="sliceCities.length > 0"
                    class="border-b border-gray-300"
                    v-for="city in sliceCities"
                    :key="city.id"
                  >
                    <td class="text-[#686868] font-medium py-2 text-center">{{ city.id }}</td>
                    <td class="text-[#686868] font-medium px-4 py-2">{{ city.name }}</td>
                    <td class="text-[#686868] font-medium py-2 text-center">{{ city.provinsi_id }}</td>
                    <td class="text-[#686868] font-medium text-center py-2">{{ city.ref_id }}</td>
                  </tr>
                  <tr v-else class="border-b border-gray-300">
                    <td class="text-[#686868] font-medium py-2 text-center" colspan="4">
                      No Data Found, Please Choose Another Filter
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="itemSelected.id === 2">
                  <tr
                    v-if="slicedProvinces.length > 0"
                    class="border-b border-gray-300"
                    v-for="province in slicedProvinces"
                    :key="province.id"
                  >
                    <td class="text-[#686868] font-medium py-2 text-center">{{ province.id }}</td>
                    <td class="text-[#686868] font-medium px-4 py-2">{{ province.name }}</td>
                    <td class="text-[#686868] font-medium py-2 text-center">{{ province.wilayah_id }}</td>
                  </tr>
                  <tr v-else class="border-b border-gray-300">
                    <td class="text-[#686868] font-medium py-2 text-center" colspan="3">
                      No Data Found, Please Choose Another Filter
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section
        class="flex flex-wrap items-center justify-center gap-y-3 bg-white rounded-lg p-3 sm:p-4 border border-black shadow-lg"
      >
        <button
          class="hidden sm:flex px-3 py-1 mr-2 rounded bg-[#424242] text-white hover:bg-[#686868] transition-colors duration-300 ease-in-out cursor-pointer hover:text-white"
          :disabled="currentPage === 1"
          @click="currentPage = 1"
        >
          First
        </button>
        <button
          class="px-3 py-1 mr-1 sm:mr-2 rounded bg-[#424242] text-white hover:bg-[#686868] transition-colors duration-300 ease-in-out cursor-pointer hover:text-white"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <span class="hidden sm:flex">Prev</span>
          <Icon icon="ph:caret-left" class="w-3 h-3 sm:hidden" />
        </button>
        <button
          v-if="visiblePages[0] !== 1"
          class="text-xs sm:text-base px-3 py-1 mr-1 sm:mr-2 rounded bg-[#424242] text-white hover:bg-[#686868] transition-colors duration-300 ease-in-out cursor-pointer hover:text-white"
          @click="currentPage = 1"
        >
          1
        </button>
        <span v-if="visiblePages[0] > 2" class="sm:px-3 sm:py-1 mr-1 sm:mr-2 text-gray-700 text-xs sm:text-base"
          >...</span
        >
        <button
          v-for="pageNumber in visiblePages"
          :key="pageNumber"
          class="text-xs sm:text-base px-3 py-1 mr-1 sm:mr-2 rounded bg-[#424242] text-white hover:bg-[#686868] transition-colors duration-300 ease-in-out cursor-pointer hover:text-white"
          :class="{ 'bg-[#686868] text-white': pageNumber === currentPage }"
          @click="currentPage = pageNumber"
        >
          {{ pageNumber }}
        </button>
        <span
          v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
          class="text-xs sm:text-base sm:px-3 sm:py-1 mr-1 sm:mr-2 text-gray-700"
          >...</span
        >
        <button
          v-if="visiblePages[visiblePages.length - 1] !== totalPages"
          class="text-xs sm:text-base px-3 py-1 mr-1 sm:mr-2 rounded bg-[#424242] text-white hover:bg-[#686868] transition-colors duration-300 ease-in-out cursor-pointer hover:text-white"
          @click="currentPage = totalPages"
        >
          {{ totalPages }}
        </button>
        <button
          class="px-3 py-1 mr-1 sm:mr-2 rounded bg-[#424242] text-white hover:bg-[#686868] transition-colors duration-300 ease-in-out cursor-pointer hover:text-white"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <span class="hidden sm:flex">Next</span>
          <Icon icon="ph:caret-right" class="w-3 h-3 sm:hidden" />
        </button>
        <button
          class="hidden sm:flex px-3 py-1 rounded bg-[#424242] text-white hover:bg-[#686868] transition-colors duration-300 ease-in-out cursor-pointer hover:text-white"
          :disabled="currentPage === totalPages"
          @click="currentPage = totalPages"
        >
          Last
        </button>
      </section>
    </main>
  </Layout>
</template>

<style scoped></style>
