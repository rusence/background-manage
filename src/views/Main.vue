<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header><common-head /></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHead from '@/components/CommonHead.vue'
export default {
  data() {
    return {}
  },
  components: {
    CommonAside,
    CommonHead,
  },
}
</script>

<style scoped>
.el-header{
  padding: 0;
}
.el-menu{
  border-right: none;
}
</style>
