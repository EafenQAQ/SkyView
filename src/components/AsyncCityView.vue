<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- banner -->
      <div 
        v-if="route.query.preview"
        class="text-white p-4 bg-weather-secondary w-full text-center"
      >
        <p>您当前正在预览该城市天气，点击“+”图标即可跟踪该城市天气讯息。</p>
      </div>      
      <!-- weather Overview -->
       <div class="flex flex-col items-center text-white py-12">
         <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
         <p class="text-sm mb-12">
            {{ 
                new Date().toLocaleDateString(
                    "zh-CN",
                    {
                        weekday: "short",
                        day:"2-digit",
                        month: "long"
                    }
                )
            }}
            {{ 
              new Date().toLocaleTimeString(
                "zh-CN",
                {
                    timeStyle: "short"
                }
              )            
            
            }}    
         </p>
         <p class="text-8xl mb-8">{{ Math.round(weatherData.current.temp) }}°C</p> 
         <p>
             体感温度：
             {{ Math.round(weatherData.current.feels_like) }}°C 
            </p> 
            <p class="capitalize">
                {{ weatherData.current.weather[0].description }}
            </p>
            <img 
            class="w-[150px] h-auto"
            :src="
                `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
                " 
           alt="weather icon"
           >
        </div>

        <hr class="border-white/50 border w-full">

        <!-- hourly weather -->
         <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">每小时天气</h2>
                <div class="flex gap-10 overflow-x-scroll">
                    <div v-for="hourData in weatherData.hourly" :key="hourData.dt"
                      class="flex flex-col gap-4 items-center"
                    >
                      <p class="whitespace-nowrap text-md">
                        {{ new Date(hourData.dt * 1000).toLocaleTimeString(
                            "en-US",
                            { hour: "numeric"}
                             ) 
                        }}
                      </p>
                      <img 
                        class="w-auto h-[50px] object-cover"
                        :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                        alt="hourly weather icon"
                       >
                       <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
                    </div>
                </div>
            </div>
         </div>

         <hr class="border-white/50 border w-full">

         <!-- Weekly Weather -->
          <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">一周天气预测</h2>
                <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
                    <p class="flex-1">
                        {{ 
                            new Date(day.dt * 1000).toLocaleDateString('zh-CN', {
                                weekday: 'long',
                            })
                        }}
                    </p>
                    <img 
                      class="w-[50px] h-[50px] object-cover"
                      :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" 
                      alt="weely img"
                    >
                    <div class="flex gap-2 flex-1 justify-end">
                        <p>{{ Math.round(day.temp.min) }}</p>~
                        <p>{{ Math.round(day.temp.max) }} &deg;</p>
                    </div>
                </div>
            </div>

          </div>
          <!-- 垃圾桶 -->
           <div 
             @click="removeCity"
             class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
           >
             <i class="fa-solid fa-trash"></i>
             <p>从主页删除该城市</p>
           </div>
    </div>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const OpenWeatherAPIKey = "d92e195210b4641556c9815e351622fb";
const route = useRoute();
const router = useRouter();

const getWeatherData = async () => {
        try {
        const weatherData = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${OpenWeatherAPIKey}&units=metric`
        );
           // 设定加载动画时间
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        return weatherData.data;
            
        } catch (err) {
            console.log(err);
        }
        
}
const weatherData = await getWeatherData();

//删除当前城市
const removeCity = () => {
  const savedCities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = savedCities.filter(
    (city) => city.id !== route.query.id
  )
  
  localStorage.setItem("savedCities" ,JSON.stringify(updatedCities));

  //重定向到主页
  router.push(
    {
      name: "home",
    }
  )
}

</script>