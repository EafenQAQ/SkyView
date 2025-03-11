<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="gotoCityView(city)" />
    </div>

    <p v-if="savedCities.length === 0">
        没有正在跟踪的城市天气，搜索并添加你想跟踪的城市天气
    </p>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import { useRouter } from 'vue-router';

const savedCities = ref([]);
const OpenWeatherAPIKey = "d92e195210b4641556c9815e351622fb";

//获取城市天气信息并将其转为本地存储
const getCities = async () => {
    if(localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    }
    const requests = [];
    savedCities.value.forEach((city) => {
        requests.push(
            axios.get(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${OpenWeatherAPIKey}&units=metric`
                )
        )
    });
    const weatherData = await Promise.all(requests);

    // 设定加载动画时间
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    weatherData.forEach((value, index) => {
        savedCities.value[index].weather = value.data;

    })
}
await getCities();

const router = useRouter();
const gotoCityView = (city) => {
    router.push(
        {
            name: "cityView",
            params: { city: city.city, state: city.state, country: city.country },
            query: { lat:city.coords.lat, lng: city.coords.lng, id: city.id}
        }
    )
}
</script>
