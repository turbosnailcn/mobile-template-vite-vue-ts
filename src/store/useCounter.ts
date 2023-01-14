import { defineStore } from "pinia";

const useCounter = defineStore({
  id: "counter",
  state: () => ({
    count: 0,
  }),
  actions: {
    add(delta: number) {
      this.count += delta;
    },
    set(delta: number) {
      this.count = delta;
    },
  },
});

export default useCounter;
