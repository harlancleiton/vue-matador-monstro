new Vue({
  el: "#app",
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    logs: []
  },
  computed: {
    hasResult() {
      return this.playerLife === 0 || this.monsterLife === 0;
    }
  },
  methods: {
    startGame() {
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },

    attack(especial) {
      this.playerAttack(especial);
      if (this.monsterLife > 0) this.monsterAttack();
    },

    monsterAttack() {
      this.hurt("playerLife", 7, 12, false, "Monstro", "Jogador", "monster");
    },

    playerAttack(especial) {
      this.hurt("monsterLife", 7, 10, especial, "Jogador", "Monstro", "player");
    },

    hurt(player, min, max, especial, source, target, cls) {
      const plus = especial ? 5 : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      this[player] = Math.max(this[player] - hurt, 0);
      this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls);
    },

    heal() {
      const heal = this.getRandom(10, 15);
      this.playerLife = Math.min(this.playerLife + heal, 100);
      this.registerLog(`Jogador ganhou uma força de ${heal}`, "player");
      this.monsterAttack();
    },

    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },

    registerLog(text, cls) {
      this.logs.unshift({ text, cls });
    }
  },
  watch: {
    hasResult(value) {
      if (value) this.running = false;
    }
  }
});
