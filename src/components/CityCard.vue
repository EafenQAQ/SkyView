<template>
    <div 
      class="flex py-6 bg-weather-secondary rounded-md shadow-md cursor-pointer 
      px-4 hover:bg-orange-300 duration-200 transition-transform hover:scale-105 hover:shadow-2xl"
    >
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{ city.city }}</h2>
            <h3>{{ city.state ? city.state : city.country }}</h3>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round(city.weather.main.temp) }}&deg;C
            </p>
            <div class="flex gap-2 text-xs">
                <span>
                    H:
                    {{ Math.round(city.weather.main.temp_max) }}&deg;
                </span>
                <span>
                    L:
                    {{ Math.round(city.weather.main.temp_min) }}&deg;
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    city: {
        type: Object,
        default: () => {},
    }
})
</script>