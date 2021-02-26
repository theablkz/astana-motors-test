<template>
  <div id="app">
    <div class="head-content">
      <form
        class="photos-search"
        @submit.prevent="unsplashPhotos.searchPhoto($refs.container)"
      >
        <button class="photos-search__button" title="Search Unsplash">
          <search />
        </button>
        <input
          class="photos-search__input"
          type="text"
          v-model="unsplashPhotos.search"
        />
      </form>

      <favorites-component :favorites="favorites" />
    </div>
    <div class="filter-images">
      <label class="filter-images--checkbox">
        <input v-model="unsplashPhotos.sortByAlphabet" type="checkbox" />
        <div class="filter-images--checkbox__material">
          <div class="filter-images--checkbox__material-ball" />
        </div>
        <span>Сортировка по алфавиту</span>
      </label>
    </div>
    <div class="photos" ref="container">
      <component
        :unsplash="unsplashPhotos"
        :favorites="favorites"
        :is="unsplashPhotos.component"
      />
    </div>
  </div>
</template>

<script>
import Photos from "@/services/unsplash";
import Search from "@/components/icons/search";
import Favorite from "@/services/favorite";
import FavoritesComponent from "@/components/favorites";

export default {
  name: "App",
  data: () => ({
    unsplashPhotos: new Photos(""),
    favorites: new Favorite()
  }),
  components: {
    FavoritesComponent,
    Search
  },
  mounted() {
    this.unsplashPhotos.searchPhoto(this.$refs.container);
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background: linear-gradient(180deg, #1b1a1f 0%, #111013 99.09%);
}
#app {
  max-width: 1200px;
  margin: auto;
  padding: 1rem 0.5rem;
}

.loader {
  position: relative;
}
.loader:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  background-image: url("/load.svg");
  background-position: top;
  background-size: 100px 100px;
  background-repeat: no-repeat;
}

.head-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.photos {
  margin-top: 4rem;
}
.photos-search {
  display: flex;
  align-items: stretch;
  justify-content: center;
  background-color: #eee;
  border: 1px solid #eee;
  border-radius: 24px;
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  padding: 4px 1rem;
}
.photos-search:hover {
  transition: 0.3s;
  border: 1px solid #aaaaaa;
}
.photos-search .photos-search__input {
  border: none;
  width: 100%;
  background-color: inherit;
  outline: none;
}
.photos-search:focus-within {
  transition: 0.3s;
  border: 1px solid #aaaaaa;
  background-color: white;
}
.photos-search .photos-search__button {
  border: none;
  background-color: inherit;
  outline: none;
  cursor: pointer;
}
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(3, 367px);
  gap: 30px;
  justify-content: center;
}
.photo-gallery--item-box {
  position: relative;
  width: 100%;
  height: 290px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
}
.photo-gallery--item-box .photo-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: 1s;
}
.photo-gallery--item-box .photo-gallery--info {
  user-select: none;
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(1.26deg, #000000 -5.53%, rgba(0, 0, 0, 0) 54.45%);
  border-radius: 8px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.photo-gallery--item-box .photo-gallery--info__active {
  opacity: 1;
}
.photo-gallery--item-box .photo-gallery--info .photo-gallery--info__favorites {
  cursor: pointer;
}
.photo-gallery--item-box .photo-gallery--info .photo-gallery--info__name {
  font-weight: 600;
  font-size: 25px;
  line-height: 1;
  color: #ffffff;
  align-self: flex-end;
}
.photo-gallery--item-box .photo-gallery--info:hover {
  transition: 0.3s;
  opacity: 1;
}
.filter-images {
  margin: 2rem 0;
  color: #626262;
}
.filter-images--checkbox {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin: auto 0 auto auto;
  cursor: pointer;
  user-select: none;
  width: max-content;
}
.filter-images--checkbox input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.filter-images--checkbox__material {
  border: 1px solid #626262;
  border-radius: 9px;
  width: 30px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 8px;
}

.filter-images--checkbox__material-ball {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #626262;
}
.filter-images--checkbox input:checked + .filter-images--checkbox__material {
  justify-content: flex-end;
  border: 1px solid #3c59f0;
}
.filter-images--checkbox
  input:checked
  + .filter-images--checkbox__material
  .filter-images--checkbox__material-ball {
  background: #3c59f0;
}
</style>
