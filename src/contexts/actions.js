const setUser = user => ({
    type: 'setUser',
    payload: user,
});

const setCommunities = payload => {
    console.log('payload', payload.length);
    return {
        type: 'setCommunities',
        payload: payload,
    };
};

export {setUser, setCommunities};
