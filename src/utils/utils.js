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
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

export function getLatestQuestion(parentQuestions, surrogateQuestions, role) {
    let questions = [];
    console.log('role', role);
    if (role === 'surrogate' && surrogateQuestions.length > 0) {
        questions = surrogateQuestions.filter(item => !item.answer);
    } else {
        if (parentQuestions.length > 0) {
            questions = parentQuestions.filter(item => !item.answer);
        }
    }

    return questions.length > 0 ? questions[0] : null;
}

export function getLatestAnswerByOther(
    parentQuestions,
    surrogateQuestions,
    role,
) {
    let questions = [];
    if (role === 'parent' && surrogateQuestions.length > 0) {
        questions = surrogateQuestions.filter(item => item.answer);
    } else {
        if (parentQuestions.length > 0) {
            questions = parentQuestions.filter(item => item.answer);
        }
    }

    return questions.length > 0 ? questions[0] : null;
}

export function getActiveQuestions(
    parentQuestions,
    surrogateQuestions,
    role,
    length = 0,
) {
    if (role === 'surrogate' && surrogateQuestions.length > 0) {
        const questions = surrogateQuestions.filter(item => !item.answer);
        if (length) {
            return questions.splice(0, length);
        }
        return questions;
    } else {
        if (parentQuestions.length > 0) {
            const questions = parentQuestions.filter(item => !item.answer);
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
        const questions = surrogateQuestions.filter(item => item.answer);
        if (length) {
            return questions.splice(0, length);
        }
        return questions;
    } else {
        if (parentQuestions.length > 0) {
            const questions = parentQuestions.filter(item => item.answer);
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

    console.log('text', text);
    text = text
        .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
        .toLowerCase();

    text = text.replace(/^\s+|\s+$/gm, '');

    text = text.replace(/\s+/g, '-');
    return text;
}
