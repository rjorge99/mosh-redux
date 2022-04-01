const logger = (param) => (state) => (next) => (action) => {
    // console.log('Destination', param);
    return next(action);
};

export default logger;
