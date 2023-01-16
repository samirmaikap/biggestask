import {format} from 'date-fns-tz';

export const toRgba = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
};

export const getImagePayload = uri => {
    const unix = Math.round(+new Date() / 1000);
    return {
        uri: uri,
        name: `${unix}.jpg`,
        type: 'image/jpeg',
    };
};

export function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        const intlCode = match[1] ? '+1 ' : '';
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
            '',
        );
    }
    return null;
}

export function getLatestQuestion(parentQuestions, surrogateQuestions, role) {
    if (role === 'surrogate' && surrogateQuestions.length > 0) {
        const questions = surrogateQuestions.filter(
            item => !item.answer && !item?.is_alert_question,
        );
        return questions.length > 0 ? questions[0] : null;
    } else if (role === 'parent' && parentQuestions.length > 0) {
        const questions = parentQuestions.filter(
            item => !item.answer && !item?.is_alert_question,
        );
        return questions.length > 0 ? questions[0] : null;
    }

    return [];
}

export function getAlertQuestions(parentQuestions, surrogateQuestions, role) {
    console.log('surrogateQuestions', surrogateQuestions);
    console.log('parentQuestions', parentQuestions);
    if (role === 'surrogate' && surrogateQuestions.length > 0) {
        const questions = surrogateQuestions.filter(
            item => !item?.milestone?.surrogate_note && item?.is_alert_question,
        );

        return questions.length > 0 ? questions : [];
    } else if (role === 'parent' && parentQuestions.length > 0) {
        const questions = parentQuestions.filter(
            item => !item?.milestone?.parent_note && item?.is_alert_question,
        );

        return questions.length > 0 ? questions : [];
    }

    return [];
}

export function getLatestAnswerByOther(
    parentQuestions,
    surrogateQuestions,
    role,
) {
    if (role === 'parent' && surrogateQuestions.length > 0) {
        const questions = surrogateQuestions.filter(
            item => item.answer && !item?.is_alert_question,
        );
        return questions.length > 0 ? questions[0] : null;
    } else if (role === 'surrogate' && parentQuestions.length > 0) {
        const questions = parentQuestions.filter(
            item => item.answer && !item?.is_alert_question,
        );
        return questions.length > 0 ? questions[0] : null;
    }

    return [];
}

export function getActiveQuestions(
    parentQuestions,
    surrogateQuestions,
    role,
    length = 0,
) {
    if (role === 'surrogate' && surrogateQuestions.length > 0) {
        const questions = surrogateQuestions.filter(
            item => !item.answer && !item?.is_alert_question,
        );
        if (length) {
            return questions.splice(0, length);
        }
        return questions;
    } else {
        if (parentQuestions.length > 0) {
            const questions = parentQuestions.filter(
                item => !item.answer && !item?.is_alert_question,
            );
            if (length) {
                return questions.splice(0, length);
            }

            return questions;
        }
    }
}

export function getInActiveQuestions(
    parentQuestions,
    surrogateQuestions,
    role,
    length = 0,
) {
    if (role === 'surrogate' && surrogateQuestions.length > 0) {
        const questions = surrogateQuestions.filter(
            item => item.answer && !item?.is_alert_question,
        );
        if (length) {
            return questions.splice(0, length);
        }
        return questions;
    } else {
        if (parentQuestions.length > 0) {
            const questions = parentQuestions.filter(
                item => item.answer && !item?.is_alert_question,
            );
            if (length) {
                return questions.splice(0, length);
            }
            return questions;
        }
    }
}

export function toSlug(text) {
    if (!text) {
        return text;
    }

    text = text
        .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
        .toLowerCase();

    text = text.replace(/^\s+|\s+$/gm, '');

    text = text.replace(/\s+/g, '-');
    return text;
}

export function getLocalDateTime(dateTime, timezone) {
    return format(new Date(dateTime), 'dd/MM/yyyy h:mm a', {
        timeZone: timezone,
    });
}

export function getUTCDateTime(dateTime, timezone = '') {
    console.log('date.toISOString()', dateTime.toISOString());
    return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss', {
        timeZone: 'UTC',
    });
}

export function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}
