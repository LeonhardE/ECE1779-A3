import { createTheme, styled } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export function ondate(a, b) {
    if (a.createdAt < b.createdAt) {
        return -1;
    }
    else if (a.createdAt > b.createAt) {
        return 1;
    }
    return 0;
}

export function ontrend(a, b) {
    if (a[1] < b[1]) {
        return -1;
    }
    else if (a[1] > b[1]) {
        return 1;
    }
    return 0;
}

export function isNumeric(val) {
    return /^-?\d+$/.test(val);
}

export function fixtime(createdAt) {
    let year = Number(createdAt.substring(0, 4));
    let month = Number(createdAt.substring(5, 7));
    let day = Number(createdAt.substring(8, 10));
    let hour = Number(createdAt.substring(11, 13));
    hour = hour - 4;
    if (hour < 0) {
        hour = hour + 24;
        day = day - 1;
        if (day === 0) {
            if (month === 1) {
                month = 12;
                day = 31;
                year = year - 1;
            }
            else if (month === 2 || month === 4 || month === 6 || month === 8 || month === 9 || month === 11) {
                month = month - 1;
                day = 31;
            }
            else if (month === 3) {
                month = month - 1;
                if (year % 4 === 0) {
                    day = 29;
                }
                else {
                    day = 28;
                }
            }
            else {
                month = month - 1;
                day = 30;
            }
        }
    }
    let yearstring = year.toString();
    let monthstring = month < 10 ? "0" + month.toString() : month.toString();
    let daystring = day < 10 ? "0" + day.toString() : day.toString();
    let hourstring = hour < 10 ? "0" + hour.toString() : hour.toString();
    return yearstring + "-" + monthstring + "-" + daystring + "T" + hourstring + createdAt.substring(13, 19);
}

export const Input = styled('input')({
    display: 'none',
});

export function checkliked(likelist, key, user) {
    for (let i = 0; i < likelist.length; i++) {
        if (likelist[i].key === key && likelist[i].sender === user) {
            return true;
        }
    }
    return false;
}

export function countlike(likelist, key) {
    let count = 0;
    for (let i = 0; i < likelist.length; i++) {
        if (likelist[i].key === key) {
            count += 1;
        }
    }
    return count;
}

export function getcomments(list, key) {
    let comments = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].key === key) {
            comments.push(list[i]);
        }
    }
    comments.sort(ondate);
    comments.reverse();
    return comments;
}

export const getlabelurl = "https://sc0tz7yiog.execute-api.us-east-1.amazonaws.com/default/dynamoUtil?image_id=ALL";

export const getlabelheader = {
    headers: {
        'x-api-key': "cPiUGpYWTh4ZFC1RCi5jz3VSWR15WJX091WO4DWk"
    }
}

export function extractLabels(string) {
    let item = [];
    let front = -1;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '"') {
            if (front === -1) {
                front = i;
            }
            else {
                item.push(string.substring(front + 1, i));
                front = -1;
            }
        }
    }
    return item.slice(1, 4);
}
 