import moment from 'moment';
import 'moment/locale/zh-cn';

export default function datetimeFormat(datetime, format = 'YYYY-MM-DD HH:mm:ss', omitTime) {
    let time = omitTime ? '' : ' HH:mm';
    if (moment(datetime, format).isBefore(moment().subtract(6, 'hours'))) {
        if (moment(datetime, format).isAfter(moment().subtract(1, 'years'))) {
            // 一年内
            return moment(datetime, format).calendar(moment(), {
                sameDay: '[今天]' + time,
                nextDay: '[明天]' + time,
                nextWeek: 'MMMD[日]' + time,
                lastDay: '[昨天]' + time,
                lastWeek: 'MMMD[日]' + time,
                sameElse: 'MMMD[日]' + time
            });
        } else {
            // 一年之前
            return moment(datetime, format).calendar(moment(), {
                sameDay: '[今天]' + time,
                nextDay: '[明天]' + time,
                nextWeek: 'MMMD[日]' + time,
                lastDay: '[昨天]' + time,
                lastWeek: 'MMMD[日]' + time,
                sameElse: 'YYYY[年]MMMD[日]' + time
            });
        }

    } else {
        return moment(datetime, format).fromNow();
    }
}