<template>
  <div class="ua d-inline-flex align-items-center gap-2 mb-2">
    <img :src="user.avatar" alt="Avatar" class="ua-img" />
    <span class="ua-name d-none d-sm-inline fw-semibold text-truncate">{{
      user.username
    }}</span>
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    user: { type: Object, required: true },
  },
};
</script>

<style scoped>
.ua {
  max-width: 100%;
}

.ua-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0d6efd20;
}

@media (min-width: 576px) {
  .ua-img {
    width: 36px;
    height: 36px;
  }
}

@media (min-width: 768px) {
  .ua-img {
    width: 40px;
    height: 40px;
  }
}

.ua-name {
  color: var(--link);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
