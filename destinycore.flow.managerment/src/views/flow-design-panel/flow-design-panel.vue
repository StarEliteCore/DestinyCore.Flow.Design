<template>
  <div>
    <div>
      <a-button type="primary" draggable="true" data-type="rect" @mousedown.prevent="startDrag">Rect</a-button>
      <a-button type="primary" draggable="true" data-type="circle" @mousedown.prevent="startDrag">Circle</a-button>
    </div>
    <div>
<div id="container"></div>
    </div>
    
    
  </div>
</template>
<script lang="ts" src="./flow-design-panel.ts"></script>