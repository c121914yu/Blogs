<template>
  <div class="loading">
    <div class="load">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  z-index: 99999;
}
.loading .load{
  display: flex;
}

.loading .load span{
  background-color: purple;
  width: 0;
  height: 0;
  border-radius: 50%;
  margin: 0 8px;
  animation: bounce 0.6s infinite alternate;
  transform: translateY(0);
}
.loading .load span:nth-child(2){
  background-color: palevioletred;
  animation-delay: 0.2s;
}
.loading .load span:nth-child(3){
  animation-delay: 0.4s;
}

@keyframes bounce{
  to{
    width: 16px;
    height: 16px;
    transform: translateY(-16px);
  }
}
</style>
