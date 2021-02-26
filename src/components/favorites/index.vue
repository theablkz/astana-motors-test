<template>
  <div class="favorite-container">
    <button @click="modalState = 'active'" class="favorite-button">
      Избранные <like-icon :active="!!favorites.items.length" />
    </button>
    <div
      ref="favoriteModal"
      class="favorite-list-container"
      :class="modalState"
    >
      <favorite-modal :favorites="favorites" />
    </div>
  </div>
</template>

<script>
import LikeIcon from "@/components/icons/like";
import FavoriteModal from "@/components/favorites/favorite-modal";
export default {
  name: "favorites",
  props: {
    favorites: {
      type: Object
    }
  },
  data: () => ({
    modalState: "disable"
  }),
  components: { FavoriteModal, LikeIcon },
  methods: {
    closeFavorite() {
      this.modalState = "disable";
    }
  },
  mounted() {
    document.addEventListener("click", event => {
      if (
        !event.target.closest(".favorite-container,.favorite-list-container")
      ) {
        this.closeFavorite();
      }
    });
  }
};
</script>

<style scoped>
.favorite-list-container {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.favorite-list-container.disable {
  right: -100%;
  transition: 0.5s;
}
.favorite-list-container.active {
  right: 0;
  transition: 0.5s;
}
.favorite-button {
  outline: 0;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  font-size: 16px;
  color: #626262;
  border: none;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
  border-radius: 8px;
}
.favorite-button:hover {
  background: rgba(0, 0, 0, 0.5);
}
.favorite-button:active {
  background: rgba(0, 0, 0, 0.3);
}
</style>
