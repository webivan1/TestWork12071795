<template>
  <a href="#" :disabled="disabled" @click.prevent="handleClick" class="sort-link">
    <slot />
    <template v-if="isActive">
      <b-icon :icon="iconOrder" />
    </template>
  </a>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    column: {
      required: true,
      type: String
    },
    active: {
      type: String
    },
    activeOrder: {
      type: String
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('sort', this.column)
      }
    }
  },
  computed: {
    isActive() {
      return this.column === this.active
    },

    iconOrder() {
      return this.activeOrder === 'desc' ? 'arrow-down' : 'arrow-up'
    }
  }
}
</script>

<style scoped>
  .sort-link {
    white-space: nowrap;
  }
  .sort-link[disabled] {
    opacity: 0.5;
  }
</style>
