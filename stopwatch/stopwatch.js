window.stopWatch = {
    currentTime: '00:00.0',
    timeSec: 0,
    counting: false,
    lastStartTime: 0,
};

export default {
    name: 'stopwatch',
    template: `
    <div id="stopwatch">
      <span id="currentTime">
        {{ currentTime }}
      </span>
    </div>
    <div style="position: fixed; right: 15px; bottom: 20px;">
      <button class="mdui-fab mdui-fab-mini mdui-color-theme-accent mdui-ripple" id="fab-animation" style="margin-left: 7.5px;" v-if="!counting && timeSec !== 0" @click="stop"><i class="mdui-icon material-icons">stop</i></button>
      <br /><br />
      <button class="mdui-fab mdui-color-theme-accent mdui-ripple mdui-color-theme mdui-color-blue" id="fab-animation"><i class="mdui-icon material-icons" @click="pause">{{ counting ? "pause" : "play_arrow" }}</i></button>
    </div>
  `,
    data() {
        return {
            currentTime: '00:00.0',
            timeSec: 0,
            counting: false,
            lastStartTime: 0,
        };
    },
    watch: {
        currentTime: {
            handler(newVal, oldVal) {
                window.stopWatch.currentTime = newVal;
            },
        },
        timeSec: {
            handler(newVal, oldVal) {
                window.stopWatch.timeSec = newVal;
            },
        },
        counting: {
            handler(newVal, oldVal) {
                window.stopWatch.counting = newVal;
            },
        },
        lastStartTime: {
            handler(newVal, oldVal) {
                window.stopWatch.lastStartTime = newVal;
            },
        },
    },
    mounted() {
        this.currentTime = window.stopWatch.currentTime;
        this.timeSec = window.stopWatch.timeSec;
        this.counting = window.stopWatch.counting;
        this.lastStartTime = window.stopWatch.lastStartTime;
        this.updateTime();
    },
    methods: {
        start() {
            this.timeSec = 0;
            this.counting = true;
        },
        pause() {
            this.counting = !this.counting;
            this.lastStartTime = 0;
        },
        stop() {
            this.timeSec = 0;
            this.currentTime = '00:00.0';
            this.lastStartTime = 0;
            // this.counting = false;
        },
        updateTime() {
            if (!this.counting) return requestAnimationFrame(this.updateTime);
            const now = parseInt(performance.now());
            if (this.lastStartTime === 0) this.lastStartTime = now;
            this.timeSec += (now - this.lastStartTime) / 1e3;
            this.currentTime = `${this.timeSec >= 3600 ? `${Math.floor(this.timeSec / 3600)}:` : ""}${`00${Math.floor(this.timeSec / 60 % 60)}`.slice(-2)}:${`00${Math.floor(this.timeSec % 60)}`.slice(-2)}${(this.timeSec % 1).toFixed(1).slice(-2)}`;
            this.lastStartTime = now;

            // 请求下一帧执行 updateTime 方法
            requestAnimationFrame(this.updateTime);
        }
    }
};