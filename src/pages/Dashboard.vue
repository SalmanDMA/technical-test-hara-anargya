<script setup>
import { onMounted, ref } from 'vue';
import Layout from '../components/Layout/index.vue';
import cardDashboardData from '../utils/cardData';
import { tableHeadUser } from '../utils/tableData';
import Dialog from '../components/Dialog/index.vue';
import Overlay from '../components/Overlay.vue';
import formatDate from '../utils/formatDate';

const users = ref([]);
const openDialog = ref(false);
const selectedUser = ref({});
const loading = ref(false);

onMounted(() => {
  fetchDataUser();
});

const fetchDataUser = async () => {
  try {
    loading.value = true;
    const res = await fetch(import.meta.env.VITE_API_URL);
    const data = await res.json();
    users.value = data.users;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleOpenDialog = (user) => {
  openDialog.value = true;
  selectedUser.value = user;
};

const handleCloseDialog = () => {
  openDialog.value = false;
  selectedUser.value = {};
};
</script>

<template>
  <Layout>
    <main
      class="flex flex-col gap-[31px] flex-1 overflow-x-hidden overflow-y-auto bg-[#F7F8FA] px-5 py-4 sm:px-9 sm:py-[30px]"
    >
      <section class="grid grid-cols-1 md:grid-cols-3 gap-[23px]">
        <div
          v-for="card in cardDashboardData"
          :key="card.id"
          class="flex flex-col gap-[22px] bg-white rounded-[10px] shadow-lg"
        >
          <div class="flex justify-between pl-[24px] pt-[24px] pr-[16px] pb-[12px]">
            <div class="flex flex-col justify-start gap-[10px]">
              <p class="font-semibold text-[12px] text-[#727272]">{{ card.statusPayment }}</p>
              <h3 class="text-[#080808] font-semibold text-[20px]">
                {{ card.amount }}<span v-if="card.subAmount" class="text-[#9A9A9A]">{{ card.subAmount }}</span>
              </h3>
            </div>
            <div class="bg-[#F2F4F7] p-[6px] rounded-[4px] max-w-max h-max">
              <Icon icon="solar:square-transfer-horizontal-broken" class="w-[22px] h-[22px] text-[#817F7F]" />
            </div>
          </div>
          <div
            class="px-[17px] pt-[13px] pb-[11px] bg-[#F9FAFC] rounded-br-[10px] rounded-bl-[10px] flex justify-between"
          >
            <div class="flex items-center gap-[1px]">
              <Icon
                v-if="card.iconStatus === 'failed'"
                icon="ph:arrow-up-bold"
                class="w-4 h-4 text-[#EE7C85] rotate-[135deg]"
              />
              <Icon
                v-if="card.iconStatus === 'success'"
                icon="ph:arrow-up-bold"
                class="w-4 h-4 text-[#4CBF93] rotate-45"
              />
              <div class="flex gap-[4px]">
                <p
                  class="text-[10px] font-semibold"
                  :class="{
                    'text-[#EE7C85]': card.iconStatus === 'failed',
                    'text-[#4CBF93]': card.iconStatus === 'success',
                  }"
                >
                  {{ card.percentage }}
                </p>
                <p class="text-[#AAAAAA] text-[10px] font-medium">Last Month</p>
              </div>
            </div>
            <div>
              <p class="text-[#6E6E6E] text-[10px] font-semibold">View More</p>
            </div>
          </div>
        </div>
      </section>
      <section
        v-if="!loading"
        class="py-[25px] shadow-lg bg-white rounded-tl-[10px] rounded-tr-[10px] flex flex-col gap-[18px]"
      >
        <h3 class="px-[28px] text-[#080808] font-semibold text-[17px]">User List</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left bg-[#FAFBFC] shadow-[0px_0px_4px_rgba(0,0,0,0.25)]">
                <th
                  class="text-[#7C7C7C] text-[12px] font-semibold py-[18px]"
                  :class="{
                    'pl-[28px]': head.title === 'ID',
                    'pl-[16px]': head.title === 'User',
                    'pl-[28px] pr-[28px]': head.title === 'Date of Birth',
                    'pl-[10px] pr-[28px]': head.title === 'Action',
                  }"
                  v-for="head in tableHeadUser"
                  :key="head.id"
                >
                  {{ head.title }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user.id" class="text-left">
                <td class="pl-[28px] py-[18px] text-[12px] font-normal text-[#686868]">{{ user.id }}</td>
                <td class="pl-[16px] py-[18px]">
                  <div class="flex items-center gap-[10px]">
                    <img
                      :src="user.profile_picture"
                      :alt="user.first_name + ' ' + user.last_name"
                      class="hidden lg:block w-[40px] h-[40px] rounded-full object-cover"
                    />
                    <p class="text-[#080808] font-medium text-[12px]">
                      {{ user.first_name + ' ' + user.last_name }}
                    </p>
                  </div>
                </td>
                <td class="pl-[28px] pr-[28px] py-[18px] text-[12px] font-normal text-[#686868] w-[150px]">
                  {{ formatDate(user.date_of_birth) }}
                </td>
                <td class="text-[12px] font-medium text-[#080808]">{{ user.email }}</td>
                <td class="text-[12px] font-normal text-[#686868]">
                  {{ user.job }}
                </td>
                <td class="text-[12px] font-medium text-[#080808]">{{ user.country }}</td>
                <td class="pl-[10px] pr-[28px] py-[18px] flex items-center gap-[10px] flex-wrap">
                  <button
                    class="rounded-[4px] px-[16px] py-[4px] text-[#080808] text-[10px] font-medium w-full lg:w-auto shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
                  >
                    Select
                  </button>
                  <button
                    class="rounded-[4px] px-[16px] py-[4px] text-[#080808] text-[10px] font-medium w-full lg:w-auto shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
                    @click="handleOpenDialog(user)"
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section
        v-else
        class="flex bg-slate-700 rounded-tl-[10px] rounded-tr-[10px] w-full min-h-[800px] blinking"
      ></section>
    </main>
  </Layout>
  <Overlay :isOpen="openDialog" @handleToggle="handleCloseDialog" classZIndex="z-40" />
  <Dialog :isOpen="openDialog" :user="selectedUser" @close="handleCloseDialog" />
</template>

<style scoped>
.blinking {
  animation: blink 1s steps(5, start) infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
