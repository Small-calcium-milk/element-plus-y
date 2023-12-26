<template>
  <ul class="s-member">
    <li style="margin: 0" v-for="m in members">
      <!--<a class="s-member-item" :href="m.link" target="_blank">
        <div class="s-member-item__avatar">
          <img :src="m.avatar" alt="avatar" />
        </div>
        <span class="s-member-item__link">
          {{ m.name }}
        </span>
      </a>-->
      <VPTeamMembers :members="[m]"></VPTeamMembers>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme'

type m = {
  avatar: string
  name: string
  link: string
}

const members: m[] = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/47312128?v=4',
    name: '小钙奶阿',
    title: '创作者',
    links: [{ icon: 'github', link: 'https://github.com/Small-calcium-milk' }],
  },
]
</script>

<style lang="scss" scoped>
.s-member {
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  .s-member-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    gap: 10px;
    color: inherit;
    list-style: none;
    text-decoration: none;

    &:hover {
      color: var(--vp-c-indigo-2);
    }

    &__avatar {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      overflow: hidden;

      & > img {
        transition: all 0.1s;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
