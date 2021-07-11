import axios from "axios";

class HTTPService {
  constructor(url) {
    this.paramsSerializer = function (obj) {
      let str = [];
      for (let p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    };
    this.http = axios.create({
      baseURL: url,
      paramsSerializer: this.paramsSerializer,
    });
  }
  getVideosList = (params) =>
    this.http.get(`/videos/`, { params }).then((data) => data.data);
  getFilm = (id) => this.http.get(`/videos/${id}/`).then((data) => data.data);
  getTagsList = (params) =>
    this.http.get(`/tags/`, { params }).then((data) => data.data);
  getNotesList = (params) =>
    this.http.get(`/notes/`, { params }).then((data) => data.data);
}

export const http = new HTTPService(
  "http://ip-6.std-670.ist.mospolytech.ru/api"
);
