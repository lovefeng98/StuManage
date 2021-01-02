<template>
  <el-container class="home-container">
    <!--头部导航-->
    <el-header class="head">
      <img src="../assets/images/log.png" alt="" />
      <span> 学生信息管理系统 </span>
      <div class="drop">
        <el-dropdown>
          <el-avatar
            :size="50"
            src="../assets/images/log.png"
            style="cursor: pointer"
          ></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <span type="danger" @click="logout"
                  ><span class="el-icon-switch-button"></span>
                  &nbsp;退出登入</span
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!--侧边栏目-->
      <el-aside width="200px">
        <el-menu>
          <router-link to="/Welcome">
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <template #title>首页</template>
            </el-menu-item>
          </router-link>
          <router-link to="/Stumain">
          <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
            <template #title>学生信息管理</template>
          </el-menu-item>
          </router-link>
          <el-menu-item index="4">
            <i class="el-icon-s-custom"></i>
            <template #title>角色管理</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--主体内容-->
      <el-main v-loading="loading">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    /**
     *
     * 退出登入
     */
    async logout() {
      const res = await this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出登入",
        });
      });
      if (res === "confirm") {
        //LocalStorage.clearAll();
        await this.$router.push("/Login");
      }
    },
  },
};
</script>


<style scoped>
.drop {
  float: right;
}
.el-header {
  background-color: #409eff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 19px;

  padding-left: 0px;
}
.el-aside {
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  width: 100%;
  height: 100% !important;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
