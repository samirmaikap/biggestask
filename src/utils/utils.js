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
