<template>
  <div class="projects">
    <h2 class="projects__title">Projects</h2>
    <div class="projects__list">
      <div
        v-for="project in projects"
        :key="project.id"
        class="projects__item"
        @click="selectProject(project.id)"
      >
        <div class="projects__content">
          <div class="projects__logo">
            <img
              width="51"
              height="51"
              :src="project.logo_url"
              :alt="project.name"
            />
          </div>
          <div class="projects__name">
            <span>{{ project.name }}</span>
          </div>
          <div
            :class="[
              'projects__status',
              {
                'projects__status--inactive': !project.is_active,
              },
            ]"
          >
            <span>{{ project.is_active ? 'Active' : 'Inactive' }}</span>
          </div>
          <div class="projects__worker">
            <div>
              <span>time this week</span>
              <span>00:00:00</span>
            </div>
            <div>
              <span>this month</span>
              <span>00:00:00</span>
            </div>
            <div>
              <span>total</span>
              <span>00:00:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <NameEditModal
      v-if="edit_modal"
      @close="edit_modal = false"
      @updateProject="updateProject"
      v-model="edit_name"
    />
  </div>
</template>

<script>
export default {
  middleware: 'protect',
  data() {
    return {
      projects: [],
      edit_modal: false,
      edit_project: null,
      edit_name: null,
    }
  },
  watch: {
    edit_modal(val) {
      if (!val) {
        this.edit_project = null
        this.edit_name = null
      }
    },
  },
  methods: {
    selectProject(id) {
      this.edit_project = this.projects.find((project) => project.id === id)
      this.edit_name = this.edit_project.name
      this.edit_modal = true
    },
    async updateProject() {
      if (!this.edit_name.length || this.edit_name === this.edit_project.name) {
        return
      }
      await this.modifyProject(this.edit_project.id, this.edit_name)
      this.edit_project.name = this.edit_name
      this.edit_modal = false
    },
    modifyProject(id, name) {
      return this.$axios
        .post(
          '/projects-manage/update',
          { name },
          {
            params: {
              id,
            },
          }
        )
        .then(() => {
          this.$store.dispatch('alerts/addAlert', {
            text: 'Name successfully changed',
            type: 'success',
          })
        })
        .catch((e) => {
          this.$store.dispatch('alerts/addAlert', {
            text: e.response.data.message,
            type: 'error',
          })
        })
    },
  },
  async fetch() {
    const res = await this.$axios.get('/projects-manage')
    this.projects = res.data.projects
  },
}
</script>

<style lang="scss" scoped>
$success: #4bb543;
$error: #ed4337;

.projects {
  width: 100%;
  &__title {
    color: #c44512;
    font-weight: normal;
    text-align: center;
  }
  &__list {
    width: 60%;
    margin: 0 auto;
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 6px;
    }
    width: 100%;
    position: relative;
  }
  &__content {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #dedede;
    padding: 25px;
    cursor: pointer;
    font-size: 0.9em;
    height: 90px;
  }
  &__logo {
    border: none;
    padding: 0;
    flex: 1;
    margin-right: 25px;
    max-width: 65px;
    cursor: pointer;
  }
  &__name {
    flex: 1;
    overflow: hidden;
    span {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__status {
    flex: 1;
    span {
      color: $success;
      font-weight: 600;
    }
  }
  &__status.projects__status--inactive {
    span {
      color: $error;
    }
  }
  &__worker {
    div {
      display: flex;
      justify-content: space-between;
      & > span:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>
