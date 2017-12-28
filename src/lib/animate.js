/**
 * requestAnimationFrame 兼容
 */
let requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || function (fn) {
        setTimeout(function () {
            fn();
        }, 17);
    };

/**
 * 动画函数，用于linear执行某个变化
 * 
 * @export
 * @param {number} from 起始值
 * @param {number} to 目标值
 * @param {number} duration 持续时间
 * @param {function} stepFn 每次变化执行的回调
 */
export default function animate(from, to, duration, stepFn) {
    let startTime = +new Date;  // 动画开始时间
    let diff = to - from;       // 位移偏差量

    (function invokeAnimate() {
        let timeSpan = +new Date - startTime; // 时间差
        if (timeSpan > duration) {
            stepFn(to);
            return;
        }
        let result = timeSpan * diff / duration + from;
        stepFn(result);
        requestAnimationFrame(invokeAnimate);
    })();
}
/**
 * 向上收起
 * 
 * @export
 * @param {HTMLElement} eleNode 
 * @param {number} duration
 * @param {function} callback 
 */
export function slideUp(eleNode, duration, callback) {
    let from = eleNode.offsetHeight;
    animate(from, 0, duration, num => {
        eleNode.style.height = num + 'px';
        if (num == 0) {
            eleNode.style.height = 'auto';
            eleNode.style.display = 'none';
            callback();
        }
    });
}
/**
 * 向下展开
 * 
 * @export
 * @param {HTMLElement} eleNode 
 * @param {number} duration 
 * @param {function} callback 
 */
export function slideDown(eleNode, duration, callback) {
    eleNode.style.display = 'block';
    let to = eleNode.offsetHeight;
    animate(0, to, duration, num => {
        eleNode.style.height = num + 'px';
        if (num == to) {
            callback();
        }
    });
}
/**
 * 渐隐，淡出
 * 
 * @export
 * @param {HTMLElement} eleNode 
 * @param {number} duration 
 * @param {function} callback 
 */
export function fadeOut(eleNode, duration, callback) {
    animate(1, 0, duration, num => {
        eleNode.style.opacity = num;
        if (num == 0) {
            callback && callback();
        }
    });
}
/**
 * 渐现，淡入
 * 
 * @export
 * @param {HTMLElement} eleNode 
 * @param {number} duration 
 * @param {function} callback 
 */
export function fadeIn(eleNode, duration, callback) {
    animate(0, 1, duration, num => {
        eleNode.style.opacity = num;
        if (num == 1) {
            callback && callback();
        }
    });
}