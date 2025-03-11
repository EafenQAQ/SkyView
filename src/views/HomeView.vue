<template>
  <main class="container mx-auto text-white">
    <!--搜索框-->
    <div class="pt-4 mb-8 relative">
      <input 
      v-model="searchQuery"
      @input="getSearchResults"
      type="text"
      placeholder="请输入您的城市"
      class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none 
       focus:shadow-[0px_1px_0_0_#004E71] transition-transform hover:scale-105 focus:scale-105 hover:shadow-xl"
      
      >
      <ul v-if="searchQuery" class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">

        <p v-if="searchError">
          出错了，请重试~
        </p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">
          未找到符合的结果
        </p>
        <template v-else>
          <li
          
          v-for="searchList in mapboxSearchResults" :key="mapboxSearchResults.id"  
          class="py-2 cursor-pointer hover:bg-orange-300 duration-100"
          @click="previewCity(searchList)"
          >
            {{ searchList.place_name }}
          </li>
          
        </template>
       
        
      </ul>
      
    </div>
    <!-- 城市列表 -->
     <div class="flex flex-col gap-4">
       <Suspense>
          <CityList />
          <template #fallback>
            <!-- 渲染动画骨架 -->
             <CityCardSkeleton />
          </template>
       </Suspense>
     </div>

  </main>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";

const searchQuery = ref("");
const mapboxAPIKey = "pk.eyJ1IjoicDJkcXBnZnN0IiwiYSI6ImNtODAwYWV4eDBuc2IycnM1YWVqb2pzdWkifQ.r191I85bm77Jv5igVrW-ug";
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

//获取搜索列表
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
      if (searchQuery.value !== "") {
        try {
          const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
          );
          mapboxSearchResults.value = result.data.features;
        } catch {
          searchError.value = true;
        }
      
      return;
    } 
    
    mapboxSearchResults.value = null;
  }, 300);
}

const router = useRouter();
const previewCity = (currentCity) => {
  //将点击的城市放入搜索框中
  // searchQuery.value = currentCity.place_name;
  const [city, state, country] = currentCity.place_name.split(",");
  console.log(city, state, country);
  
  
  router.push({
    name: "cityView",
    params: {
      city: city ? city.replaceAll(" ", "") : " ",
      state: state ? state.replaceAll(" ", "") : " ",
      country: country ? country.replaceAll(" ", "") : " ",
    },
    query: {
      lng: currentCity.geometry.coordinates[0],
      lat: currentCity.geometry.coordinates[1],
      preview: true,
    }
  });
}

//测试用部分
const forTest = () => {
  const savedCities = ref([]);
const OpenWeatherAPIKey = "d92e195210b4641556c9815e351622fb";

const getCities = async () => {
    if(localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    }
    const requests = [];
    savedCities.value.forEach((city) => {
        requests.push(
            axios.get(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${OpenWeatherAPIKey}`
                )
        )
    });
    const weatherData = await Promise.all(requests);
    weatherData.forEach((value, index) => {
        savedCities.value[index].weather = value.data;
        console.log(savedCities.value);
        
    })
};
  getCities();
}
</script>

<style lang="scss" scoped>

</style>