<script setup>
import { defineProps } from 'vue';
import DialogInputField from './InputField.vue';
import DialogHeader from './Header.vue';

import formatDate from '../../utils/formatDate';

const props = defineProps(['isOpen', 'user']);
</script>
<template>
  <Transition name="dialog-slide">
    <div
      v-if="isOpen"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg shadow-xl md:max-w-xl lg:max-w-3xl w-full px-5 md:px-0"
    >
      <div class="bg-white px-[18px] sm:px-[36px] py-[26px] rounded-[10px] max-h-[80vh] overflow-y-auto">
        <div class="absolute top-4 right-8 sm:right-4">
          <Icon
            icon="mdi:close"
            class="w-7 h-7 text-[#FA1212] focus:outline-none cursor-pointer"
            @click="$emit('close')"
          />
        </div>
        <DialogHeader
          :src="user.profile_picture"
          :alt="user.first_name + ' ' + user.last_name"
          :name="user.first_name + ' ' + user.last_name"
          :email="user.email"
          :phone="user.phone"
        />
        <div class="mt-[32px] grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <DialogInputField
            id="dateOfBirth"
            label="Date of Birth"
            icon="carbon:calendar"
            :value="formatDate(user.date_of_birth)"
            type="text"
            disabled="true"
          />
          <DialogInputField id="job" label="Job" icon="pajamas:work" :value="user.job" type="text" disabled="true" />
          <DialogInputField id="city" label="City" icon="bxs:city" :value="user.city" type="text" disabled="true" />
          <DialogInputField
            id="zipCode"
            label="Zip Code"
            icon="fluent-mdl2:post-update"
            :value="user.zipcode"
            type="text"
            disabled="true"
          />
          <DialogInputField
            id="latitude"
            label="Latitude"
            icon="ph:globe"
            :value="user.latitude"
            type="text"
            disabled="true"
          />
          <DialogInputField
            id="longitude"
            label="Longitude"
            icon="ph:globe"
            :value="user.longitude"
            type="text"
            disabled="true"
          />
          <DialogInputField
            id="street"
            label="Street"
            icon="solar:streets-map-point-bold"
            :value="user.street"
            type="text"
            disabled="true"
          />
          <DialogInputField
            id="state"
            label="State"
            icon="tabler:building-estate"
            :value="user.state"
            type="text"
            disabled="true"
          />
          <DialogInputField
            id="country"
            label="Country"
            icon="zondicons:globe"
            :value="user.country"
            type="text"
            disabled="true"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.dialog-slide-enter-from {
  opacity: 0;
  top: -50%;
  transform: translateY(-50%);
}

.dialog-slide-enter-to {
  opacity: 1;
  transform: translateY(0%) translateX(-50%);
}

.dialog-slide-enter-active {
  transition: all 0.3s ease-in-out;
}

.dialog-slide-leave-from {
  opacity: 1;
  transform: translateY(0%) translateX(-50%);
}

.dialog-slide-leave-to {
  opacity: 0;
  top: -50%;
  transform: translateY(-50%);
}

.dialog-slide-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
