const setUser = user => ({
    type: 'setUser',
    payload: user,
});

const setCommunities = payload => {
    return {
        type: 'setCommunities',
        payload: payload,
    };
};

export {setUser, setCommunities};
