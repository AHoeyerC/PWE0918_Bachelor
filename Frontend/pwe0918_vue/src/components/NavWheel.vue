<template>
    <nav class="c-circle-menu js-menu">
        <v-btn class="c-circle-menu_toggle js-menu-toggle">
            <v-icon>mdi mdi-home-circle</v-icon>
        </v-btn>
        <ul class="c-circle-menu_items">
            <li class="c-circle-menu_item">
                <v-btn class="c-circle-menu_link">
                    <v-icon>mdi mdi-calendar-plus</v-icon>
                    <span>Start Område</span>
                </v-btn>
                <v-overlay
                    :opacity="100"
                    :absolute= false
                    :value="overlay"
                >
                    <MineOmraader v-if="showMineOmraader"></MineOmraader>
                    <v-btn
                        fab
                        color="red"
                        @click="overlay = false"
                    >
                        X
                    </v-btn>
                </v-overlay>
            </li>
            <li class="c-circle-menu_item">
                <v-btn class="c-circle-menu_link" @click="overlay = !overlay">
                    <v-icon>mdi mdi-flag</v-icon>
                    <span>Mine Områder</span>
                </v-btn>
                <v-overlay
                    :opacity="100"
                    :absolute= false
                    :value="overlay"
                >
                    <MineOmraader v-if="showMineOmraader"></MineOmraader>
                    <v-btn
                        fab
                        color="red"
                        @click="overlay = false"
                    >
                        X
                    </v-btn>
                </v-overlay>
            </li>
            <li class="c-circle-menu_item">
                <v-btn class="c-circle-menu_link">
                    <v-icon>mdi mdi-format-list-bulleted</v-icon>
                    <span>Leaderboard</span>
                </v-btn>
                <v-overlay
                    :opacity="100"
                    :absolute= false
                    :value="overlay"
                >
                    <MineOmraader v-if="showMineOmraader"></MineOmraader>
                    <v-btn
                        fab
                        color="red"
                        @click="overlay = false"
                    >
                        X
                    </v-btn>
                </v-overlay>
            </li>
            <li class="c-circle-menu_item">
                <v-btn class="c-circle-menu_link">
                    <v-icon>mdi mdi-trophy</v-icon>
                    <span>Trofæer</span>
                </v-btn>
                <v-overlay
                    :opacity="100"
                    :absolute= false
                    :value="overlay"
                >
                    <MineOmraader v-if="showMineOmraader"></MineOmraader>
                    <v-btn
                        fab
                        color="red"
                        @click="overlay = false"
                    >
                        X
                    </v-btn>
                </v-overlay>
            </li>
        </ul>
        <div class="c-circle-menu_mask js-menu-mask"></div>
    </nav>
</template>


<script>
import '..//styles/components/_circleNav.scss'
import MineOmraader from "./MineOmraader"

export default {
  name: "Navigation",

  components: {
    MineOmraader
  },

  data: () => ({
      activeBtn: 1,
      overlay: false,
      showMineOmraader: true,
  }),
  methods: {
    fetchOmråder () {
      this.showMineOmraader = !this.showMineOmraader;
    },
  }
};

(function(window) {
  'use strict';

  window.cssCircleMenu = function(el) {
    var $menu = document.querySelector(el);
    var $menuToggle = $menu ? $menu.querySelector('.js-menu-toggle') : undefined;
    var $menuMask = $menu ? $menu.querySelector('.js-menu-mask') : undefined;

    if (!$menu || !$menuToggle || !$menuMask) {
      throw new Error('Invalid elements, check the structure.');
    } else {
      init();
    }

    return {
      openMenu: openMenu,
      closeMenu: closeMenu
    };

    function init() {
      $menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
      });
    }

    function toggleMenu() {
      $menuToggle.classList.contains('is-active')
        ? closeMenu()
        : openMenu();
    }

    function openMenu() {
      $menu.classList.add('is-active');
      $menuToggle.classList.add('is-active');
      $menuMask.classList.add('is-active');
    }

    function closeMenu() {
      $menu.classList.remove('is-active');
      $menuToggle.classList.remove('is-active');
      $menuMask.classList.remove('is-active');
    }
  };
})(window);
</script>
