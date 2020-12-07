<template>
  <div>
    <div>
      <Button draggable="true" data-type="rect" @mousedown.prevent="startDrag">Rect</Button>
      <Button draggable="true" data-type="circle" @mousedown.prevent="startDrag">Circle</Button>
    </div>
    <div>
<div id="container"></div>
    </div>
    
    
  </div>
</template>
<script lang="ts" src="./flow-design-panel.ts"></script>