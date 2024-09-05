<!-- FileViewer.vue -->
<template>
    <div v-if="fileUrl" class="file-viewer">
      <!-- 파일을 표시할 내용 추가 -->
      <iframe :src="fileUrl" style="width: 100%; height: 100%;"></iframe>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['fileUrl']);
  </script>
  
  <style scoped>
  .file-viewer {
    width: 100%;
    height: 600px; /* 적절한 높이 설정 */
  }
  </style>