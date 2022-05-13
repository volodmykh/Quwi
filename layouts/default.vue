<template>
  <div>
    <div class="container">
      <div class="header">
        <nuxt-link to="/" class="header__logo">
          <img width="25px" height="25px" src="/quwi-logo.png" alt="logo" />
        </nuxt-link>
        <div v-if="$auth.loggedIn" class="header__menu">
          <nuxt-link to="/projects" class="mr-4">projects</nuxt-link>
          <span class="header__menu-logout" @click="logout"> logout </span>
        </div>
        <div v-else class="header__menu">
          <span>signup</span>
        </div>
      </div>
      <div class="content">
        <Nuxt />
      </div>
    </div>
    <div class="alerts">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        :class="['alerts__item', alert.type]"
      >
        <span class="alerts__item-text">{{ alert.text }}</span>
        <span class="alerts__item-close" @click="close(alert.id)">
          &#x2715;
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    alerts() {
      return this.$store.state.alerts.alerts
    },
  },
  methods: {
    close(id) {
      this.$store.dispatch('alerts/clearAlert', id)
    },
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Arial';
}
button {
  outline: none;
  border: none;
}
</style>
<style lang="scss" scoped>
$success: #4bb543;
$error: #ed4337;
%center-block {
  display: flex;
  align-items: center;
  justify-content: center;
}
%header-logo-size {
  width: 44px;
  height: 44px;
}
.container {
  position: relative;

  background-image: url('/gray_blur.png');
  .header {
    display: flex;
    position: sticky;
    top: 0;
    height: 46px;
    background-color: #fafafa;
    box-shadow: 0 0 5px rgb(0 0 0 / 25%);
    padding-right: 20px;
    &__menu {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      &-logout {
        cursor: pointer;
      }
      a,
      span {
        color: #636363;
        text-transform: uppercase;
        font-size: 11px;
        @extend %center-block;
        text-decoration: none;
      }
    }
    &__logo {
      position: relative;
    }
    &__logo:before {
      @extend %header-logo-size;
      content: '';
      transition: all 0.1s linear;
      transform: scale3d(0, 0, 0);
      position: absolute;
      float: left;
      background-color: #e0e0e0;
      z-index: -1;
      border-radius: 50%;
    }

    &__logo:hover:not(.click):before {
      transform: scaleX(1);
    }
    .header__logo {
      @extend %header-logo-size;

      margin: 0 13px;
      @extend %center-block;
      img {
        display: block;
      }
    }
  }
  .content {
    height: calc(100vh - 46px);
    display: flex;
  }
}
.alerts {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 250px;
  &__item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-radius: 10px;
    color: white;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &-text {
      margin-right: 20px;
    }
    &-close {
      cursor: pointer;
    }
  }
  .error {
    background-color: $error;
  }
  .success {
    background-color: $success;
  }
}
.mr-4 {
  margin-right: 16px;
}
</style>
