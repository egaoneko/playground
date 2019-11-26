const input = document.querySelector("#style-input");
const btn = document.querySelector("#style-btn");

const key =
  "pk.eyJ1IjoiZWdhb25la28iLCJhIjoiY2pkYnJtdWg4N3Y0ejMzbzV2NHkzanJodCJ9.509Ns7trg6hi_lZKGyWzew";
mapboxgl.accessToken = key;

const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

let search = getURLParameters(location.search);
let style = search.style ? decodeURIComponent(search.style) : "mapbox://styles/mapbox/streets-v9";

const encodeQueryData = data => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

btn.addEventListener("click", () => {
  if (!input.value) {
    return;
  }
  const params = encodeQueryData(
    Object.assign({}, search, { style: input.value })
  );
  location.href = location.origin + location.pathname + '?' + params;
});

const map = new mapboxgl.Map({
  container: "map",
  style: style,
  center: [127.0339581, 37.4845477],
  zoom: 15,
  localIdeographFontFamily: false
});
