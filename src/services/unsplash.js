import { createApi } from "unsplash-js";
const token = process.env.VUE_APP_UNSPLASH_TOKEN;

const unsplash = createApi({
  accessKey: token
});

async function getRandom(queries) {
  return await unsplash.photos
    .getRandom(queries)
    .then(res => {
      if (res.response.length === 0) {
        throw Error;
      }
      return res.response;
    })
    .catch(() => {
      throw Error;
    });
}
async function getSearch(queries) {
  return await unsplash.search
    .getPhotos(queries)
    .then(res => {
      if (res.response.results.length === 0) {
        throw Error;
      }
      return res.response.results;
    })
    .catch(() => {
      throw Error;
    });
}

class Photos {
  photosData = [];
  component = () => import("../components/photos");
  // ориентация фото. хотел еще добавить загрузку изображении по их ориентации, но чет уже лень стало
  orientation = "portrait";
  orientations = ["portrait", "landscape", "square"];
  // тоже лень пагинацию делать. ночь во дворе
  limit = 10;
  getCountImages = 16;
  sortByAlphabet = false;

  constructor(search) {
    this.search = search || "";
  }

  /***
   * возвращает массив изображении, а так же сортирует если sortByAlphabet === true
   * @returns {this|[]}
   */
  get photos() {
    if (this.sortByAlphabet) {
      return [...this.photosData].sort((a, b) =>
        new Intl.Collator().compare(a.user.name, b.user.name)
      );
    } else {
      return this.photosData;
    }
  }

  /***
   * поиск фото. если поле поиска пустое - найдет рандомные фото. если ничего не найдет то выведет компонент ошибки
   * а так же loader
   * @param event
   * @returns {Promise<void>}
   */
  async searchPhoto(event) {
    event.classList.add("loader");
    try {
      this.photosData = this.search.trim()
        ? await getSearch({
            query: this.search,
            orientation: this.orientation,
            perPage: this.getCountImages
          })
        : await getRandom({
            count: this.getCountImages
          });
      this.component = () => import("../components/photos");
    } catch (e) {
      this.component = () => import("../components/photoNotFound");
    } finally {
      event.classList.remove("loader");
    }
  }
}
export default Photos;
