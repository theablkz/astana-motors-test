<template>
  <div class="favorite-modal">
    <h2>Избранные</h2>
    <transition-group tag="div" name="list">
      <div
        class="photo-gallery--item-box"
        v-for="item in favorites.items"
        :key="item.id"
      >
        <img
          class="photo-gallery__image"
          :src="item.urls.small"
          :alt="item.alt_description"
        />
        <div
          class="photo-gallery--info"
          :class="{
            'photo-gallery--info__active': favorites.checkHas(item.id)
          }"
        >
          <like
            @click.native="favorites.addDelete(item)"
            :active="favorites.checkHas(item.id)"
            class="photo-gallery--info__favorites"
          />
          <span class="photo-gallery--info__name">{{ item.user.name }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Like from "@/components/icons/like";

export default {
  name: "favorite-modal",
  components: { Like },

  props: {
    favorites: {
      type: Object
    }
  }
};
</script>

<style scoped>
.favorite-modal {
  padding: 1rem;
  width: 400px;
  background: #151419;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.55);
  height: 100%;
  z-index: 3;
  color: white;
  overflow-y: auto;
}
.favorite-container {
  margin: 2rem 0;
}
.photo-gallery--item-box {
  margin-bottom: 2rem;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
