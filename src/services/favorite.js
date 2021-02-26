// избранноые хотел через new Map сделать. но потом узнал что он не реактивный. Его исправили в Vue 3.0+ версии

export default class Favorite {
  // favorites = new Map()
  favorites = [];

  /***
   * возвращает избранное в виде массива объектов
   * @returns {*[]}
   */
  get items() {
    return this.favorites;
  }
  /***
   * добавление/удаление из избранного
   * @param item
   */
  addDelete(item) {
    if (this.checkHas(item.id)) {
      this.favorites = this.favorites.filter(
        favorite => item.id !== favorite.id
      );
      // this.favorites.delete(item.id)
    } else {
      this.favorites = [item, ...this.favorites];
      // this.favorites.set(item.id, item)
    }
  }

  /***
   * проверка есть ли фото в избранных
   * @param id
   * @returns {boolean}
   */
  checkHas(id) {
    // return this.favorites.has(id)
    return this.favorites.some(item => item.id === id);
  }
}
