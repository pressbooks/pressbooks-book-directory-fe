<template>
  <article>
    <button
      :data-cy="`filter-${dataCyButton}-header-button`"
      :class="[
        'w-full flex items-center justify-between py-3 px-4',
        opened && 'border-b'
      ]"
      @click.prevent="opened = !opened"
    >
      <slot name="title" />
      <chevron-down-icon
        :class="[
          'h-6 w-6 text-red-800 transform duration-150',
          opened && 'rotate-180'
        ]"
      />
    </button>
    <transition
      enter-active-class="transform transition-all ease-out duration-150"
      enter-from-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transform transition-all ease-out duration-150"
      leave-from-class="opacity-0 translate-y-full"
      leave-to-class="opacity-0 translate-y-0"
    >
      <div
        v-show="opened"
        class="h-full divide-y divide-gray-200"
      >
        <slot name="content" />
      </div>
    </transition>
  </article>
</template>

<script>
import { ChevronDownIcon } from '@vue-hero-icons/outline';

export default {
  name: 'PbAccordion',
  components: { ChevronDownIcon },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    dataCyButton: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      opened: false
    };
  },
  watch: {
    open(o) {
      this.opened = o;
    }
  }
};
</script>
