export default {
    name: 'timeis',
    template: `
    <div id="timeis">
      <span id="currentTime">
        {{ currentTime }}
      </span>
    </div>
  `,
    data() {
        return {
            currentTime: ''
        };
    },
    mounted() {
        this.updateTime();
    },
    methods: {
        updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            this.currentTime = `${hours}:${minutes}:${seconds}`;

            // 请求下一帧执行 updateTime 方法
            requestAnimationFrame(this.updateTime);
        }
    }
};