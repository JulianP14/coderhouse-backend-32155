import moment from "moment";

export const formatTime = () => {
    return { timestamp: moment().format() };
};