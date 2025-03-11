<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav 
      class="container mx-auto flex flex-col sm:flex-row items-center gap-4 
      text-white py-6"
      >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1 hover:text-weather-secondary duration-150">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p>知天 | SkyView</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i 
          class="fa-solid fa-barcode text-xl hover:text-weather-secondary duration-150
          cursor-pointer"
          @click="toggleModal"
        ></i>
        <i 
        v-if="route.query.preview"
        @click="addCity"  
        class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150
            cursor-pointer"
        ></i>

        <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
          <div class="text-black">
            <h1 class="text-2xl mb-1">关于SkyView:</h1>
          <p class="mb-4">
            SkyView(知天)允许您跟踪您选择的城市当前和未来的天气状况
          </p>
          <h2 class="text-2xl">如何使用:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
                在搜索栏中输入城市名称进行搜索。
            </li>
            <li>
                从搜索结果中选择一个城市，这将带您进入所选城市的当前天气页面。
            </li>
            <li>
                点击右上角的“+”图标即可跟踪该城市。这会将该城市保存下来，以便您稍后在主页上查看。
            </li>
          </ol>

          <h2 class="text-2xl">移除城市:</h2>
          <p>
            如果您不想再跟踪某个城市，只需在主页上选择该城市。在页面底部，会有一个删除该城市的选项。
          </p>
          </div>
        </BaseModal>
      </div>
      
    </nav>
  </header>    
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";

const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
}

const route = useRoute();
const router = useRouter();
// 将当前城市添加到本地存储中
const savedCities = ref([]);

const addCity = () => {

    if (localStorage.getItem("savedCities")) {
      savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
      } else {
        savedCities.value = [];
      }
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    country: route.params.country,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    }
  }

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  // 删除URL的preview属性 增加id属性
  let query = Object.assign({}, route.query) ;
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};





</script>

