<template>
  <div class="photo-gallery">
    <div
      class="photo-gallery--item-box"
      v-for="(item, index) in unsplash.photos"
    >
      <img
        class="photo-gallery__image"
        :src="index === 0 ? item.urls.full : item.urls.small"
        :alt="item.alt_description"
      />
      <div
        class="photo-gallery--info"
        :class="{ 'photo-gallery--info__active': favorites.checkHas(item.id) }"
      >
        <like
          @click.native="favorites.addDelete(item)"
          :active="favorites.checkHas(item.id)"
          class="photo-gallery--info__favorites"
        />
        <span class="photo-gallery--info__name">{{ item.user.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Like from "@/components/icons/like";
export default {
  name: "photos",
  components: { Like },
  props: {
    unsplash: {
      type: Object,
      default: () => {}
    },
    favorites: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>
.photo-gallery .photo-gallery--item-box:first-child {
  grid-column-start: 1;
  grid-column-end: 4;
  height: 520px;
}
</style>
