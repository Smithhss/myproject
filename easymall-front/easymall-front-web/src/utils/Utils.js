import moment from "moment";
const imageModules = import.meta.glob('@/assets/*.{png,jpg,jpeg,svg,mp4,gif}', {
    eager: true
});
import router from '@/router'

moment.locale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    }
});
export default {
    sizeToStr: (size) => {
        var data = ''
        if (size < 0.1 * 1024) {
            //如果小于0.1KB转化成B
            data = size.toFixed(2) + 'B'
        } else if (size < 0.1 * 1024 * 1024) {
            //如果小于0.1MB转化成KB
            data = (size / 1024).toFixed(2) + 'KB'
        } else if (size < 0.1 * 1024 * 1024 * 1024) {
            //如果小于0.1GB转化成MB
            data = (size / (1024 * 1024)).toFixed(2) + 'MB'
        } else {
            //其他转化成GB
            data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
        }
        var sizestr = data + ''
        var len = sizestr.indexOf('.')
        var dec = sizestr.substr(len + 1, 2)
        if (dec == '00') {
            //当小数点后为00时 去掉小数部分
            return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
        }
        return sizestr
    },
    convert2Amount: (amount) => {
        if (amount) {
            return amount.toFixed(2);
        } else {
            return "0.00";
        }
    },
    format2Html: (content) => {
        if (!content) {
            return content;
        }
        content = content.replaceAll("\n", "<br>");
        content = content.replaceAll(" ", "&nbsp;");
        return content;
    },
    formatTimeFriendly: (timestamp) => {
        const timestampTime = moment(timestamp);
        const days = Number.parseInt(moment().format("YYYYMMDD")) - Number.parseInt(timestampTime.format("YYYYMMDD"));
        if (days == 0) {
            return timestampTime.format("HH:mm")
        } else if (days == 1) {
            return "昨天"
        } else if (days >= 2 && days < 7) {//大于1天小于7天显示星期几
            return timestampTime.format("dddd")
        } else if (days >= 7) {//显示年月日
            return timestampTime.format("YYYY-MM-DD")
        }
    },
    format2Date: (timestamp) => {
        const timestampTime = moment(timestamp);
        return timestampTime.format("YYYY-MM-DD")
    },
    formatSeconds: (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        // 补零函数
        const pad = (n) => n.toString().padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
    },
    days: (startDate, endDate) => {
        const days = moment(endDate).diff(moment(startDate), 'days');
        return days;
    },
    isEmpty: (str) => {
        if (str == null || str == "" || str == undefined) {
            return true;
        }
        return false;
    },
    format2Html: (content) => {
        if (!content) {
            return content;
        }
        content = content.trim();
        content = content.replaceAll("\n", "<br>");
        var reg = /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;
        content = content.replace(reg, function (a) {
            //如果包含http ，indexOf方法如果包含返回0,所以加上!
            if (!a.indexOf('http')) {
                return '<a class="link-url" href="' + a + '" target=_blank>' + a + '</a>';
            }
            else {
                return '<a class="link-url" href="http://' + a + '" target=_blank>' + a + '</a>';
            }
        });
        return content;
    },
    getLocalResource: (resource) => {
        const path = Object.keys(imageModules).find(path => path.includes(resource));
        return path ? imageModules[path].default : '';
    },
    jump: (path, self = true) => {
        if (self) {
            router.push(path)
        } else {
            window.open(path, '_blank')
        }

    },
}