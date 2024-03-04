<template>
    <div ref="draggableContainer" class="draggable_container">
      <div class="header" @mousedown.prevent="dragMouseDown"></div>
      <div class="content">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onUnmounted, ref } from "vue";
  
  const draggableContainer = ref(null);
  const clientX = ref(undefined);
  const clientY = ref(undefined);
  
  function dragMouseDown(e) {
    clientX.value = e.clientX;
    clientY.value = e.clientY;
    document.addEventListener("mousemove", elementDrag, true);
    document.addEventListener("mouseup", closeDragElement, true);
  }
  
  function elementDrag(e) {
    e.preventDefault();
    let movementX = clientX.value - e.clientX;
    let movementY = clientY.value - e.clientY;
  
    // left/right constraint
    if (
      e.clientX - draggableContainer.value.clientWidth / 2 < 0 ||
      e.clientX + draggableContainer.value.clientWidth / 2 > window.innerWidth
    ) {
      movementX = 0;
    }
    // top/bottom constraint
    if (
      e.clientY - draggableContainer.value.clientHeight / 2 < 0 ||
      e.clientY + draggableContainer.value.clientHeight / 2 > window.innerHeight
    ) {
      movementY = 0;
    }
  
    if (movementX !== 0) clientX.value = e.clientX;
    if (movementY !== 0) clientY.value = e.clientY;
  
    draggableContainer.value.style.top =
      draggableContainer.value.offsetTop - movementY + "px";
    draggableContainer.value.style.left =
      draggableContainer.value.offsetLeft - movementX + "px";
  }
  
  function closeDragElement() {
    document.removeEventListener("mousemove", elementDrag, true);
    document.removeEventListener("mouseup", closeDragElement, true);
  }
  onUnmounted(() => closeDragElement());
  </script>
  
  <style scoped>
  .draggable_container {
    position: fixed;
    border-radius: 8px;
    z-index: 1000;
    background-color: #1a1127ca;
  }
  
  .header {
    width: 100%;
    height: 1rem;
    cursor: move;
    border-radius: 8px 8px 0 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  .content {
    padding: 1rem;
  }
  </style>
  