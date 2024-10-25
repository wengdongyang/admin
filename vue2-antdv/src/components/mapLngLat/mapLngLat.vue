<!-- @format -->
<template>
  <section class="map-lng-lat">
    <a-select
      v-if="isShowAutoComplete"
      class="search"
      size="large"
      placeholder="搜索地址"
      defaultOpen
      @select="onAutoCompleteSelect"
      @search="onAutoCompleteSearch"
    >
      <template slot="dataSource">
        <a-select-option v-for="item in dataSource" :key="item.id" :title="item.name">
          {{ item.name }}
        </a-select-option>
      </template>
      <a-input>
        <a-button slot="suffix" class="search-btn" size="large" type="primary"> 搜索 </a-button>
      </a-input>
    </a-select>
    <a-input-search
      v-else
      v-model="innerAddress"
      class="search"
      placeholder="搜索地址"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <section class="map" ref="mapDom" id="mapDom" />
  </section>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  name: 'MapLngLat',
  props: {
    city: { type: String, default: '绍兴市' },
    gaoDeKey: { type: String, default: 'ce7368f53f0682a9eba84e3cc9b953b6' }, // Key
    // gaoDeSecurityJsCode: { type: String, default: 'c2d3fc5f9a37eaf82e771268c08cd914' }, // 安全密钥
    center: { type: Array, default: () => [120.501957, 30.089289] },
    longitude: { type: [String, Number] },
    latitude: { type: [String, Number] },
    address: { type: String, default: '' },
  },
  data() {
    return {
      isShowAutoComplete: false,

      selectAddressValue: null,

      innerAddress: '',
      dataSource: [],

      mapRef: null,
      markerRef: null,
      AMapRef: null,
      GeocoderRef: null,
      AutoCompleteRef: null,
    };
  },
  computed: {
    mapCenter() {
      const { center, longitude, latitude } = this;
      return longitude && latitude ? [longitude, latitude] : center;
    },
    mapLngLat() {
      const { longitude, latitude } = this;
      return { lng: longitude, lat: latitude };
    },
  },
  watch: {
    mapLngLat: {
      handler(newVal) {
        if (newVal.lng && newVal.lat) {
          this.addMarker(newVal);
          this.setMapCenter(newVal);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(async () => {
      await this.initMap();
    });
  },
  destroyed() {
    if (this.mapRef) {
      this.mapRef = null;
      this.markerRef = null;
      this.AMapRef = null;
      this.AutoCompleteRef = null;
      this.GeocoderRef = null;

      this.mapRef.destroy();
    }
  },
  methods: {
    async initMap() {
      try {
        const { gaoDeKey, mapCenter, city, longitude, latitude } = this;
        AMapLoader.reset();
        const plugins = ['AMap.PolygonEditor', 'AMap.Geocoder', 'AMap.AutoComplete'];
        const AMap = await AMapLoader.load({ key: gaoDeKey, version: '2.0', plugins });
        const map = new AMap.Map('mapDom', { viewMode: '2D', zoom: 13, center: mapCenter });
        this.AMapRef = AMap;
        this.mapRef = map;

        if (longitude && latitude) {
          this.addMarker({ lng: longitude, lat: latitude });
        }

        const Geocoder = new AMap.Geocoder({ city });
        const AutoComplete = new AMap.AutoComplete({ city });

        map.on('click', ({ lnglat }) => {
          this.addMarker(lnglat);

          const { lng, lat } = lnglat;
          Geocoder.getAddress([lng, lat], (status, result) => {
            if (status === 'complete') {
              const { info, regeocode } = result;
              if (info === 'OK') {
                this.$emit('update:address', regeocode.formattedAddress);
                this.$emit('update:longitude', lng);
                this.$emit('update:latitude', lat);
                this.innerAddress = regeocode.formattedAddress;
              }
            }
          });
        });

        this.GeocoderRef = Geocoder;
        this.AutoCompleteRef = AutoComplete;
      } catch (error) {
        console.warn(error);
      }
    },
    setMapCenter({ lng, lat }) {
      try {
        const { mapRef } = this;
        if (mapRef) {
          const zoom = mapRef.getZoom();
          mapRef.setZoomAndCenter(zoom, [lng, lat]);
        }
      } catch (error) {
        console.warn(error);
      }
    },
    addMarker({ lng, lat }) {
      try {
        const { AMapRef, mapRef } = this;
        if (this.markerRef) {
          mapRef.remove(this.markerRef);
          this.markerRef = null;
        }
        const marker = new AMapRef.Marker({
          map: mapRef,
          position: [lng, lat],
        });
        mapRef.add(marker);
        this.markerRef = marker;
      } catch (error) {
        console.warn(error);
      }
    },
    onAutoCompleteSelect(key) {
      try {
        const { dataSource } = this;
        const item = dataSource.find((el) => el.id === key);
        const { address, location } = item;

        this.addMarker(location);

        this.innerAddress = address;
        this.isShowAutoComplete = false;

        this.$emit('update:address', address);
        this.$emit('update:longitude', location.lng);
        this.$emit('update:latitude', location.lat);
      } catch (error) {
        console.warn(error);
      }
    },
    async onAutoCompleteSearch(searchText) {
      try {
        if (this.dataSource?.length === 0) {
          this.isShowAutoComplete = false;
          this.innerAddress = searchText;
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async onSearch() {
      try {
        const { AutoCompleteRef, innerAddress } = this;
        AutoCompleteRef.search(innerAddress, (status, result) => {
          if (status === 'complete') {
            const { info, tips } = result;
            if (info === 'OK') {
              this.dataSource = tips;
              this.isShowAutoComplete = true;
            }
          }
        });
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.map-lng-lat {
  position: relative;
  z-index: 0;

  width: 400px;
  height: 400px;

  .search-content {
    position: absolute;
    z-index: 1;

    display: flex;

    width: 100%;
    padding: 20px;
    .input-content {
      flex: 1;
      .search {
        flex: 1;

        width: 100%;
      }
    }
    .button-aside {
      padding: 0;
    }
  }
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
