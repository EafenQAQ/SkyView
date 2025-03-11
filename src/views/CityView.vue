<template>
    <div>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
               <CityVIewSkeleton />
            </template>
        </Suspense>
        </div>
</template>

<script setup>
import CityVIewSkeleton from "@/components/CityVIewSkeleton.vue";
import AsyncCityView from "../components/AsyncCityView.vue";
</script>