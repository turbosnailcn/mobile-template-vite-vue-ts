import type { Ref } from "vue";

//列表参数
export interface AnimateConfig {
  dom: Ref; //DOM节点
  animateList: string[]; //动画列表 配合Animate.css
  duration?: number; //持续时间，秒 为单位
  isOnce?: boolean; //持续运行或者运行一次
}

//运行animate.css动画
export const animate = (animateConfig: AnimateConfig): void => {
  //获取DOM节点
  const domReal: HTMLElement = animateConfig.dom.value;

  const isOnce: boolean =
    typeof animateConfig.isOnce == "undefined" ? true : animateConfig.isOnce;

  const duration: number =
    typeof animateConfig.duration == "undefined" ? 1 : animateConfig.duration;

  const classListValue: string[] = domReal.classList.value.split(" ");
  //判断是否运行一次
  if (isOnce && !classListValue.includes("animate__animated")) {
    domReal.classList.add("animate__animated");
  }

  //添加运行时间
  domReal?.style.setProperty("--animate-duration", duration + "s");

  //判断动画是否在进行，当动画不在进行则执行动画
  if (!domReal.className.includes(animateConfig.animateList.toString())) {
    //添加动画列表到DOM
    for (let i = 0; i < animateConfig.animateList.length; i++) {
      domReal.classList.add(animateConfig.animateList[i]);
    }

    //清除动画
    setTimeout(() => {
      for (let i = 0; i < animateConfig.animateList.length; i++) {
        domReal.classList.remove(animateConfig.animateList[i]);
      }
    }, duration * 1000);
  }
};
