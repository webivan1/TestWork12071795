<template>
  <access-denied>
    <post-list />
  </access-denied>
</template>

<script>
import PostList from '@/components/posts/posts-list/PostList'

export default {
  name: 'Posts',
  components: { PostList }
}
</script>
