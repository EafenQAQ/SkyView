<template>
    <div class="flex py-6 bg-weather-secondary rounded-md shadow-md px-4">
        <div class="flex flex-col flex-1 gap-2">
            <AnimatePlaceholder class="max-w-[50%]" />
            <AnimatePlaceholder class="max-w-[40%]" />
        </div>
        <div class="flex flex-col items-end flex-1 gap-2">
            <AnimatePlaceholder class="max-w-[50px] w-full" />
            <AnimatePlaceholder class="max-w-[75px] w-full" />
        </div>
    </div>
</template>

<script setup>
import AnimatePlaceholder from './AnimatePlaceholder.vue';


</script>