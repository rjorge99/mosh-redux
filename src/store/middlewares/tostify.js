const tostify = (state) => (next) => (action) => {
    if (action.type === 'error') console.log('Tostify: ', action.payload.message);
    else next(action);
};

export default tostify;
